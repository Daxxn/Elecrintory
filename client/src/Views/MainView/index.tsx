import React from 'react';
import Expander from '../../Components/Expander';
import { PackageModel } from '../../Data/Models/DataModels';
import UserModel from '../../Data/Models/UserModel';
import PackagesView from '../PackagesView';
import PartsList from '../PartsList';
import './MainView.css';

export interface MainViewProps {
   user: UserModel | null;
   selectedTag: string | null;
   selectedPackage: PackageModel | null;
   handleSelectTag: (tag: string) => void;
   handleSetSelectedPackage: (selected: PackageModel | null) => void;
}

const MainView = (props: MainViewProps): JSX.Element => {
   const {
      user,
      selectedPackage,
      handleSelectTag,
      handleSetSelectedPackage,
   } = props;

   return (
      <div className="base-main-view">
         {user ? (
            <div>
               <h3>Parts</h3>
               <Expander>
                  <PartsList
                     parts={user.parts}
                     selectedPackageId={selectedPackage ? selectedPackage._id : null}
                     handleSelectTag={handleSelectTag}
                  />
               </Expander>
               <h3>Packages</h3>
               <Expander>
                  <PackagesView
                     selectedPackage={selectedPackage}
                     handleSetSelectedPackage={handleSetSelectedPackage}
                  />
               </Expander>
            </div>
         ) : (
            <p>No User</p>
         )}
      </div>
   );
};

export default MainView;
