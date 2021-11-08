import React from 'react';
import Package from '../../Components/Package';
import { PackageModel } from '../../Data/Models/DataModels';
import ModelObserver from '../../Data/Models/ModelObserver';
import SelectedPackageView from './SelectedPackageView';
import './PackagesView.css';
import Message from '../../Data/Utils/Message';

interface PackagesViewProps {
   selectedPackage: PackageModel | null;
   handleSetSelectedPackage: (selected: PackageModel | null) => void;
}

const PackagesView = (props: PackagesViewProps): JSX.Element => {
   const { selectedPackage, handleSetSelectedPackage } = props;
   const packages = ModelObserver.getPackageCollection();

   // #region Input Handling
   const handleNameChange = (value: string) => {
      if (selectedPackage) {
         handleSetSelectedPackage({
            ...selectedPackage,
            name: value,
         });
      }
   };

   const handleIDChange = (value: string) => {
      if (selectedPackage) {
         handleSetSelectedPackage({
            ...selectedPackage,
            packageId: value,
         });
      }
   };

   const handleLeadsChange = (value: number) => {
      if (selectedPackage) {
         handleSetSelectedPackage({
            ...selectedPackage,
            leads: value,
         });
      }
   };

   const handleDescChange = (value: string) => {
      if (selectedPackage) {
         handleSetSelectedPackage({
            ...selectedPackage,
            desc: value,
         });
      }
   };
   // #endregion

   const handleSelect = (packageId: string) => {
      const selectedPack = packages[packageId];
      console.log(selectedPack);
      if (selectedPack) {
         handleSetSelectedPackage(selectedPack);
      }
   };

   const handleClearPackage = () => {
      handleSetSelectedPackage(null);
   };

   const handleCreatePackage = async (pack: PackageModel) => {
      console.log('Create Package');
      if (pack.name !== '' && pack.packageId !== '') {
         await ModelObserver.newPackage(pack);
      } else {
         Message.msg('Cannot create. Invalid properties.', 'error');
      }
   };

   const handleSavePackage = async (pack: PackageModel) => {
      if (pack.name !== '' && pack.packageId !== '') {
         await ModelObserver.updatePackage(pack);
      } else {
         Message.msg('Cannot save. Invalid properties.', 'error');
      }
   };

   const handleDeletePackage = async () => {
      if (selectedPackage) {
         await ModelObserver.deletePackage(selectedPackage._id);
      }
   };

   return (
      <div className="base-packages-view">
         <div className="package-list-container">
            {packages ? (
               <>
                  {Object.values(packages).map(pck => (
                     <Package
                        key={`package-comp-${pck._id}`}
                        isSelected={pck._id === selectedPackage?._id}
                        packageItem={pck}
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
