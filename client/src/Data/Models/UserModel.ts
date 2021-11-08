import { BaseModel } from "./DataModels";
import SettingsModel from "./SettingsModel";

export type Creds = {
   username: string;
   password: string;
}

interface UserModel extends BaseModel {
   username: string;
   parts: string[];
   packages: string[];
   settings: SettingsModel;
}

class UserModel {
   username = '';
   parts: string[] = [];
   packages: string[] = [];
}

export default UserModel;
