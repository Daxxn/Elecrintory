import Cookies from 'js-cookie';
import ConfigSetup from './ConfigSetup';

const config = ConfigSetup.get();

export type Endpoints = 'user' | 'parts' | 'packages';
export type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

class URLHelper2 {
   // #region Props
   static rootUrl: string = config.serverUrl;
   // #endregion

   // #region Methods
   static buildDataRequest(
      endpoint: Endpoints,
      method: Method,
      body?: any,
      secondary?: string,
      id?: string
   ) {
      return {
         url: this.buildUrl(endpoint, secondary, id),
         init: {
            method,
            credentials: 'include',
            body: body ? JSON.stringify(body) : undefined,
            headers: this.buildHeaders(),
         } as RequestInit,
      };
   }

   private static buildUrl(endpoint: Endpoints, secondary?: string, id?: string) {
      return `${this.rootUrl}/api/${endpoint}${secondary ? `/${secondary}` : ''}${
         id ? `/${id}` : ''
      }`;
   }

   private static buildHeaders() {
      const accessToken = Cookies.get('accessToken');
      if (accessToken) {
         return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
         };
      } else {
         return {
            'Content-Type': 'application/json',
         };
      }
   }
   // #endregion
}

export default URLHelper2;
