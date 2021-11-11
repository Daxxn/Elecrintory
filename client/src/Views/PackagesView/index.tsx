import React from 'react';
import Package from '../../Components/Package';
import { PackageModel } from '../../Data/Models/DataModels';
import ModelObserver from '../../Data/Models/ModelObserver';
import SelectedPackageView from './SelectedPackageView';
import Message from '../../Data/Utils/Message';
import './PackagesView.css';

interface PackagesViewProps {
   selectedPackage: PackageModel | null;
   packages: string[];
   handleSetSelectedPackage: (selected: PackageModel | null) => void;
}

/**
 * List all the packages for the user and Create Package Editor.
 * @param props PackageView Props
 * @returns PackagesView Component
 */
const PackagesView = (props: PackagesViewProps): JSX.Element => {
   const { selectedPackage, packages, handleSetSelectedPackage } = props;
   const allPackages = ModelObserver.getPackageCollection();

   // #region Input Handling
   /**
    * Update selected package name.
    * @param value Updated name
    */
   const handleNameChange = (value: string) => {
      if (selectedPackage) {
         handleSetSelectedPackage({
            ...selectedPackage,
            name: value,
         });
      }
   };

   /**
    * Update selected package ID.
    * @param value Updated packageId
    */
   const handleIDChange = (value: string) => {
      if (selectedPackage) {
         handleSetSelectedPackage({
            ...selectedPackage,
            packageId: value,
         });
      }
   };

   /**
    * Update selected package Leads.
    * @param value Updated leads
    */
   const handleLeadsChange = (value: number) => {
      if (selectedPackage) {
         handleSetSelectedPackage({
            ...selectedPackage,
            leads: value,
         });
      }
   };

   /**
    * Update selected package Description.
    * @param value Updated desc
    */
   const handleDescChange = (value: string) => {
      if (selectedPackage) {
         handleSetSelectedPackage({
            ...selectedPackage,
            desc: value,
         });
      }
   };
   // #endregion

   /**
    * Change selected package.
    * @param packageId Selected package ObjectId
    */
   const handleSelect = (packageId: string) => {
      const selectedPack = allPackages[packageId];
      console.log(selectedPack);
      if (selectedPack) {
         handleSetSelectedPackage(selectedPack);
      }
   };

   /**
    * Deselect package.
    */
   const handleClearPackage = () => {
      handleSetSelectedPackage(null);
   };

   /**
    * Send new package to the server.
    * @param pack New package
    */
   const handleCreatePackage = async (pack: PackageModel) => {
      if (pack.name !== '' && pack.packageId !== '') {
         // await ModelObserver.newPackage(pack);
         await ModelObserver.fetchCreatePackage(pack);
      } else {
         Message.msg('Cannot create. Invalid properties.', 'error');
      }
   };

   /**
    * Send updated package to the server.
    * @param pack New package
    */
   const handleSavePackage = async (pack: PackageModel) => {
      if (pack.name !== '' && pack.packageId !== '') {
         // await ModelObserver.updatePackage(pack);
         await ModelObserver.fetchUpdatePackage(pack);
      } else {
         Message.msg('Cannot save. Invalid properties.', 'error');
      }
   };

   /**
    * Request delete selected package from the server.
    */
   const handleDeletePackage = async () => {
      if (selectedPackage) {
         // await ModelObserver.deletePackage(selectedPackage._id);
         const success = await ModelObserver.fetchDeletePackage(
            selectedPackage._id
         );
         if (success) {
            handleSetSelectedPackage(null);
         }
      }
   };

   return (
      <div className="base-packages-view">
         <div className="package-list-container">
            {packages ? (
               <>
                  {Object.values(packages).map(pck => (
                     <Package
                        key={`package-comp-${pck}`}
                        isSelected={pck === selectedPackage?._id}
                        packageItem={allPackages[pck]}
                        handleSelect={handleSelect}
                     />
                  ))}
               </>
            ) : (
               <p>No Packages</p>
            )}
         </div>
         <div className="selected-package-container">
            <SelectedPackageView
               selectedPackage={selectedPackage}
               handleNameChange={handleNameChange}
               handleIDChange={handleIDChange}
               handleLeadChange={handleLeadsChange}
               handleDescChange={handleDescChange}
               handleCreatePackage={handleCreatePackage}
               handleSavePackage={handleSavePackage}
               handleClearPackage={handleClearPackage}
               handleDeletePackage={handleDeletePackage}
            />
         </div>
      </div>
   );
};

export default PackagesView;
