import React, { useState, useEffect } from 'react';
import ModelObserver from './data/models/ModelObserver';
import UserModel, { Creds } from './data/models/UserModel';
import MainView from './views/mainView';
import { StatusResult } from './data/utils/urlHelper';
import MessageRoll from './components/messageRoll';
import TitleCard from './components/titleCard';
import './App.css';
// import { MessageResponse, UserDataResponse } from './data/models/Responses';

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

  useEffect(() => {
    ModelObserver.addUserObserver('main-app', (user) => {
      setUser(user);
    });
    return () => {
      ModelObserver.removeUserObserver('main-app');
    };
  }, []);

  useEffect(() => {
    ModelObserver.autoLogin();
    return () => { };
  }, []);

  // #region Auth Handlers
  const handleLogin = async () => {
    const result = await ModelObserver.login(creds);
    setStatus(result);
    setCreds(blankCreds);
  };

  const handleRegister = async () => {
    const result = await ModelObserver.register(creds);
    setStatus(result);
    setCreds(blankCreds);
  };

  const handleLogout = async () => {
    if (user) {
      const result = await ModelObserver.logout();
      setStatus(result);
      setCreds(blankCreds);
    } else {
      console.log('No user logged in. Didnt start logout.');
    }
  };

  const handleCredsChange = (creds: Creds) => {
    setCreds(creds);
  }

  const messageCallback = (message: string, result: StatusResult) => {

  }
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
          messageCallback={messageCallback}
          handleSelectTag={(tag) => setSelectedTag(tag)}
        />
        <MessageRoll message={message} status={status} />
    </div>
  );
}

export default App;
