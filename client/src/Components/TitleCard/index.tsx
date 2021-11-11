import React from 'react';
import UserModel from '../../Data/Models/UserModel';
import LoginButton from '../SimpleComponents/Auth/LoginButton';
import './TitleCard.css';

export interface TitleCardProps {
   user: UserModel | null;
}

const TitleCard = (props: TitleCardProps): JSX.Element => {
   const { user } = props;

   return (
      <div className="base-title-card">
         <h2>Electrintory</h2>
         {user ? <h2>{user.username}</h2> : ''}
         <LoginButton user={user} />
      </div>
   );
};

export default TitleCard;
