import React from 'react';
import ModelObserver from '../../Data/Models/ModelObserver';
import './PackageList.css';

export interface PackageDisplayProps {
   packageId: string;
}

const PackageDisplay = (props: PackageDisplayProps): JSX.Element => {
   const { packageId } = props;
   const pck = ModelObserver.getPackage(packageId);

   return pck ? (
      <div className="package-disp-container">
         <div className="item-container">
            <p>Name</p>
            <p>{pck.name}</p>
         </div>
         <div>
            <p>Package ID</p>
            <p>{pck.packageId}</p>
         </div>
         <div>
            <p>Leads</p>
            <p>{pck.leads}</p>
         </div>
      </div>
   ) : (
      <p>Bad Package</p>
   );
};

export default PackageDisplay;
