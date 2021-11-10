import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ModelObserver from '../../../../Data/Models/ModelObserver';
import Item from '../../Item';

const Profile = () => {
   const { user: authUser, isAuthenticated } = useAuth0();
   const user = ModelObserver.getUser();

   return (
      <div>
         {isAuthenticated && authUser ? (
            <div className="profile-container">
               <h2>Auth0 Account</h2>
               <img src={authUser.picture} alt="Unable to find pic..." />
               <Item label="Name" value={authUser.name} type="str" />
               <Item label="Email" value={authUser.email} type="str" />
               <Item label="Site" value={authUser.website} type="str" />
            </div>
         ) : (
            <h2>No Auth0 Account</h2>
         )}
         {user ? (
            <div>
               <h2>Local Account</h2>
               <Item label="username" type="str" value={user.username} />
               <Item label="Total Parts" type="num" value={user.parts.length} />
               <Item
                  label="Total Packages"
                  type="num"
                  value={user.packages.length}
               />
            </div>
         ) : (
            <h2>No Local Account</h2>
         )}
      </div>
   );
};

export default Profile;
