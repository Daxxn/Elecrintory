import React from 'react';
import Item from '../../Components/SimpleComponents/Item';
import UserModel from '../../Data/Models/UserModel';
import './UserProfileView.css';

export interface UserProfileViewProps {
   user: UserModel | null;
}

const UserProfileView = (props: UserProfileViewProps): JSX.Element => {
   const { user } = props;

   return user ? (
      <div className="base-user-profile-cont">
         <Item label="username" type="str" value={user.username} />
         <Item label="Parts" type="num" value={user.parts.length} />
         <Item label="Packages" type="num" value={user.packages.length} />
      </div>
   ) : (
      <h3>Not Logged In.</h3>
   );
};

export default UserProfileView;
