import React from 'react';
import { PackageModel } from '../../Data/Models/DataModels';
import UserModel from '../../Data/Models/UserModel';
import { StatusResult } from '../../Data/Utils/urlHelper';
import PackagesView from '../PackagesView';
import PartsList from '../PartsList';
import './MainView.css'

export interface MainViewProps {
   user: UserModel | null;
   selectedTag: string | null;
   selectedPackage: PackageModel | null;
   messageCallback: (message: string, status: StatusResult) => void;
   handleSelectTag: (tag: string) => void;
   handleSetSelectedPackage: (selected: PackageModel | null) => void;
   // handleSelectedPack: (packageId: string) => void;
}

const MainView = (props: MainViewProps): JSX.Element => {
   const {
      user,
      selectedPackage,
      messageCallback,
      handleSelectTag,
      handleSetSelectedPackage,
      // handleSelectedPack,
   } = props;

   return (
      <div className="base-main-view">
         {user ? (
            <div>
               <h3>Parts</h3>
               <PartsList
                  parts={user.parts}
                  selectedPackageId={selectedPackage ? selectedPackage._id : null}
                  messageCallback={messageCallback}
                  handleSelectTag={handleSelectTag}
                  // handleAddSelectedPack={handleSelectedPack}
               />
               <PackagesView
                  selectedPackage={selectedPackage}
                  messageCallback={messageCallback}
                  handleSetSelectedPackage={handleSetSelectedPackage}
               />
            </div>
         ) : (
            <p>No User</p>
         )}
      </div>
   );
};

export default MainView;
