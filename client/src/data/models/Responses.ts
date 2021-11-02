import PartModel, { PackageCollection, PartCollection } from "./DataModels";
import UserModel from "./UserModel";

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

export type UserUpdateResponse = {
   user: UserModel;
}

export type MessageResponse = {
   message: string;
}

export type DeletedPartResponse = {
   user: UserModel;
   partId: string;
}

export type UpdatedPartResponse = {
   part: PartModel;
}

export type NewPartResponse = {
   user: UserModel;
   parts: PartCollection;
}