import React from 'react';
import { PackageModel } from '../../Data/Models/DataModels';
import './Package.css';

export interface PackageProps {
   packageItem: PackageModel;
   isSelected: boolean;
   handleSelect: (packageId: string) => void;
}

const Package = (props: PackageProps): JSX.Element => {
   const { packageItem, handleSelect, isSelected } = props;

   return (
      <div className="base-package-comp">
         <button className={`select-item-button ${isSelected ? 'selected-package' : ''}`} onClick={() => handleSelect(packageItem._id)}>
            <h4>Package</h4>
            <div className="item-container">
               <p className="item-label">Name</p>
               <p>{packageItem.name}</p>
            </div>
            <div className="item-container">
               <p className="item-label">ID</p>
               <p>{packageItem.packageId}</p>
            </div>
            <div className="item-container">
               <p className="item-label">Leads</p>
               <p>{packageItem.leads}</p>
            </div>
            <div className="item-container">
               <p className="item-label">Description</p>
               <p>{packageItem.desc}</p>
            </div>
         </button>
      </div>
   );
};

export default Package;
