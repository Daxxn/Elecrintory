import PartModel, { PackageModel } from "../Models/DataModels";
import UserModel from "../Models/UserModel";

type Data = UserModel | PartModel | PackageModel;

export type Callback = (data: Data) => {};

export interface Schedule {
   user: {
      [id: string]: Callback;
   },
   parts: {
      [id: string]: Callback;
   },
   packages: {
      [id: string]: Callback;
   }
};

// TODO - This is NOT done. need to rethink.
export default class UpdateScheduler {
   private static interval: number = 15000;
   private static timerId: NodeJS.Timeout | null;
   private static order: string[] = [];
   private static schedule: Schedule = {
      user: {},
      parts: {},
      packages: {},
   };

   static scheduleUserUpdate(id: string, callback: Callback) {
      this.schedule.user[id] = callback;
      this.start(id)
   }

   static schedulePartUpdate(id: string, callback: Callback) {

   }

   static schedulePackageUpdate(id: string, callback: Callback) {

   }

   private static start(id: string) {
      if (this.timerId !== null) {
         clearTimeout(this.timerId);
      }
      // setTimeout(this.schedule, this.interval, )
   }
}