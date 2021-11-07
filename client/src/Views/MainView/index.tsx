import React, { useState } from 'react';
import { PackageModel } from '../../Data/Models/DataModels';
import UserModel from '../../Data/Models/UserModel';
import PackagesView from '../PackagesView';
import PartsList from '../PartsList';
import UserProfileView from '../UserProfileView';
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
      selectedTag,
      handleSelectTag,
      handleSetSelectedPackage,
   } = props;
   const [index, setIndex] = useState<number>(0);

   return (
      <div className="base-main-view">
         {user ? (
            <div>
               <div className="view-controls-cont">
                  <button
                     className={`view-sel-button ${index === 0 ? 'selected-button' : ''}`}
                     onClick={() => setIndex(0)}
                  >
                     Parts
                  </button>
                  <button
                     className={`view-sel-button ${index === 1 ? 'selected-button' : ''}`}
                     onClick={() => setIndex(1)}
                  >
                     Packages
                  </button>
                  <button
                     className={`view-sel-button ${index === 2 ? 'selected-button' : ''}`}
                     onClick={() => setIndex(2)}
                  >
                     Profile
                  </button>
               </div>
               {index === 0 ? (
                  <div>
                     <h2>Parts</h2>
                     <PartsList
                        parts={user.parts}
                        selectedPackageId={selectedPackage ? selectedPackage._id : null}
                        handleSelectTag={handleSelectTag}
                     />
                  </div>
               ) : ''}
               {index === 1 ? (
                  <div>
                     <h2>Packages</h2>
                     <PackagesView
                        selectedPackage={selectedPackage}
                        handleSetSelectedPackage={handleSetSelectedPackage}
                     />
                  </div>
               ) : ''}
               {index === 2 ? (
                  <div>
                     <h2>User Profile</h2>
                     <UserProfileView user={user} />
                  </div>
               ) : ''}
            </div>
         ) : (
            <p>No User</p>
         )}
      </div>
   );
};

export default MainView;
