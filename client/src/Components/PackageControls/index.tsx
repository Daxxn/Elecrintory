import React from 'react';
import AddPackageButton from '../AddPackageButton';
import './PackageControls.css';

export interface PackageControlsProps {
   packageSelected: boolean;
   handleAddPackage: () => void;
   handleClearPackage: () => void;
   handleDeletePackage: () => void;
}

/**
 * Container for package controls
 * @param props PackageControl Props
 * @returns PackageControl Component
 */
const PackageControls = (props: PackageControlsProps): JSX.Element => {
   const {
      packageSelected,
      handleAddPackage,
      handleClearPackage,
      handleDeletePackage,
   } = props;

   return packageSelected ? (
      <div className="package-controls-container">
         <AddPackageButton handleCreate={handleAddPackage} />
         <button onClick={handleDeletePackage}>Delete</button>
         <button onClick={handleClearPackage}>Clear</button>
      </div>
   ) : (
      <div className="package-controls-container">
         <AddPackageButton handleCreate={handleAddPackage} />
         <button onClick={handleClearPackage}>Clear</button>
      </div>
   );
};

export default PackageControls;
