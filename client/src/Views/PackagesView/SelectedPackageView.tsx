import React, { useState } from 'react';
import PackageControls from '../../Components/PackageControls';
import Number from '../../Components/SimpleComponents/Number';
import { PackageModel } from '../../Data/Models/DataModels';
import './PackagesView.css';

const blankPackage = {
   desc: '',
   leads: 1,
   name: '',
   packageId: '',
   _id: '',
   __v: 0,
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
   handleDeletePackage: () => void;
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
      handleDeletePackage,
   } = props;

   const [newPackage, setNewPackage] = useState<PackageModel>(blankPackage);

   // #region New Package Handlers
   /**
    * Set the updated name of the new package.
    * @param value Updated name
    */
   const handleNameInput = (value: string) => {
      setNewPackage({
         ...newPackage,
         name: value,
      });
   };

   /**
    * Set the updated packageID of the new package.
    * @param value Updated packageId
    */
   const handleIDInput = (value: string) => {
      setNewPackage({
         ...newPackage,
         packageId: value,
      });
   };

   /**
    * Set the updated leads of the new package.
    * @param value Updated leads
    */
   const handleLeadInput = (num: number) => {
      setNewPackage({
         ...newPackage,
         leads: num,
      });
   };

   /**
    * Set the updated description of the new package.
    * @param value Updated desc
    */
   const handleDescInput = (value: string) => {
      setNewPackage({
         ...newPackage,
         desc: value,
      });
   };
   // #endregion

   /**
    * Deselect package and clear editor view.
    */
   const handleClear = () => {
      // Clear selected package
      if (!selectedPackage) {
         setNewPackage(blankPackage);
      } else {
         handleClearPackage();
      }
   };

   /**
    * Either update the selected
    * package or create a new package.
    */
   const handleCreate = () => {
      // Create a new package.
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
                     className={selectedPackage.name ? '' : 'invalid-input'}
                     id="name-input"
                     onChange={e => handleNameChange(e.target.value)}
                     value={selectedPackage.name}
                  />
               </div>
               <div className="item-container">
                  <p>Package ID</p>
                  <input
                     className={selectedPackage.packageId ? '' : 'invalid-input'}
                     id="id-input"
                     onChange={e => handleIDChange(e.target.value)}
                     value={selectedPackage.packageId}
                  />
               </div>
               <div className="item-container">
                  <p>Leads</p>
                  <Number
                     value={selectedPackage.leads}
                     handleChange={num => handleLeadChange(num)}
                     disabled={false}
                     min={1}
                     max={500}
                  />
               </div>
               <div className="item-container">
                  <p>description</p>
                  <textarea
                     className=""
                     id="desc-input"
                     placeholder="Description"
                     onChange={e => handleDescChange(e.target.value)}
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
                     className={newPackage.name ? '' : 'invalid-input'}
                     id="name-input"
                     onChange={e => handleNameInput(e.target.value)}
                     value={newPackage.name}
                  />
               </div>
               <div className="item-container">
                  <p>Package ID</p>
                  <input
                     className={newPackage.packageId ? '' : 'invalid-input'}
                     id="id-input"
                     onChange={e => handleIDInput(e.target.value)}
                     value={newPackage.packageId}
                  />
               </div>
               <div className="item-container">
                  <p>Leads</p>
                  <Number
                     value={newPackage.leads}
                     handleChange={num => handleLeadInput(num)}
                     disabled={false}
                     min={1}
                     max={500}
                  />
               </div>
               <div className="item-container">
                  <p>description</p>
                  <textarea
                     className=""
                     id="desc-input"
                     placeholder="Description"
                     onChange={e => handleDescInput(e.target.value)}
                     value={newPackage.desc}
                  />
               </div>
            </div>
         )}
         <PackageControls
            packageSelected={selectedPackage !== null}
            handleAddPackage={handleCreate}
            handleClearPackage={handleClear}
            handleDeletePackage={handleDeletePackage}
         />
      </div>
   );
};

export default SelectedPackageView;
