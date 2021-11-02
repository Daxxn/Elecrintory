import React, { useState } from 'react';
import LoginModal from '.';
import UserModel, { Creds } from '../../Data/Models/UserModel';
import { ReactComponent as UserIcon } from '../../Icons/UserIcon1.svg';
import './LoginModal.css';

export interface UserButtonProps {
   user: UserModel | null;
   creds: Creds;
   handleCredsChange: (creds: Creds) => void;
   handleLogin: (creds: Creds) => void;
   handleRegister: (creds: Creds) => void;
   handleLogout: () => void;
}

const UserButton = (props: UserButtonProps): JSX.Element => {
   const {
      creds,
      handleCredsChange,
      handleLogin,
      handleRegister,
      handleLogout,
   } = props;
   const [open, setOpen] = useState<boolean>(false);

   return (
      <div className="base-user-button">

         {open ? (
            <div className="login-container">
               <LoginModal
                  open={open}
                  creds={creds}
                  handleCredsChange={handleCredsChange}
                  handleLogin={handleLogin}
                  handleRegister={handleRegister}
                  handleCloseModal={() => setOpen(false)}
               />
            </div>
         ) : (
            <div>
               <button type="button" className="icon-button" onClick={() => setOpen(true)}>
                  <UserIcon />
               </button>
               <button type="button" onClick={handleLogout}>
                  Logout (Change)
               </button>
            </div>
         )}
      </div>
   );
};

export default UserButton;
