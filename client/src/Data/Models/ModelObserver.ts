import PartModel, {
   PackageCollection,
   PackageModel,
   PackageSearchProps,
   PartCollection,
   PartSearchProps,
} from './DataModels';
import UserModel from './UserModel';
import {
   DeletedResponse,
   LoginResponse,
   MessageResponse,
   NewPackageResponse,
   NewPartResponse,
   UpdatedPackageResponse,
   UpdatedPartResponse,
   UpdatedUserResponse,
   UserDataResponse,
} from './Responses';
import Cookies from 'js-cookie';
import Message from '../Utils/Message';
import SettingsModel from './SettingsModel';
import { User as Auth0User } from '@auth0/auth0-react';
import URLHelper2 from '../Utils/URLHelper';
import StatusCheck from '../Utils/StatusCheck';

// #region Auth Types
export type AuthGetUser = {
   userData: object;
};
// #endregion

//#region Observer Types
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
//#endregion

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
         // await this.updateUser();
         this.fetchUpdateUser();
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
      this.fetchUpdatePart(part);
   }

   static setPackage(packageItem: PackageModel) {
      this.packages[packageItem._id] = packageItem;
      // this.updatePackage(packageItem);
      this.fetchUpdatePackage(packageItem);
      // this.updatePackageObservers(packageItem);
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

   // #region Auth0 Authentication Handling
   // #region User Methods
   static async fetchUser(
      accessToken: string,
      userSub: string | undefined
   ): Promise<boolean> {
      try {
         if (accessToken) {
            if (userSub) {
               const req = URLHelper2.buildDataRequest(
                  'user',
                  'GET',
                  null,
                  '',
                  userSub
               );
               const apiResponse = await fetch(req.url, req.init);

               if (StatusCheck.quickStatusCheck(apiResponse.status)) {
                  if (apiResponse.status === 202) {
                     const createUser = window.confirm('Create new user?');
                     if (createUser) {
                        return true;
                     }
                  } else {
                     const { user, parts, packages } =
                        (await apiResponse.json()) as UserDataResponse;
                     this.user = user;
                     this.parts = parts;
                     this.packages = packages;
                     Message.response('User data retrieved.', apiResponse.status);
                     this.updateUserObservers(user);
                  }
               } else {
                  const { message } = (await apiResponse.json()) as MessageResponse;
                  Message.response(message, apiResponse.status);
               }
            } else {
               Message.msg('No user ID.', 'error');
            }
         } else {
            Message.msg('No Access Token', 'error');
         }
         return false;
      } catch (err) {
         const error = err as Error;
         if (error.message) {
            Message.msg(error.message, 'error');
         } else {
            Message.msg('Unknown error', 'error');
         }
         return false;
      }
   }

   static async fetchUpdateUser() {
      try {
         if (this.user) {
            const req = URLHelper2.buildDataRequest('user', 'PATCH', this.user);
            const res = await fetch(req.url, req.init);
            if (StatusCheck.quickStatusCheck(res.status)) {
               const { user } = (await res.json()) as UpdatedUserResponse;
               this.user = user;
               Message.response('Updated User.', res.status);
               this.updateUserObservers(user);
            } else {
               const { message } = (await res.json()) as MessageResponse;
               Message.response(message, res.status);
            }
         } else {
            Message.msg('No User Found...', 'error');
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

   static async fetchCreateUser(accessToken: string, authUser: Auth0User) {
      try {
         if (accessToken) {
            if (authUser) {
               const req = URLHelper2.buildDataRequest('user', 'POST', authUser);
               const apiResponse = await fetch(req.url, req.init);

               if (StatusCheck.quickStatusCheck(apiResponse.status)) {
                  const { user } = (await apiResponse.json()) as LoginResponse;
                  this.user = user;
                  this.parts = {};
                  this.packages = {};
                  this.updateUserObservers(user);
                  Message.response('Created User.', apiResponse.status);
               } else {
                  const { message } = (await apiResponse.json()) as MessageResponse;
                  Message.response(message, apiResponse.status);
               }
            } else {
               Message.msg('No user ID.', 'error');
            }
         } else {
            Message.msg('No Access Token', 'error');
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

   static async fetchDeleteUser(userSub: string | undefined) {
      try {
         if (userSub) {
            const accessToken = Cookies.get('accessToken');
            if (accessToken) {
               const req = URLHelper2.buildDataRequest(
                  'user',
                  'DELETE',
                  null,
                  '',
                  userSub
               );
               const apiRes = await fetch(req.url, req.init);
               // const apiRes = await fetch(
               //    `http://localhost:3131/api/user/${userSub}`
               // );

               const { message } = (await apiRes.json()) as MessageResponse;
               Message.response(message, apiRes.status);
               if (StatusCheck.quickStatusCheck(apiRes.status)) {
                  this.user = null;
                  this.parts = {};
                  this.packages = {};
                  this.updateUserObservers(null);
               }
            } else {
               Message.msg('No Access Token.', 'error');
            }
         } else {
            Message.msg('No Auth0 user.', 'error');
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

   // #region Create Methods
   static async fetchCreatePart(partName: string) {
      try {
         if (this.user) {
            if (partName) {
               const req = URLHelper2.buildDataRequest(
                  'parts',
                  'POST',
                  { partName },
                  '',
                  this.user._id
               );
               const res = await fetch(req.url, req.init);
               if (StatusCheck.quickStatusCheck(res.status)) {
                  const { user, parts } = (await res.json()) as NewPartResponse;
                  this.user = user;
                  this.parts = parts;
                  Message.response('Created Part...', res.status);
                  this.updateUserObservers(user);
               } else {
                  const { message } = (await res.json()) as MessageResponse;
                  Message.response(message, res.status);
               }
            } else {
               Message.msg('No Part Name..', 'issue');
            }
         } else {
            Message.msg('User Not found.', 'error');
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

   static async fetchCreatePackage(newPackage: PackageModel) {
      try {
         if (this.user) {
            if (newPackage.name && newPackage.packageId) {
               const req = URLHelper2.buildDataRequest(
                  'packages',
                  'POST',
                  newPackage,
                  '',
                  this.user._id
               );
               const res = await fetch(req.url, req.init);
               if (StatusCheck.quickStatusCheck(res.status)) {
                  const { user, packages } =
                     (await res.json()) as NewPackageResponse;
                  this.user = user;
                  this.packages = packages;
                  Message.response('Created Package...', res.status);
                  this.updateUserObservers(user);
               } else {
                  const { message } = (await res.json()) as MessageResponse;
                  Message.response(message, res.status);
               }
            } else {
               Message.msg('No Name or PackageID...', 'issue');
            }
         } else {
            Message.msg('User Not Found...', 'error');
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

   // #region Update Methods
   static async fetchUpdatePart(part: PartModel) {
      try {
         if (this.user) {
            if (part) {
               const req = URLHelper2.buildDataRequest('parts', 'PATCH', part);
               const res = await fetch(req.url, req.init);
               if (StatusCheck.quickStatusCheck(res.status)) {
                  const { part: updatedPart } =
                     (await res.json()) as UpdatedPartResponse;
                  this.parts[updatedPart._id] = updatedPart;
                  Message.response('Updated Part...', res.status);
                  this.updatePartObservers(updatedPart);
               } else {
                  const { message } = (await res.json()) as MessageResponse;
                  Message.response(message, res.status);
               }
            } else {
               Message.msg('Invalid Part.', 'error');
            }
         } else {
            Message.msg('No User Found...', 'error');
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

   static async fetchUpdatePackage(pack: PackageModel) {
      try {
         if (this.user) {
            if (pack) {
               const req = URLHelper2.buildDataRequest('packages', 'PATCH', pack);
               const res = await fetch(req.url, req.init);
               if (StatusCheck.quickStatusCheck(res.status)) {
                  const { package: updatedPackage } =
                     (await res.json()) as UpdatedPackageResponse;
                  this.packages[updatedPackage._id] = updatedPackage;
                  Message.response('Updated Part...', res.status);
                  this.updatePackageObservers(updatedPackage);
               } else {
                  const { message } = (await res.json()) as MessageResponse;
                  Message.response(message, res.status);
               }
            } else {
               Message.msg('Invalid Part.', 'error');
            }
         } else {
            Message.msg('No User Found...', 'error');
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

   // #region Delete Methods
   static async fetchDeletePart(partId: string) {
      try {
         if (this.user) {
            if (partId) {
               const req = URLHelper2.buildDataRequest(
                  'parts',
                  'DELETE',
                  { partId },
                  '',
                  this.user._id
               );
               const res = await fetch(req.url, req.init);
               if (StatusCheck.quickStatusCheck(res.status)) {
                  const { id, user } = (await res.json()) as DeletedResponse;
                  this.user = user;
                  Message.response(`Part ${id} Delete...`, res.status);
                  this.updateUserObservers(user);
               } else {
                  const { message } = (await res.json()) as MessageResponse;
                  Message.response(message, res.status);
               }
            } else {
               Message.msg('No part ID', 'error');
            }
         } else {
            Message.msg('No User Found...', 'error');
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

   static async fetchDeletePackage(packageId: string) {
      console.log(packageId);
      try {
         if (this.user) {
            if (packageId) {
               const req = URLHelper2.buildDataRequest(
                  'packages',
                  'DELETE',
                  { packageId },
                  '',
                  this.user._id
               );
               const res = await fetch(req.url, req.init);
               if (StatusCheck.quickStatusCheck(res.status)) {
                  const { id, user } = (await res.json()) as DeletedResponse;
                  this.user = user;
                  Message.response(`Package ${id} Delete...`, res.status);
                  this.updateUserObservers(user);
                  return true;
               } else {
                  const { message } = (await res.json()) as MessageResponse;
                  Message.response(message, res.status);
               }
            } else {
               Message.msg('No Package ID', 'error');
            }
         } else {
            Message.msg('No User Found...', 'error');
         }
         return false;
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
