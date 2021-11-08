import { Creds } from "../Models/UserModel";

type APIEndpoint = 'user' | 'parts' | 'packages';
type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type AuthEndpoint = 'login' | 'logout' | 'register' | 'unregister';

export type StatusResult = 'ok' | 'issue' | 'error' | 'unauth';

class URLHelper {
   // #region Props
   private static baseUrl = 'http://localhost:3131';
   private static basicHeader = {
      'Content-type': 'application/json',
   };
   // #endregion

   // #region Methods
   private static buildModelUrl(endpoint: APIEndpoint, id?: string) {
      return `${this.baseUrl}/api/${endpoint}/${id ?? id}`;
   }

   static buildDataFetch(endpoint: APIEndpoint, method: Method, id?: string, body?: any) {
      const url = this.buildModelUrl(endpoint, id);
      const config: RequestInit = {
         method,
         credentials: 'include',
         headers: this.basicHeader,
         body: body ? JSON.stringify(body) : null,
      }
      return {url, config};
   }

   static buildAuthFetch(endpoint: AuthEndpoint, creds?: Creds) {
      if (creds) {
         const url = `${this.baseUrl}/auth/${endpoint}`;
         const config: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers: this.basicHeader,
            body: JSON.stringify(creds),
         };
         return {url, config};
      } else {
         const url = `${this.baseUrl}/auth/${endpoint}`;
         const config: RequestInit = {
            method: 'GET',
            credentials: 'include',
            headers: this.basicHeader,
         };
         return {url, config};
      }
   }

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
   // #endregion
}

export default URLHelper;
