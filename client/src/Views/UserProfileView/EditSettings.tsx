import React, { useState } from 'react';
import Number from '../../Components/SimpleComponents/Number';
import SettingsModel from '../../Data/Models/SettingsModel';
import './UserProfileView.css';

export interface EditSettingsProps {
   settings: SettingsModel;
   handleCloseEdit: (settings: SettingsModel | null) => void;
}

const EditSettings = (props: EditSettingsProps): JSX.Element => {
   const { settings, handleCloseEdit } = props;
   const [currSettings, setCurrSettings] = useState<SettingsModel>(settings);

   const handleOpenViewChange = (num: number) => {
      setCurrSettings({
         ...currSettings,
         openingView: num,
      });
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
            <Number
               value={currSettings.openingView}
               handleChange={handleOpenViewChange}
               disabled={false}
               max={5}
               min={0}
            />
         </div>
      </div>
   );
};

export default EditSettings;
