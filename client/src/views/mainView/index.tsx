import React from 'react';
import UserModel from '../../data/models/UserModel';
import { StatusResult } from '../../data/utils/urlHelper';
import PackagesView from '../PackagesView';
import PartsList from '../partsList';
import './mainView.css'

export interface MainViewProps {
   user: UserModel | null;
   selectedTag: string | null;
   messageCallback: (message: string, status: StatusResult) => void;
   handleSelectTag: (tag: string) => void;
}

const MainView = (props: MainViewProps): JSX.Element => {
   const { user, messageCallback, handleSelectTag } = props;

   return (
      <div className="base-main-view">
         {user ? (
            <div>
               <h3>Parts</h3>
               <PartsList
                  parts={user.parts}
                  messageCallback={messageCallback}
                  handleSelectTag={handleSelectTag}
               />
               <PackagesView messageCallback={messageCallback} />
            </div>
         ) : (
            <p>No User</p>
         )}
      </div>
   );
};

export default MainView;
