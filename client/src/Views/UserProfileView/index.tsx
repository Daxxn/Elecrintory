import React, { useState } from 'react';
import Expander from '../../Components/Expander';
import Item from '../../Components/SimpleComponents/Item';
import ModelObserver from '../../Data/Models/ModelObserver';
import SettingsModel from '../../Data/Models/SettingsModel';
import UserModel from '../../Data/Models/UserModel';
import EditSettings from './EditSettings';
import DeleteButton from '../../Components/DeleteButton';
import Message from '../../Data/Utils/Message';
import UserProfile from '../../Components/SimpleComponents/Auth/UserProfile';
import './UserProfileView.css';
import { useAuth0 } from '@auth0/auth0-react';

export interface UserProfileViewProps {
   user: UserModel | null;
}

const UserProfileView = (props: UserProfileViewProps): JSX.Element => {
   const { user } = props;
   const [editMode, setEditMode] = useState<boolean>(false);
   const { user: authUser } = useAuth0();

   const handleCloseEdit = (current: SettingsModel | null) => {
      if (current && user) {
         const newUser = { ...user };
         newUser.settings = current;
         // ModelObserver.setUser(newUser);
         ModelObserver.setUserSettings(current);
      }
      setEditMode(false);
   };

   const handleDeleteAccounts = async () => {
      const confirmedUsername = window.prompt('Confirm your username:');
      if (confirmedUsername) {
         Message.msg('Not sure how to delete the Auth0 account yet...', 'issue');
      } else {
         Message.msg('No username was provided. BE CAREFULL!!', 'error');
      }
   };

   const handleDeleteLocalAccount = async () => {
      const confirmedUsername = window.prompt('Confirm your username:');
      if (confirmedUsername) {
         await ModelObserver.fetchDeleteUser(authUser?.sub);
      } else {
         Message.msg('No username was provided. BE CAREFULL!!', 'error');
      }
   };

   return user ? (
      <div className="base-user-profile-cont">
         <UserProfile />
         <DeleteButton handleDelete={handleDeleteAccounts}>
            {'Delete Auth0 & Local Accounts'}
         </DeleteButton>
         <DeleteButton handleDelete={handleDeleteLocalAccount}>
            Delete Local Account
         </DeleteButton>
         <div className="settings-cont">
            <h3>Settings</h3>
            <Expander>
               {editMode ? (
                  <EditSettings
                     settings={user.settings}
                     handleCloseEdit={handleCloseEdit}
                  />
               ) : (
                  <div className="disp-settings-cont">
                     <button type="button" onClick={() => setEditMode(true)}>
                        Edit
                     </button>
                     <Item
                        label="Starting View"
                        type="num"
                        value={user.settings.openingView}
                     />
                  </div>
               )}
            </Expander>
         </div>
      </div>
   ) : (
      <h3>Not Logged In.</h3>
   );
};

export default UserProfileView;
