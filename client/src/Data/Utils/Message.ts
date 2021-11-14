import Timer from "./timer";
import StatusCheck, { StatusResult } from './StatusCheck';

export type MessageCallback = (message: string | null) => void;
export type StatusCallback = (status: StatusResult) => void;

class Message {
   // #region Props
   static messageCallback: MessageCallback;
   static statusCallback: StatusCallback;
   // #endregion

   // #region Methods
   /**
    * Display a normal message to the user.
    * @param {string} message Text to display.
    */
   static log(message: string) {
      this.msg(message, 'ok');
   }

   /**
    * Display a message from the server.
    * @param message Message from Server
    * @param statusCode HTTP Status Code.
    */
   static response(message: string, statusCode: number) {
      this.msg(message, StatusCheck.statusCheck(statusCode));
   }

   /**
    * Dsiplay a message to the user with status.
    * Status changes the color of the beckground.
    * @param {string} message Text to display.
    * @param {StatusResult} status Status of the message.
    */
   static msg(message: string, status: StatusResult) {
      // Runs first and sets the UI
      if (process.env.REATC_APP_DEBUG === 'true') {
         console.log(message);
      }
      console.log(message);
      this.messageCallback(message);
      this.statusCallback(status);

      // After the timer is done, resets the
      // message and status on the UI.
      Timer.start(() => {
         this.messageCallback(null);
         this.statusCallback('ok');
      });
   }
   // #endregion
}

export default Message;
