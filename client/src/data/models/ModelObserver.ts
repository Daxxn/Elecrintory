import PartModel, { PackageCollection, PackageModel, PartCollection } from "./DataModels";
import UserModel, { Creds } from "./UserModel";
import URLHelper, { StatusResult } from '../utils/urlHelper';
import { LoginResponse, MessageResponse, NewPartResponse, RegisterResponse, UserDataResponse } from './Responses';
import Cookies from 'js-cookie';

type UserCallback = (user: UserModel | null) => void;
type PartCallback = (part: PartModel | PartCollection) => void;
type PackageCallback = (part: PackageModel | PackageCollection) => void;

type Observers = {
   user: {
      [id: string]: UserCallback;
   },
   parts: {
      [partId: string]: {
         [obsId: string]: PartCallback;
      }
   },
   packages: {
      [packageId: string]: {
         [obsId: string]: PackageCallback;
      }
   }
}

class ModelObserver {
   // #region Props
   private static readonly all = 'collection';
   private static user: UserModel | null = null;
   private static parts: PartCollection = {};
   private static packages: PackageCollection = {};

   private static observers: Observers = {
      user: {},
      parts: {},
      packages: {},
   };
   // #endregion

   // #region Methods
   // #region Get Methods
   static getUser() {
      return this.user;
   }

   static setUser(user: UserModel | null) {
      this.user = user;
      this.updateUserObservers(user);
   }

   static getPartCollection() {
      return this.parts;
   }

   static getPackageCollection() {
      return this.packages;
   }

   static getPart(id: string) {
      // console.log(this.parts);
      if (this.parts[id]) {
         return this.parts[id];
      }
      return null;
   }

   static getPackage(id: string) {
      if (this.packages[id]) {
         return this.packages[id];
      }
      return null;
   }
   // #endregion
   
   // #region Set Methods
   static setPackageCollection(packages: PackageCollection) {
      this.packages = packages;
      this.updateUserObservers(this.user);
   }

   static setPartCollection(parts: PartCollection) {
      this.parts = parts;
      this.updateUserObservers(this.user);
      // this.updatePartCollectionObservers(parts);
   }
   
   static setPart(part: PartModel) {
      this.parts[part._id] = part;
      this.updatePartObservers(part);
   }

   static setPackage(packageItem: PackageModel) {
      this.packages[packageItem._id] = packageItem;
      this.updatePackageObservers(packageItem);
   }
   // #endregion

   // #region Server Call Methods
   private static async updateUser() {
      try {
         const req = URLHelper.buildDataFetch('user', 'PATCH', undefined, this.user);
         const res = await fetch(req.url, req.config);
         const data = await res.json();
         console.log(data);
         if (!data.message) {
            this.updateUserObservers(data);
         }
      } catch (err) {
         console.log(err);
      }
   }

   private static async fetchUserData(): Promise<StatusResult> {
      try {
         if (this.user) {
            const req = URLHelper.buildDataFetch('user', 'GET', this.user._id);
            const res = await fetch(req.url, req.config);
            if (URLHelper.quickStatusCheck(res.status)) {
               const data = (await res.json()) as UserDataResponse;
               this.parts = data.parts;
               this.packages = data.packages;
               this.updateUserObservers(this.user);
            } else {
               const data = (await res.json()) as MessageResponse;
               console.log(data.message);
            }
            return URLHelper.statusCheck(res.status);
         }
         return 'ok';
      } catch (err) {
         console.log(err);
         return 'error';
      }
   }

   static addPart(partName: string) {
      if (partName && this.user) {
         // const newPart = {
         //    partName,
         // };
         // const req = URLHelper.buildDataFetch('parts', 'POST', '', newPart);
         const req = URLHelper.buildDataFetch('parts', 'POST', partName);
         fetch(req.url, req.config)
            .then(req => req.json())
            .then(data => {
               const newData = data as NewPartResponse;
               console.log(newData);
               if (newData && this.user) {
                  this.user = newData.user;
                  this.parts = newData.parts;
                  this.updateUserObservers(newData.user);
               }
            })
            .catch(err => console.log(err));
      }
   }

