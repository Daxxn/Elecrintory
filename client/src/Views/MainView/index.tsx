import React, { useState } from 'react';
import { PackageModel } from '../../Data/Models/DataModels';
import UserModel from '../../Data/Models/UserModel';
import CalculatorsView from '../CalculatorsView';
import CompTestView from '../CompTestView';
import PackagesView from '../PackagesView';
import PartsList from '../PartsList';
import SearchView from '../SearchView';
import UserProfileView from '../UserProfileView';
import './MainView.css';

export interface MainViewProps {
   user: UserModel | null;
   selectedTag: string | null;
   selectedPackage: PackageModel | null;
   handleSelectTag: (tag: string) => void;
   handleSetSelectedPackage: (selected: PackageModel | null) => void;
}

/**
 * Main View Container
 * @param props MainView Props
 * @returns MainView Component
 */
const MainView = (props: MainViewProps): JSX.Element => {
   const {
      user,
      selectedPackage,
      selectedTag,
      handleSelectTag,
      handleSetSelectedPackage,
   } = props;
   const [index, setIndex] = useState<number>(user ? user.settings.openingView : 0);

   return (
      <div className="base-main-view">
         {user ? (
            <div>
               <div className="view-controls-cont">
                  <button
                     className={`view-sel-button ${
                        index === 0 ? 'selected-button' : ''
                     }`}
                     onClick={() => setIndex(0)}
                  >
                     Parts
                  </button>
                  <button
                     className={`view-sel-button ${
                        index === 1 ? 'selected-button' : ''
                     }`}
                     onClick={() => setIndex(1)}
                  >
                     Packages
                  </button>
                  <button
                     className={`view-sel-button ${
                        index === 2 ? 'selected-button' : ''
                     }`}
                     onClick={() => setIndex(2)}
                  >
                     Search
                  </button>
                  <button
                     className={`view-sel-button ${
                        index === 3 ? 'selected-button' : ''
                     }`}
                     onClick={() => setIndex(3)}
                  >
                     Calc
                  </button>
                  <button
                     className={`view-sel-button ${
                        index === 4 ? 'selected-button' : ''
                     }`}
                     onClick={() => setIndex(4)}
                  >
                     Profile
                  </button>
                  <button
                     className={`view-sel-button ${
                        index === 5 ? 'selected-button' : ''
                     }`}
                     onClick={() => setIndex(5)}
                  >
                     Testing
                  </button>
               </div>
               {index === 0 ? (
                  <div>
                     <h2>Parts</h2>
                     <PartsList
                        parts={user.parts}
                        selectedPackageId={
                           selectedPackage ? selectedPackage._id : null
                        }
                        handleSelectTag={handleSelectTag}
                     />
                  </div>
               ) : (
                  ''
               )}
               {index === 1 ? (
                  <div>
                     <h2>Packages</h2>
                     <PackagesView
                        packages={user.packages}
                        selectedPackage={selectedPackage}
                        handleSetSelectedPackage={handleSetSelectedPackage}
                     />
                  </div>
               ) : (
                  ''
               )}
               {index === 2 ? (
                  <div>
                     <h2>Search</h2>
                     <SearchView user={user} selectedTag={selectedTag} />
                  </div>
               ) : (
                  ''
               )}
               {index === 3 ? (
                  <div>
                     <h2>Calc</h2>
                     <CalculatorsView />
                  </div>
               ) : (
                  ''
               )}
               {index === 4 ? (
                  <div>
                     <h2>User Profile</h2>
                     <UserProfileView user={user} />
                  </div>
               ) : (
                  ''
               )}
               {index === 5 ? (
                  <div>
                     <h2>Component Testing View</h2>
                     <CompTestView />
                  </div>
               ) : (
                  ''
               )}
            </div>
         ) : (
            <p>Getting your data...</p>
         )}
      </div>
   );
};

export default MainView;
