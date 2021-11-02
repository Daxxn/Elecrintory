import React from 'react';
import AddPackageButton from '../AddPackageButton';
import './PackageControls.css';

export interface PackageControlsProps {
   packageSelected: boolean;
   handleAddPackage: () => void;
   handleClearPackage: () => void;
}

const PackageControls = (props: PackageControlsProps): JSX.Element => {
   const {
      packageSelected,
      handleAddPackage,
      handleClearPackage,
   } = props;

   return packageSelected ? (
      <div className="package-controls-container">
         <p>Selected Package</p>
         <AddPackageButton handleCreate={handleAddPackage} />
         <button onClick={handleClearPackage}>Clear</button>
      </div>
   ) : (
      <div className="package-controls-container">
         <p>New Package</p>
         <AddPackageButton handleCreate={handleAddPackage} />
         <button onClick={handleClearPackage}>Clear</button>
      </div>
   );
};

export default PackageControls;
