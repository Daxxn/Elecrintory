import PartModel, {
   PackageCollection,
   PackageModel,
   PackageSearchProps,
   PartCollection,
   PartSearchProps,
} from './DataModels';
import UserModel, { Creds } from './UserModel';
import URLHelper, { StatusResult } from '../Utils/urlHelper';
import {
   DeletedResponse,
   LoginResponse,
   MessageResponse,
   NewPackageResponse,
   NewPartResponse,
   RegisterResponse,
   UnregisterResponse,
   UpdatedPackageResponse,
   UpdatedPartResponse,
   UpdatedUserResponse,
   UserDataResponse,
} from './Responses';
import Cookies from 'js-cookie';
import Message from '../Utils/Message';
import SettingsModel from './SettingsModel';

type UserCallback = (user: UserModel | null) => void;
type PartCallback = (part: PartModel | PartCollection) => void;
type PackageCallback = (part: PackageModel | PackageCollection) => void;

type Observers = {
   user: {
      [id: string]: UserCallback;
   };
   parts: {
      [partId: string]: {
         [obsId: string]: PartCallback;
      };
   };
   packages: {
      [packageId: string]: {
         [obsId: string]: PackageCallback;
      };
   };
};

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

   static async setUserSettings(settings: SettingsModel) {
      if (this.user) {
         this.user.settings = settings;
         await this.updateUser();
      }
   }

   static getPartCollection() {
      return this.parts;
   }

   static getPackageCollection() {
      return this.packages;
   }

   static getPart(id: string) {
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
   }

   static setPart(part: PartModel) {
      this.parts[part._id] = part;
      this.updatePartObservers(part);
   }

   static setPackage(packageItem: PackageModel) {
      this.packages[packageItem._id] = packageItem;
      this.updatePackage(packageItem);
      this.updatePackageObservers(packageItem);
   }

   static addSelectedPackage(partId: string, packageId: string) {
      const part = this.parts[partId];
      if (!part.packages.includes(packageId)) {
         part.packages.push(packageId);
         this.updatePartObservers(part);
      }
   }
   // #endregion

   // #region Search Methods
   static searchParts(prop: PartSearchProps, value: string): string[] | null {
      if (this.parts) {
         switch (prop) {
            case 'partName':
               var foundParts = Object.values(this.parts).filter(part =>
                  part.partName.includes(value)
               );
               return foundParts.map(p => p._id);
            case 'manufacturer':
               foundParts = Object.values(this.parts).filter(part =>
                  part.manufacturer.includes(value)
               );
               return foundParts.map(p => p._id);
            case 'inventory':
               var num = parseInt(value);
               foundParts = Object.values(this.parts).filter(
                  part => part.inventory === num
               );
               return foundParts.map(p => p._id);
            case 'ordered':
               num = parseInt(value);
               foundParts = Object.values(this.parts).filter(
                  part => part.ordered === num
               );
               return foundParts.map(p => p._id);
            case 'tags':
               foundParts = Object.values(this.parts).filter(part =>
                  part.tags.includes(value)
               );
               return foundParts.map(p => p._id);
            default:
               return null;
         }
      }
      return null;
   }

   static searchPackages(prop: PackageSearchProps, value: string): string[] | null {
      if (this.packages) {
         switch (prop) {
            case 'name':
               var foundPackages = Object.values(this.packages).filter(pck =>
                  pck.name.includes(value)
               );
               return foundPackages.map(p => p._id);
            case 'packageId':
               foundPackages = Object.values(this.packages).filter(pck =>
                  pck.packageId.includes(value)
               );
               return foundPackages.map(p => p._id);
            case 'leads':
               const num = parseInt(value);
               foundPackages = Object.values(this.packages).filter(
                  pck => pck.leads === num
               );
               return foundPackages.map(p => p._id);
            default:
               return null;
         }
      }
      return null;
   }
   // #endregion

   // #region Server Call Methods
   // #region Update Methods
   private static async updateUser() {
      try {
         Message.log('Updating User...');
         const req = URLHelper.buildDataFetch(
            'user',
            'PATCH',
            undefined,
            this.user
         );
         const res = await fetch(req.url, req.config);
         if (URLHelper.quickStatusCheck(res.status)) {
            const data = (await res.json()) as UpdatedUserResponse;
            Message.response('User Updated.', res.status);
            this.user = data.user;
            this.updateUserObservers(data.user);
         } else {
            const data = (await res.json()) as MessageResponse;
            Message.response(data.message, res.status);
         }
      } catch (err) {
         const error = err as Error;
         if (error.message) {
            Message.msg(error.message, 'error');
         } else {
            Message.msg('Unknown error', 'error');
         }
      }
   }

   static async updatePackage(pack: PackageModel) {
      Message.log('Updating Package...');
      try {
         console.log(pack);
         const req = URLHelper.buildDataFetch('packages', 'PATCH', '', pack);
         const res = await fetch(req.url, req.config);
         if (URLHelper.quickStatusCheck(res.status)) {
            const data = (await res.json()) as UpdatedPackageResponse;
            this.packages[data.package._id] = data.package;
            Message.response('Package Updated.', res.status);
            this.updatePackageObservers(data.package);
         } else {
            const data = (await res.json()) as MessageResponse;
            Message.response(data.message, res.status);
         }
      } catch (err) {
         const error = err as Error;
         if (error.message) {
            Message.msg(error.message, 'error');
         } else {
            Message.msg('Unknown error', 'error');
         }
      }
   }

   static async updatePart(part: PartModel) {
      Message.msg('Starting part update', 'ok');
      try {
         const req = URLHelper.buildDataFetch('parts', 'PATCH', '', part);
         const res = await fetch(req.url, req.config);
         if (URLHelper.quickStatusCheck(res.status)) {
            const data = (await res.json()) as UpdatedPartResponse;
            this.parts[data.part._id] = data.part;
            Message.response('Updated Part', res.status);
            this.updatePartObservers(data.part);
         } else {
            const data = (await res.json()) as MessageResponse;
            Message.response(data.message, res.status);
         }
      } catch (err) {
         const error = err as Error;
         if (error.message) {
            Message.msg(error.message, 'error');
         } else {
            Message.msg('Unknown error', 'error');
         }
      }
   }
   // #endregion

   private static async fetchUserData() {
      try {
         if (this.user) {
            const req = URLHelper.buildDataFetch('user', 'GET', this.user._id);
            const res = await fetch(req.url, req.config);
            if (URLHelper.quickStatusCheck(res.status)) {
               const data = (await res.json()) as UserDataResponse;
               this.parts = data.parts;
               this.packages = data.packages;
               Message.msg(
                  'User Login and setup Complete',
                  URLHelper.statusCheck(res.status)
               );
               this.updateUserObservers(this.user);
            } else {
               const data = (await res.json()) as MessageResponse;
               Message.msg(data.message, URLHelper.statusCheck(res.status));
            }
         } else {
            Message.msg('Your already logged in. how did you do that?', 'error');
         }
      } catch (err) {
         const error = err as Error;
         if (error.message) {
            Message.msg(error.message, 'error');
         } else {
            Message.msg('Unknown error', 'error');
         }
      }
   }

   // #region New Requests
   static async newPart(partName: string) {
      if (partName && this.user) {
         Message.log('Creating new part...');
         const req = URLHelper.buildDataFetch('parts', 'POST', partName);
         const res = await fetch(req.url, req.config);
         if (URLHelper.quickStatusCheck(res.status)) {
            const data = (await res.json()) as NewPartResponse;
            if (data.user) {
               this.user = data.user;
               this.parts = data.parts;
               Message.msg('Part Created successfuly.', 'ok');
               this.updateUserObservers(data.user);
            } else {
               Message.msg('Part Creation Error.', 'error');
            }
         } else {
            const data = (await res.json()) as MessageResponse;
            Message.msg(data.message, URLHelper.statusCheck(res.status));
         }
      }
   }

   static async newPackage(pack: PackageModel) {
      Message.log('Creating Package...');
      try {
         const req = URLHelper.buildDataFetch('packages', 'POST', '', pack);
         const res = await fetch(req.url, req.config);
         console.log(pack);
         if (URLHelper.quickStatusCheck(res.status)) {
            const data = (await res.json()) as NewPackageResponse;
            if (data) {
               this.user = data.user;
               this.packages = data.packages;
               Message.response('Package Created.', res.status);
               console.log(data.user);
               this.updateUserObservers(data.user);
            } else {
               Message.response('No Data Returned.', res.status);
            }
         } else {
            const data = (await res.json()) as MessageResponse;
            Message.response(data.message, res.status);
         }
      } catch (err) {
         const error = err as Error;
         if (error.message) {
            Message.msg(error.message, 'error');
         } else {
            Message.msg('Unknown error', 'error');
         }
      }
   }
   // #endregion

   // #region Delete Requests
   static async deletePart(partId: string) {
      try {
         Message.log('Deleting Part');
         const req = URLHelper.buildDataFetch('parts', 'DELETE', partId);
         const res = await fetch(req.url, req.config);
         console.log(partId);
         if (URLHelper.quickStatusCheck(res.status)) {
            const data = (await res.json()) as DeletedResponse;
            console.log(data);
            if (data) {
               this.user = data.user;
               delete this.parts[partId];
               Message.response('Part Deleted.', res.status);
               this.updateUserObservers(data.user);
            } else {
               Message.response('No Data Returned', res.status);
            }
         } else {
            const data = (await res.json()) as MessageResponse;
            Message.response(data.message, res.status);
         }
      } catch (err) {
         const error = err as Error;
         if (error.message) {
            Message.msg(error.message, 'error');
         } else {
            Message.msg('Unknown error', 'error');
         }
      }
   }

   static async deletePackage(packageId: string) {
      try {
         Message.log('Deleting Package');
         const req = URLHelper.buildDataFetch('parts', 'DELETE', packageId);
         const res = await fetch(req.url, req.config);
         console.log(packageId);
         if (URLHelper.quickStatusCheck(res.status)) {
            const data = (await res.json()) as DeletedResponse;
            console.log(data);
            if (data) {
               this.user = data.user;
               delete this.packages[packageId];
               Message.response('Package Deleted.', res.status);
               this.updateUserObservers(data.user);
            } else {
               Message.response('No Data Returned', res.status);
            }
         } else {
            const data = (await res.json()) as MessageResponse;
            Message.response(data.message, res.status);
         }
      } catch (err) {
         const error = err as Error;
         if (error.message) {
            Message.msg(error.message, 'error');
         } else {
            Message.msg('Unknown error', 'error');
         }
      }
   }
   // #endregion

   static async autoLogin() {
      try {
         // ! Keeps locking up...
         // Message.log('Attempting Auto-Login...');
         const userId = Cookies.get('userId');
         const loggedIn = Cookies.get('loggedIn');
         if (userId && loggedIn === 'true') {
            const req = URLHelper.buildDataFetch('user', 'GET', userId);
            const res = await fetch(req.url, req.config);
            if (URLHelper.quickStatusCheck(res.status)) {
               const data = (await res.json()) as LoginResponse;
               if (data.user) {
                  Cookies.set('loggedIn', 'true');
                  this.user = data.user;
                  await this.fetchUserData();
               }
            } else {
               const data = (await res.json()) as MessageResponse;
               Message.response(data.message, res.status);
            }
         } else {
            Message.msg('Not logged in...', 'unauth');
         }
      } catch (err) {
         const error = err as Error;
         if (error.message) {
            Message.msg(error.message, 'error');
         } else {
            Message.msg('Unknown error', 'error');
         }
      }
   }

   // #region Authentication Handling
   static async login(creds: Creds) {
      try {
         var response: StatusResult = 'ok';
         const req = URLHelper.buildAuthFetch('login', creds);
         Message.log('Starting Login Attempt');
         const res = await fetch(req.url, req.config);
         if (URLHelper.quickStatusCheck(res.status)) {
            const data = (await res.json()) as LoginResponse;
            if (data.user) {
               Cookies.set('userId', data.user._id);
               Cookies.set('loggedIn', 'true');
               this.user = data.user;
               await this.fetchUserData();
            } else {
               Message.msg('Login Issue', URLHelper.statusCheck(res.status));
            }
         } else {
            const data = (await res.json()) as MessageResponse;
            Message.msg(data.message, URLHelper.statusCheck(res.status));
         }
         if (response === 'ok') {
            return URLHelper.statusCheck(res.status);
         }
         return response;
      } catch (err) {
         const error = err as Error;
         if (error.message) {
            Message.msg(error.message, 'error');
         } else {
            Message.msg('Unknown error', 'error');
         }
      }
   }

   static async register(creds: Creds) {
      if (this.user) {
         Message.msg('A user is logged in. logout first!', 'error');
         return;
      }
      try {
         const req = URLHelper.buildAuthFetch('register', creds);
         console.log('Starting Register Attempt');
         const res = await fetch(req.url, req.config);
         if (URLHelper.quickStatusCheck(res.status)) {
            // TODO - Change the server response to just send a message.
            //        The userId doesnt need to be sent when done.
            const data = (await res.json()) as RegisterResponse;
            console.log(data);
            Message.response(data.message, res.status);
         } else {
            const data = (await res.json()) as MessageResponse;
            console.log(data.message);
            Message.response(data.message, res.status);
         }
      } catch (err) {
         const error = err as Error;
         if (error.message) {
            Message.msg(error.message, 'error');
         } else {
            Message.msg('Unknown error', 'error');
         }
      }
   }

   static async unregister(confUsername: string) {
      if (this.user) {
         if (confUsername === this.user.username) {
            try {
               const req = URLHelper.buildAuthFetch('unregister');
               const res = await fetch(req.url, req.config);
               if (URLHelper.quickStatusCheck(res.status) && res.status === 201) {
                  const data = (await res.json()) as UnregisterResponse;
                  console.log(data);
                  if (data.success) {
                     this.user = null;
                     this.parts = {};
                     this.packages = {};
                     Cookies.set('loggedIn', 'false');
                     Cookies.remove('userId');
                     Cookies.remove('connect.sid');
                     this.updateUserObservers(null);
                  }
                  Message.response(data.message, res.status);
               } else {
                  const data = (await res.json()) as MessageResponse;
                  Message.response(data.message, res.status);
               }
            } catch (err) {
               const error = err as Error;
               if (error.message) {
                  Message.msg(error.message, 'error');
               } else {
                  Message.msg('Unknown error', 'error');
               }
            }
         } else {
            Message.msg(
               'Username did not match. Be careful. This deletes EVERYTHING!',
               'error'
            );
         }
      } else {
         Message.msg('No user logged in... Unknown Error', 'error');
      }
   }

   private static postLogout() {
      console.log('In Post Logout.');
      this.user = null;
      this.parts = {};
      Cookies.set('loggedIn', 'false');
      Cookies.remove('userId');
      Cookies.remove('connect.sid');
      this.updateUserObservers(null);
   }

   static async logout() {
      try {
         const req = URLHelper.buildAuthFetch('logout');
         console.log('Starting Logout Attempt');
         const res = await fetch(req.url, req.config);
         const data = (await res.json()) as MessageResponse;
         // console.log(data.message);
         if (URLHelper.quickStatusCheck(res.status)) {
            this.postLogout();
         }
         Message.msg(data.message, URLHelper.statusCheck(res.status));
      } catch (err) {
         const error = err as Error;
         if (error.message) {
            Message.msg(error.message, 'error');
         } else {
            Message.msg('Unknown error', 'error');
         }
      }
   }
   // #endregion
   // #endregion

   // #region Observer Methods
   static addUserObserver(id: string, callback: UserCallback) {
      this.observers.user[id] = callback;
   }

   static addPartObserver(partId: string, obsId: string, callback: PartCallback) {
      if (partId) {
         if (!this.observers.parts[partId]) {
            this.observers.parts[partId] = {};
         }
         this.observers.parts[partId][obsId] = callback;
      }
   }

   static addPackageObserver(
      packageId: string,
      obsId: string,
      callback: PackageCallback
   ) {
      if (packageId) {
         if (!this.observers.packages[packageId]) {
            this.observers.packages[packageId] = {};
         }
         this.observers.packages[packageId][obsId] = callback;
      }
   }

   static removeUserObserver(id: string) {
      delete this.observers.user[id];
   }

   static removePartObserver(partId: string, obsId: string) {
      if (partId) {
         if (this.observers.parts[partId]) {
            delete this.observers.parts[partId][obsId];
         }
      }
   }

   static removePackageObserver(packageId: string, obsId: string) {
      if (packageId) {
         if (this.observers.packages[packageId]) {
            delete this.observers.packages[packageId][obsId];
         }
      }
   }

   private static updateUserObservers(user: UserModel | null) {
      if (this.observers.user) {
         // NOTE - Uncomment to debug Observers:
         // console.log({
         //    user: this.user,
         //    parts: this.parts,
         //    packages: this.packages
         // });
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
            Object.values(this.observers.packages[packageItem._id]).forEach(obs =>
               obs(packageItem)
            );
         }
      }
   }
   // #endregion
   // #endregion
}

export default ModelObserver;
