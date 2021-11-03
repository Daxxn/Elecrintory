import React, { ChangeEvent, useState } from 'react';
import { Creds } from '../../Data/Models/UserModel';
import './LoginModal.css';

export interface LoginModalProps {
   creds: Creds;
   open: boolean;
   handleCredsChange: (creds: Creds) => void;
   handleLogin: (creds: Creds) => void;
   handleRegister: (creds: Creds) => void;
   handleCloseModal: () => void;
}

const LoginModal = (props: LoginModalProps): JSX.Element => {
   const [mode, setMode] = useState<boolean>(true);
   const {
      open,
      creds,
      handleLogin,
      handleCredsChange,
      handleRegister,
      handleCloseModal,
   } = props;

   const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.id === 'username-input') {
         handleCredsChange({
            username: e.target.value,
            password: creds?.password,
         });
      } else {
         handleCredsChange({
            username: creds?.username,
            password: e.target.value,
         });
      }
   };

   return (
      <div className={`login-modal${open ? 'open' : 'closed'}`}>
         {mode ? (
            // Login Mode
            <div className="login-bg">
               <p>Login</p>
               <div className="item-container">
                  <p>Username</p>
                  <input
                     className="item-input"
                     id="username-input"
                     onChange={handleInput}
                     value={creds.username}
                  />
               </div>
               <div className="item-container">
                  <p>Password</p>
                  <input
                     className="item-input"
                     id="password-input"
                     onChange={handleInput}
                     value={creds.password}
                  />
               </div>
               <button type="button" onClick={() => handleLogin(creds)}>Login</button>
               <button type="button" onClick={() => setMode(false)}>Register</button>
            </div>
         ) : (
            // Register Mode
            // Do other register stuff later...
            <div className="login-bg">
               <p>Register</p>
               <div className="item-container">
                  <p>Username</p>
                  <input
                     className="item-input"
                     id="username-input"
                     onChange={handleInput}
                     value={creds.username}
                  />
               </div>
               <div className="item-container">
                  <p>Password</p>
                  <input
                     className="item-input"
                     id="password-input"
                     onChange={handleInput}
                     value={creds.password}
                  />
               </div>
               <button type="button" onClick={() => handleRegister(creds)}>Register</button>
               <button type="button" onClick={() => setMode(true)}>Back</button>
            </div>
         )}
         <button type="button" onClick={handleCloseModal}>
            Close
         </button>
      </div>
   );
};

export default LoginModal;
