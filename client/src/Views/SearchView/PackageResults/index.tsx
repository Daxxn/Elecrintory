import React from 'react';
import ModelObserver from '../../../Data/Models/ModelObserver';
import '../SearchView.css';
import Package from './Package';

export interface PackageResultsProps {
   packages: string[];
   handleSelected?: (id: string) => void;
}

const PackageResults = (props: PackageResultsProps): JSX.Element => {
   const { packages } = props;
   const allPackages = ModelObserver.getPackageCollection();

   return (
      <div className="results-cont">
         {packages.length > 0 ? (
            packages.map(pck => <Package packageItem={allPackages[pck]} />)
         ) : (
            <p>No Packages Found...</p>
         )}
      </div>
   );
};

export default PackageResults;
