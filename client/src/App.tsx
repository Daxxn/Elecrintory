import React, { useState, useEffect } from 'react';
import ModelObserver from './Data/Models/ModelObserver';
import UserModel, { Creds } from './Data/Models/UserModel';
import MainView from './Views/MainView';
import { StatusResult } from './Data/Utils/urlHelper';
import MessageRoll from './Components/MessageRoll';
import TitleCard from './Components/TitleCard';
import { PackageModel } from './Data/Models/DataModels';
import Message from './Data/Utils/Message';
import './App.css';

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
  const [selectedPackage, setSelectedPackage] = useState<PackageModel | null>(null);

  Message.messageCallback = (message) => setMessage(message);
  Message.statusCallback = (status) => setStatus(status);

  useEffect(() => {
    ModelObserver.addUserObserver('main-app', (user) => {
      setUser(user);
    });
    return () => {
      ModelObserver.removeUserObserver('main-app');
    };
  }, []);

  useEffect(() => {
    // ModelObserver.autoLogin()
    //   .then(result => {
    //     var message = 'Auto-login failed...';
    //     if (result === 'ok') {
    //       message = 'Auto login successful...';
    //     }
    //     messageCallback(message, result);
    //   });
      setSelectedPackage(null);
      setSelectedTag(null);
      ModelObserver.autoLogin();
    return () => {
      // setMessage(null);
      // setStatus('ok');
    };
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setMessage(null);
  //     setStatus('ok');
  //     console.log('Finished Message');
  //   }, 5000);
  //   return () => { }
  // }, [message, status]);

  // #region Auth Handlers
  const handleLogin = async () => {
    // setMessage('starting Login...');
    await ModelObserver.login(creds);
    // setMessage(result === 'ok' ? 'Logged in.' : 'Unable to log in.');
    // setStatus(result);
    setCreds(blankCreds);
  };

  const handleRegister = async () => {
    // setMessage('starting Register...');
    await ModelObserver.register(creds);
    // setMessage(result === 'ok' ? 'Register complete. Login to continue.' : 'Unable to register.');
    // setStatus(result);
    setCreds(blankCreds);
  };

  const handleLogout = async () => {
    if (user) {
      setMessage('starting Logout...');
      await ModelObserver.logout();
      // setMessage(result === 'ok' ? 'Logged out in.' : 'Unable to log out.');
      // setStatus(result);
      setCreds(blankCreds);
      setSelectedTag(null);
      setSelectedPackage(null);
    } else {
      console.log('No user logged in. Didnt start logout.');
    }
  };

  const handleCredsChange = (creds: Creds) => {
    setCreds(creds);
  }

  // const messageCallback = (message: string, result: StatusResult) => {
  //   setMessage(message);
  //   setStatus(result);
  //   console.log('Started Timer.');
  //   Timer.start(() => {
  //     setMessage(null);
  //     setStatus('ok');
  //     console.log('Finished Timer.')
  //   });
  // }

  // NOTE Trying to use the ModelObserver to update the part instead
  // NOTE of the callback nightmare. It may not work as intended tho.
  // const handleAddSelectedPackage = (packageId: string) => {

  // }
  // #endregion
  return (
    <div className="App">
        <TitleCard
          user={user}
          creds={creds}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          handleLogout={handleLogout}
          handleCredsChange={handleCredsChange}
        />
        <MainView
          user={user}
          selectedTag={selectedTag}
          selectedPackage={selectedPackage}
          handleSelectTag={(tag) => setSelectedTag(tag)}
          handleSetSelectedPackage={setSelectedPackage}
          // handleSelectedPack={handleAddSelectedPackage}
        />
        <MessageRoll message={message} status={status} />
    </div>
  );
}

export default App;
