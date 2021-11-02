import React, { useState } from 'react';
import PackageControls from '../../Components/PackageControls';
import { PackageModel } from '../../Data/Models/DataModels';
import './PackagesView.css';

const blankPackage = {
   desc: '',
   leads: 0,
   name: '',
   packageId: '',
   _id: '',
   __v: 0
};

export interface SelectedPackageViewProps {
   selectedPackage: PackageModel | null;
   handleNameChange: (value: string) => void;
   handleIDChange: (value: string) => void;
   handleLeadChange: (value: number) => void;
   handleDescChange: (value: string) => void;

   handleCreatePackage: (pack: PackageModel) => void;
   handleSavePackage: (pack: PackageModel) => void;
   handleClearPackage: () => void;
}

const SelectedPackageView = (props: SelectedPackageViewProps): JSX.Element => {
   const {
      selectedPackage,
      handleNameChange,
      handleIDChange,
      handleLeadChange,
      handleDescChange,

      handleCreatePackage,
      handleSavePackage,
      handleClearPackage,
   } = props;
   const [leadState, setLeadState] = useState<string>(selectedPackage ? selectedPackage.leads.toString() : '0');
   const [newLeadState, setNewLeadState] = useState<string>('0');
   const [newPackage, setNewPackage] = useState<PackageModel>(blankPackage);

   /**
    * Handles string to number conversion for the lead count.
    * (Fucking TypeScript...)
    * @param value Current State
    */
   const handleLeadStateChange = (value: string) => {
      console.log('In Selected Package Leads Update');
      const num = parseInt(value);
      if (isNaN(num)) {
         handleLeadChange(num);
      }
      setLeadState(value);
   };

   // #region New Package Handlers
   const handleNameInput = (value: string) => {
      setNewPackage({
         ...newPackage,
         name: value,
      });
   };

   const handleIDInput = (value: string) => {
      setNewPackage({
         ...newPackage,
         packageId: value,
      });
   };

   const handleLeadsInput = (value: string) => {
      console.log('In New Package Leads Update');
      const num = parseInt(value);
      if (isNaN(num)) {
         setNewPackage({
            ...newPackage,
            leads: num,
         });
      }
      setNewLeadState(value);
   };

   const handleDescInput = (value: string) => {
      setNewPackage({
         ...newPackage,
         desc: value,
      });
   };
   // #endregion

   const handleClear = () => {
      if (!selectedPackage) {
         setNewPackage(blankPackage);
      } else {
         handleClearPackage();
      }
   };

   const handleCreate = () => {
      // Create the new package.
      if (selectedPackage) {
         console.log('Saving Selected Package...');
         handleSavePackage(selectedPackage);
      } else {
         console.log('Creating New Package...');
         handleCreatePackage(newPackage);
      }
   };

   return (
      <div className="base-select-package-view">
         {selectedPackage ? (
            <div className="selected-package-container">
               <h4>Selected Package</h4>
               <div className="item-container">
                  <p>Package Name</p>
                  <input
                     className=""
                     id="name-input"
                     onChange={(e) => handleNameChange(e.target.value)}
                     value={selectedPackage.name}
                  />
               </div>
               <div className="item-container">
                  <p>Package ID</p>
                  <input
                     className=""
                     id="id-input"
                     onChange={(e) => handleIDChange(e.target.value)}
                     value={selectedPackage.packageId}
                  />
               </div>
               <div className="item-container">
                  <p>Leads</p>
                  <input
                     className=""
                     id="leads-input"
                     type="number"
                     min="0"
                     max="1000"
                     onChange={(e) => handleLeadStateChange(e.target.value)}
                     value={leadState}
                  />
               </div>
               <div className="item-container">
                  <p>description</p>
                  <textarea
                     className=""
                     id="desc-input"
                     placeholder="Description"
                     onChange={(e) => handleDescChange(e.target.value)}
                     value={selectedPackage.desc}
                  />
               </div>
            </div>
         ) : (
            <div className="selected-package-container">
               <h4>New Package</h4>
               <div className="item-container">
                  <p>Package Name</p>
                  <input
                     className=""
                     id="name-input"
                     onChange={(e) => handleNameInput(e.target.value)}
                     value={newPackage.name}
                  />
               </div>
               <div className="item-container">
                  <p>Package ID</p>
                  <input
                     className=""
                     id="id-input"
                     onChange={(e) => handleIDInput(e.target.value)}
                     value={newPackage.packageId}
                  />
               </div>
               <div className="item-container">
                  <p>Leads</p>
                  <input
                     className=""
                     id="leads-input"
                     type="number"
                     min="0"
                     max="1000"
                     onChange={(e) => handleLeadsInput(e.target.value)}
                     value={newLeadState}
                  />
               </div>
               <div className="item-container">
                  <p>description</p>
                  <textarea
                     className=""
                     id="desc-input"
                     placeholder="Description"
                     onChange={(e) => handleDescInput(e.target.value)}
                     value={newPackage.desc}
                  />
               </div>
            </div>
         )}
         
         <PackageControls
            packageSelected={selectedPackage !== null}
            handleAddPackage={handleCreate}
            handleClearPackage={handleClear}
         />
      </div>
   );
};

export default SelectedPackageView;
