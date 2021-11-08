import React, { useState } from 'react';
import SettingsModel from '../../Data/Models/SettingsModel';
import './UserProfileView.css';

export interface EditSettingsProps {
   settings: SettingsModel;
   handleCloseEdit: (settings: SettingsModel | null) => void;
}

const EditSettings = (props: EditSettingsProps): JSX.Element => {
   const { settings, handleCloseEdit } = props;
   const [currSettings, setCurrSettings] = useState<SettingsModel>(settings);

   const handleEditOpeningView = (value: string) => {
      const num = Number.parseInt(value);
      if (!isNaN(num)) {
         setCurrSettings({
            ...currSettings,
            openingView: num,
         });
      }
   };

   return (
      <div className="edit-settings-cont">
         <div className="edit-settings-controls">
            <button type="button" onClick={() => handleCloseEdit(null)}>
               Cancel
            </button>
            <button type="button" onClick={() => handleCloseEdit(currSettings)}>
               Save
            </button>
         </div>
         <div className="">
            <label>Starting View:</label>
            <input
               type="number"
               onChange={e => handleEditOpeningView(e.target.value)}
               value={currSettings.openingView}
            />
         </div>
      </div>
   );
};

export default EditSettings;
