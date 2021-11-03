import { BaseModel } from "./DataModels";

export type Creds = {
   username: string;
   password: string;
}

interface UserModel extends BaseModel {
   username: string;
   parts: string[];
   packages: string[];
}

class UserModel {
   username = '';
   parts: string[] = [];
   packages: string[] = [];
}

export default UserModel;
