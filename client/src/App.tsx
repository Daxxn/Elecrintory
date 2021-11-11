import React, { useState, useEffect } from 'react';
import ModelObserver from './Data/Models/ModelObserver';
import UserModel from './Data/Models/UserModel';
import { PackageModel } from './Data/Models/DataModels';
import { StatusResult } from './Data/Utils/StatusCheck';
import Message from './Data/Utils/Message';
import Cookies from 'js-cookie';
import MainView from './Views/MainView';
import MessageRoll from './Components/MessageRoll';
import TitleCard from './Components/TitleCard';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

function App() {
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

   //#region Get User credentials and data
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
      return () => {};
   }, []);

   return (
      <div className="App">
         <TitleCard user={user} />
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
