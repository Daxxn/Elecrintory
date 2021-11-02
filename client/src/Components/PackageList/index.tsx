import React from 'react';
import Expander from '../Expander';
import LinkPackageButton from '../LinkPackageButton';
import PackageDisplay from './PackageDisplay';
import './PackageList.css';

export interface PackageListProps {
   packageIds: string[];
   handleAddPackage: () => void;
}

const PackageList = (props: PackageListProps): JSX.Element => {
   const { packageIds, handleAddPackage } = props;

   return (
      <div className="base-package-list">
         <Expander>
            <LinkPackageButton onClick={handleAddPackage} />
            {packageIds.length > 0 ? (
               <>
                  {packageIds.map(p => (
                     <PackageDisplay key={`part-package-comp-${p}`} packageId={p}/>
                  ))}
               </>
            ) : (
               <p>No Packages</p>
            )}
         </Expander>
      </div>
   );
};

export default PackageList;
