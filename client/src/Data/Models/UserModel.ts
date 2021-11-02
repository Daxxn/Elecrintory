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
   // #region Props
   username = '';
   parts: string[] = [];
   packages: string[] = [];
   // #endregion

   // #region Methods
   // #endregion
}

export default UserModel;
