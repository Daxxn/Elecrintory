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
  
  // #region Test Methods
  
  // // Login attemt on load:
  // // ! Its borked. it fires multiple times and the cookies arent working properly.
  // useEffect(() => {
  //   const userId = Cookies.get('userId');
  //   const loggedIn = Cookies.get('loggedIn');
  //   if (userId && loggedIn === 'true') {
  //     const req = URLHelper.buildDataFetch('user', 'GET', userId);
  //     fetch(req.url, req.config)
  //       .then(res => {
  //         if (URLHelper.quickStatusCheck(res.status)) {
  //           throw new Error(res.statusText);
  //         }
  //         return res.json();
  //       })
  //       .then((data: UserGetResponse) => {
  //         ModelObserver.setUser(data.user);
  //         ModelObserver.setPartCollection(data.parts);
  //         setCreds(blankCreds);
  //         Cookies.set('userId', data.user._id);
  //         console.log(data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         setMessage(err.message);
  //       });
  //   } else {
  //     console.log('No session. Need to log in.');
  //   }
  //   return () => {

  //   }
  // }, []);

  // const testRegister = async () => {
  //   try {
  //     const req = URLHelper.buildAuthFetch(
  //       'register',
  //       {
  //         username: 'Daxxn',
  //         password: '123456789'
  //       }
  //     );
  //     const res = await fetch(req.url, req.config);
  //     const data = await res.json();
  //     console.log(data);
  //     const status = URLHelper.statusCheck(res.status);
  //     setStatus(status);
  //     setCreds(blankCreds);
  //     if (URLHelper.statusCheck(res.status) !== 'error') {
  //       setMessage(data.message);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const testLogin = async () => {
  //   try {
  //     const req = URLHelper.buildAuthFetch(
  //       'login',
  //       {
  //         username: 'Daxxn',
  //         password: '123456789'
  //       }
  //     );
  //     console.log(req);
  //     const res = await fetch(req.url, req.config);
  //     const data = await res.json();
  //     console.log(data);
  //     const status = URLHelper.statusCheck(res.status);
  //     setStatus(status);
  //     if (URLHelper.quickStatusCheck(res.status)) {
  //       const userData = data as UserGetResponse;
  //       Cookies.set('userId', userData.user._id);
  //       Cookies.set('loggedIn', 'true');
  //       ModelObserver.setPartCollection(userData.parts);
  //       ModelObserver.setUser(userData.user);
  //       setCreds(blankCreds);
  //     } else {
  //       const issueMsg = data as MessageResponse;
  //       setMessage(issueMsg.message);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const testLogout = async () => {
  //   try {
  //     const req = URLHelper.buildAuthFetch(
  //       'logout'
  //     );
  //     const res = await fetch(req.url, req.config);
  //     const data = await res.json() as MessageResponse;
  //     const status = URLHelper.statusCheck(res.status);
  //     setStatus(status);
  //     console.log(data);
  //     if (URLHelper.quickStatusCheck(res.status)) {
  //       console.log('Successfull Logout...');
  //       ModelObserver.postLogout();
  //       setCreds(blankCreds);
  //       Cookies.remove('userId');
  //     } else {
  //       setMessage(data.message);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const testGetUser = async () => {
  //   try {
  //     const id = Cookies.get('userId');
  //     const req = URLHelper.buildDataFetch('user', 'GET', id);
  //     const res = await fetch(req.url, req.config);
  //     const status = URLHelper.statusCheck(res.status);
  //     setStatus(status);
  //     const data = await res.json();
  //     if (URLHelper.quickStatusCheck(res.status)) {
  //       const userData = data as UserGetResponse;
  //       ModelObserver.setUser(userData.user);
  //       ModelObserver.setPartCollection(userData.parts);
  //     } else {
  //       const msg = data as MessageResponse;
  //       setMessage(msg.message);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // #endregion

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
        <MainView user={user} />
        <MessageRoll message={message} status={status} />
    </div>
  );
}

export default App;
