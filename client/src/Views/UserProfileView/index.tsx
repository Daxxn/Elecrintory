import React, { useState } from 'react';
import Expander from '../../Components/Expander';
import Item from '../../Components/SimpleComponents/Item';
import ModelObserver from '../../Data/Models/ModelObserver';
import SettingsModel from '../../Data/Models/SettingsModel';
import UserModel from '../../Data/Models/UserModel';
import EditSettings from './EditSettings';
import DeleteButton from '../../Components/DeleteButton';
import Message from '../../Data/Utils/Message';
import './UserProfileView.css';

export interface UserProfileViewProps {
   user: UserModel | null;
}

const UserProfileView = (props: UserProfileViewProps): JSX.Element => {
   const { user } = props;
   const [editMode, setEditMode] = useState<boolean>(false);

   const handleCloseEdit = (current: SettingsModel | null) => {
      if (current && user) {
         const newUser = { ...user };
         newUser.settings = current;
         ModelObserver.setUser(newUser);
      }
      setEditMode(false);
   };

   const handleConfirmDeleteUser = async () => {
      const confirmedUsername = window.prompt('Confirm your username:');
      if (confirmedUsername) {
         await ModelObserver.unregister(confirmedUsername);
      } else {
         Message.msg('No username was provided. BE CAREFULL!!', 'error');
      }
   };

   return user ? (
      <div className="base-user-profile-cont">
         <Item label="username" type="str" value={user.username} />
         <Item label="Total Parts" type="num" value={user.parts.length} />
         <Item label="Total Packages" type="num" value={user.packages.length} />
         <DeleteButton handleDelete={handleConfirmDeleteUser} />
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
