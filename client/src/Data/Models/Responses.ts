import PartModel, { PackageCollection, PackageModel, PartCollection } from "./DataModels";
import UserModel from "./UserModel";

// #region GENERAL
export type MessageResponse = {
   message: string;
}

export type DeletedResponse = {
   user: UserModel;
   id: string;
}
// #endregion

// #region USER
export type UserDataResponse = {
   user: UserModel;
   parts: PartCollection;
   packages: PackageCollection;
}

export type LoginResponse = {
   user: UserModel;
}

export type RegisterResponse = {
   message: string;
   userId: string;
}

export type UnregisterResponse = {
   message: string;
   success: boolean;
   remParts: number | null;
   remPackages: number | null;
};

export type UpdatedUserResponse = {
   user: UserModel;
}
// #endregion

// #region PART
export type UpdatedPartResponse = {
   part: PartModel;
}

export type NewPartResponse = {
   user: UserModel;
   parts: PartCollection;
}
// #endregion

// #region PACKAGES
export type NewPackageResponse = {
   user: UserModel;
   packages: PackageCollection;
}

export type UpdatedPackageResponse = {
   package: PackageModel;
}
// #endregion