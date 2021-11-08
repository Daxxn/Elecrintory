import React from 'react';
import UserModel, { Creds } from '../../Data/Models/UserModel';
import UserButton from '../LoginModal/UserButton';
import './TitleCard.css'

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

   return (
      <div className="base-title-card">
         <h2>Electrintory</h2>
         {user ? <h2>{user.username}</h2> : ''}
         <UserButton
            user={user}
            creds={creds}
            handleLogin={handleLogin}
            handleCredsChange={handleCredsChange}
            handleRegister={handleRegister}
            handleLogout={handleLogout}
         />
      </div>
   );
};

export default TitleCard;
