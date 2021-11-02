import React from 'react';
import UserModel from '../../data/models/UserModel';
import PackagesView from '../PackagesView';
import PartsList from '../partsList';
import './mainView.css'

export interface MainViewProps {
   user: UserModel | null;
}

const MainView = (props: MainViewProps): JSX.Element => {
   const { user } = props;

   return (
      <div className="base-main-view">
         {user ? (
            <div>
               <p>Parts</p>
               <PartsList parts={user.parts} />
               <PackagesView />
            </div>
         ) : (
            <p>No User</p>
         )}
      </div>
   );
};

export default MainView;
