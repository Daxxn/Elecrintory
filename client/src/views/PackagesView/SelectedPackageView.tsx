import React, { useState } from 'react';
import { PackageModel } from '../../data/models/DataModels';
import './PackagesView.css';

export interface SelectedPackageViewProps {
   selectedPackage: PackageModel | null;
   handleNameChange: (value: string) => void;
   handleIDChange: (value: string) => void;
   handleLeadChange: (value: number) => void;
   handleDescChange: (value: string) => void;
}

const SelectedPackageView = (props: SelectedPackageViewProps): JSX.Element => {
   const {
      selectedPackage,
      handleNameChange,
      handleIDChange,
      handleLeadChange,
      handleDescChange
   } = props;
   const [leadState, setLeadState] = useState<string>(selectedPackage ? selectedPackage.leads.toString() : '0');

   /**
    * Handles string to number conversion for the lead count.
    * (Fucking TypeScript...)
    * @param value Current State
    */
   const handleLeadStateChange = (value: string) => {
      const num = parseInt(value);
      if (isNaN(num)) {
         handleLeadChange(num);
      }
      setLeadState(value);
   };

   return (
      <div className="base-select-package-view">
         {selectedPackage ? (
            <div className="selected-package-container">
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
                  <p>Legs</p>
                  <input
                     className=""
                     id="leads-input"
                     type="number"
                     onChange={(e) => handleLeadStateChange(e.target.value)}
                     value={leadState}
                  />
               </div>
               <div className="item-container">
                  <p>description</p>
                  <input
                     className=""
                     id="desc-input"
                     onChange={(e) => handleDescChange(e.target.value)}
                     value={selectedPackage.desc}
                  />
               </div>
            </div>
         ) : (
            <h4>No Package Selected</h4>
         )}
      </div>
   );
};

export default SelectedPackageView;