   static async autoLogin(): Promise<StatusResult> {
      try {
         var response: StatusResult = 'ok';
         const userId = Cookies.get('userId');
         const loggedIn = Cookies.get('loggedIn');
         if (userId && loggedIn === 'true') {
            const req = URLHelper.buildDataFetch('user', 'GET', userId);
            console.log('Starting Auto-Login Attempt');
            const res = await fetch(req.url, req.config);
            if (URLHelper.quickStatusCheck(res.status)) {
               const data = (await res.json()) as LoginResponse;
               if (data.user) {
                  Cookies.set('loggedIn', 'true');
                  this.user = data.user;
                  response = await this.fetchUserData();
               }
            } else {
               const data = (await res.json()) as MessageResponse;
               console.log(data.message);
            }
            if (response === 'ok') {
               return URLHelper.statusCheck(res.status);
            }
         }
         return response;
      } catch (err) {
         console.log(err);
         return 'error';
      }
   }

   // #region Authentication Handling
   static async login(creds: Creds): Promise<StatusResult> {
      try {
         var response: StatusResult = 'ok';
         const req = URLHelper.buildAuthFetch('login', creds);
         console.log('Starting Login Attempt');
         const res = await fetch(req.url, req.config);
         if (URLHelper.quickStatusCheck(res.status)) {
            const data = (await res.json()) as LoginResponse;
            if (data.user) {
               Cookies.set('userId', data.user._id);
               Cookies.set('loggedIn', 'true');
               this.user = data.user;
               response = await this.fetchUserData();
            }
         } else {
            const data = (await res.json()) as MessageResponse;
            console.log(data.message);
         }
         if (response === 'ok') {
            return URLHelper.statusCheck(res.status);
         }
         return response;
      } catch (err) {
         console.log(err);
         return 'error';
      }
   }

   private static postLogout() {
      this.user = null;
      this.parts = {};
      this.updateUserObservers(null);
   }

   static async register(creds: Creds): Promise<StatusResult> {
      try {
         const req = URLHelper.buildAuthFetch('register', creds);
         console.log('Starting Register Attempt');
         const res = await fetch(req.url, req.config);
         if (URLHelper.quickStatusCheck(res.status)) {
            const data = (await res.json()) as RegisterResponse;
            console.log(data);
         } else {
            const data = (await res.json()) as MessageResponse;
            console.log(data.message);
         }
         return URLHelper.statusCheck(res.status);
      } catch (err) {
         console.log(err);
         return 'error';
      }
   }

   static async logout(): Promise<StatusResult> {
      try {
         const req = URLHelper.buildAuthFetch('logout');
         console.log('Starting Logout Attempt');
         const res = await fetch(req.url, req.config);
         const data = (await res.json()) as MessageResponse;
         console.log(data.message);
         if (URLHelper.quickStatusCheck(res.status)) {
            this.postLogout();
         }
         return URLHelper.statusCheck(res.status);
      } catch (err) {
         console.log(err);
         return 'error';
      }
   }
   // #endregion
   // #endregion
   
   // #region Observer Methods
   static addUserObserver(id: string, callback: UserCallback) {
      this.observers.user[id] = callback;
   }

   static addPartObserver(partId: string, obsId: string, callback: PartCallback) {
      this.observers.parts[partId][obsId] = callback;
   }

   static addPackageObserver(packageId: string, obsId: string, callback: PackageCallback) {
      this.observers.packages[packageId][obsId] = callback;
   }

   static removeUserObserver(id: string) {
      delete this.observers.user[id];
   }

   static removePartObserver(partId: string, obsId: string) {
      delete this.observers.parts[partId][obsId];
   }

   static removePackageObserver(packageId: string, obsId: string) {
      delete this.observers.packages[packageId][obsId];
   }

   private static updateUserObservers(user: UserModel | null) {
      if (this.observers.user) {
         console.log({user: this.user, parts: this.parts});
         Object.values(this.observers.user).forEach(obs => obs(user));
      }
   }

   private static updatePartObservers(part: PartModel) {
      if (this.observers.parts) {
         if (this.observers.parts[part._id]) {
            Object.values(this.observers.parts[part._id]).forEach(obs => obs(part));
         }
      }
   }

   private static updatePackageObservers(packageItem: PackageModel) {
      if (this.observers.packages) {
         if (this.observers.packages[packageItem._id]) {
            Object.values(this.observers.packages[packageItem._id]).forEach(obs => obs(packageItem));
         }
      }
   }
   // #endregion
   // #endregion
}

export default ModelObserver;
