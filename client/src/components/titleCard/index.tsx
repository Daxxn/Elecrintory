import React from 'react';
import UserModel, { Creds } from '../../data/models/UserModel';
import UserButton from '../loginModal/userButton';
import './titleCard.css'

export interface TitleCardProps {
   user: UserModel | null;
   creds: Creds;
   handleLogout: () => void;
   handleLogin: (creds: Creds) => void;
   handleRegister: (creds: Creds) => void;
   handleCredsChange: (creds: Creds) => void;
}

const TitleCard = (props: TitleCardProps): JSX.Element => {
   const { user, creds, handleLogin, handleLogout, handleRegister, handleCredsChange } = props;

   // return user ? (
   //    <div className="base-title-card">
   //       <h3>Parts Inventory</h3>
   //       <h3>{user.username}</h3>
   //       <button type="button" onClick={handleLogout}>Logout</button>
   //    </div>
   // ) : (
   //    <div className="base-title-card">
   //       <h2>Parts Inventory</h2>
   //       <UserButton
   //          user={user}
   //          creds={creds}
   //          handleLogin={handleLogin}
   //          handleCredsChange={handleCredsChange}
   //          handleRegister={handleRegister}
   //       />
   //       {/* <LoginModal
   //          creds={creds}
   //          handleLogin={handleLogin}
   //          handleRegister={handleRegister}
   //          handleCredsChange={handleCredsChange}
   //       /> */}
   //    </div>
   // );
   return (
      <div className="base-title-card">
         <h2>Parts Inventory</h2>
         {user ? (
            <h2>{user.username}</h2>
         ) : ''}
         <UserButton
            user={user}
            creds={creds}
            handleLogin={handleLogin}
            handleCredsChange={handleCredsChange}
            handleRegister={handleRegister}
            handleLogout={handleLogout}
         />
         {/* <LoginModal
            creds={creds}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            handleCredsChange={handleCredsChange}
         /> */}
      </div>
   );
};

export default TitleCard;
