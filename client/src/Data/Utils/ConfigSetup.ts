export type Config = {
   env: string;
   domain: string;
   clientId: string;
   audience: string;
   scope: string;
   serverUrl: string;
   [key: string]: string;
};

export default class ConfigSetup {
   private static config: Config;

   static get() {
      if (this.config) {
         return this.config;
      } else {
         return this.build();
      }
   }

   private static build(): Config {
      this.config = {
         env: process.env.NODE_ENV,
         debug: process.env.REACT_APP_DEBUG ?? '',
         domain: process.env.REACT_APP_DOMAIN ?? '',
         clientId: process.env.REACT_APP_CLIENTID ?? '',
         audience: process.env.REACT_APP_AUDIENCE ?? '',
         scope: process.env.REACT_APP_SCOPE ?? '',
         serverUrl: process.env.REACT_APP_SERVER_URL ?? '',
      };
      const variables: string[] = [];
      Object.keys(this.config).forEach(key => {
         if (this.config[key] === '') {
            variables.push(key);
         }
      });
      if (variables.length > 0) {
         console.error(
            "Some env variables are missing. This is a build issue. I'll fix it as soon as I can."
         );
         console.error('Missing variables: ', variables);
      }
      return this.config;
   }
}
