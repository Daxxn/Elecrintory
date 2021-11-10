import React, { useState, useEffect } from 'react';
import ModelObserver from './Data/Models/ModelObserver';
import UserModel, { Creds } from './Data/Models/UserModel';
import MainView from './Views/MainView';
import URLHelper, { StatusResult } from './Data/Utils/urlHelper';
import MessageRoll from './Components/MessageRoll';
import TitleCard from './Components/TitleCard';
import { PackageModel } from './Data/Models/DataModels';
import Message from './Data/Utils/Message';
import authConfig from './.authConfig.json';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
// import Cookies from 'js-cookie';
import { MessageResponse } from './Data/Models/Responses';
import Cookies from 'js-cookie';

const blankCreds = {
   username: '',
   password: '',
};

function App() {
   const [creds, setCreds] = useState<Creds>(blankCreds);
   const [user, setUser] = useState<UserModel | null>(ModelObserver.getUser());
   const [message, setMessage] = useState<string | null>(null);
   const [status, setStatus] = useState<StatusResult>('ok');
   const [selectedTag, setSelectedTag] = useState<string | null>(null);
   const [selectedPackage, setSelectedPackage] = useState<PackageModel | null>(
      null
   );

   Message.messageCallback = message => setMessage(message);
   Message.statusCallback = status => setStatus(status);

   const { user: authUser, getAccessTokenSilently } = useAuth0();

   //#region Full Login
   useEffect(() => {
      const getUserData = async () => {
         try {
            const accessToken = await getAccessTokenSilently();
            if (accessToken) {
               Cookies.set('accessToken', accessToken);
            } else {
               Cookies.remove('accessToken');
            }

            const createUser = await ModelObserver.fetchUser(
               accessToken,
               authUser?.sub
            );
            if (createUser) {
               if (authUser) {
                  ModelObserver.fetchCreateUser(accessToken, authUser);
               } else {
                  Message.msg('Unable to send user.', 'error');
               }
            }
         } catch (err) {
            Message.msg('Auth0 Error', 'error');
         }
      };
      getUserData()
         .then()
         .catch(err => console.log(err));
      return () => {};
   }, [getAccessTokenSilently, authUser]);
   //#endregion

   //#region Auth Testing
   // useEffect(() => {
   //    const getUserMetadata = async () => {
   //       try {
   //          const accessToken = await getAccessTokenSilently();

   //          if (accessToken) {
   //             if (authUser) {
   //                if (authUser.sub) {
   //                   //  const userDetailsByIdUrl = `https://${authConfig.domain}/api/v2/users/${authUser?.sub}`;
   //                   //  const metadataResponse = await fetch(userDetailsByIdUrl, {
   //                   //     headers: {
   //                   //        Authorization: `Bearer ${accessToken}`,
   //                   //     },
   //                   //  });
   //                   //  const { user_metadata } = await metadataResponse.json();
   //                   //  console.log(user_metadata);
   //                   //  setAuthUser(user_metadata);
   //                   const apiResponse = await fetch(
   //                      `http://localhost:3131/api/user/${authUser.sub}`,
   //                      {
   //                         method: 'GET',
   //                         headers: {
   //                            'Content-Type': 'application/json',
   //                            'Authorization': `Bearer ${accessToken}`,
   //                         },
   //                      }
   //                   );

   //                   if (URLHelper.quickStatusCheck(apiResponse.status)) {
   //                      const data = await apiResponse.json();
   //                      console.log(data);
   //                   } else {
   //                      const data = (await apiResponse.json()) as MessageResponse;
   //                      console.log('API Error : ', data.message);
   //                   }
   //                } else {
   //                   console.log('No Auth User ID.');
   //                }
   //             } else {
   //                console.log('No Auth User.');
   //             }
   //          } else {
   //             console.log('No AccessToken.');
   //          }
   //       } catch (e) {
   //          console.log(e);
   //       }
   //    };

   //    getUserMetadata();
   // }, [getAccessTokenSilently, authUser]);
   //#endregion

   useEffect(() => {
      ModelObserver.addUserObserver('main-app', user => {
         setUser(user);
      });
      return () => {
         ModelObserver.removeUserObserver('main-app');
      };
   }, []);

   useEffect(() => {
      setSelectedPackage(null);
      setSelectedTag(null);
      // ModelObserver.autoLogin();
      return () => {};
   }, []);

   // #region Auth Handlers
   //  const handleLogin = async () => {
   //     await ModelObserver.login(creds);
   //     setCreds(blankCreds);
   //  };

   //  const handleRegister = async () => {
   //     await ModelObserver.register(creds);
   //     setCreds(blankCreds);
   //  };

   //  const handleLogout = async () => {
   //     if (user) {
   //        setMessage('starting Logout...');
   //        await ModelObserver.logout();
   //        setCreds(blankCreds);
   //        setSelectedTag(null);
   //        setSelectedPackage(null);
   //     } else {
   //        console.log('No user logged in. Didnt start logout.');
   //     }
   //  };

   const handleCredsChange = (creds: Creds) => {
      setCreds(creds);
   };

   return (
      <div className="App">
         <TitleCard
            user={user}
            creds={creds}
            // handleLogin={handleLogin}
            // handleRegister={handleRegister}
            // handleLogout={handleLogout}
            handleLogin={() => console.log('Login Depreciated')}
            handleRegister={() => console.log('Login Depreciated')}
            handleLogout={() => console.log('Login Depreciated')}
            handleCredsChange={handleCredsChange}
         />
         <MainView
            user={user}
            selectedTag={selectedTag}
            selectedPackage={selectedPackage}
            handleSelectTag={tag => setSelectedTag(tag)}
            handleSetSelectedPackage={setSelectedPackage}
         />
         <MessageRoll message={message} status={status} />
      </div>
   );
}

export default App;
