import React, { useState } from 'react';
import Package from '../../components/Package';
import { PackageModel } from '../../data/models/DataModels';
import ModelObserver from '../../data/models/ModelObserver';
import './PackagesView.css';
import SelectedPackageView from './SelectedPackageView';

const PackagesView = (): JSX.Element => {
   const packages = ModelObserver.getPackageCollection();
   const [selectedPackage, setSelectedPackage] = useState<PackageModel | null>(null);

   // #region Input Handling
   const handleNameChange = (value: string) => {
      if (selectedPackage) {
         setSelectedPackage({
            ...selectedPackage,
            name: value,
         });
      }
   };

   const handleIDChange = (value: string) => {
      if (selectedPackage) {
         setSelectedPackage({
            ...selectedPackage,
            packageId: value,
         });
      }
   };

   const handleLeadsChange = (value: number) => {
      if (selectedPackage) {
         setSelectedPackage({
            ...selectedPackage,
            leads: value,
         });
      }
   };

   const handleDescChange = (value: string) => {
      if (selectedPackage) {
         setSelectedPackage({
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
         setSelectedPackage(selectedPack);
      }
   }
   
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
            />
         </div>
      </div>
   );
};

export default PackagesView;
