export type StatusResult = 'ok' | 'issue' | 'error' | 'unauth';

class StatusCheck {
   static statusCheck(status: number): StatusResult {
      if (status === 500) return 'error';

      if (status >= 200 && status < 300) {
         return 'ok';
      } else if (status >= 300 && status < 400) {
         return 'issue';
      } else if (status === 401) {
         return 'unauth';
      } else {
         return 'error';
      }
   }

   static quickStatusCheck(status: number): boolean {
      if (status >= 200 && status < 300) {
         return true;
      }
      return false;
   }
}

export default StatusCheck;
