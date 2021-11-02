export type PartCollection = {
   [id: string]: PartModel;
};

export type PackageCollection = {
   [id: string]: PackageModel;
};

export interface BaseModel {
   _id: string;
   __v: number;
}

export interface PackageModel extends BaseModel {
   name: string;
   packageId: string;
   leads: number;
   desc: string;
}

export class PackageModel {
   name: string = '';
   packageId: string = '';
   leads: number = 0;
   desc: string = '';
}

interface PartModel extends BaseModel {
   partName: string;
   datasheet: string;
   manufacturer: string;
   inventory: number;
   ordered: number;
   desc: string;
   tags: string[];
   packages: string[];
}

class PartModel {
   // #region Props
   partName = '';
   datasheet = '';
   // #endregion
}

export default PartModel;