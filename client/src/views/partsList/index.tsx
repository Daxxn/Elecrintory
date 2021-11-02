import React from 'react';
import AddPartButton from '../../components/AddPart';
import Part from '../../components/part';
import ModelObserver from '../../data/models/ModelObserver';
import { StatusResult } from '../../data/utils/urlHelper';
import './partsList.css';

export interface PartsListProps {
   parts: string[];
   messageCallback: (message: string, status: StatusResult) => void;
   handleSelectTag: (tag: string) => void;
}

const PartsList = (props: PartsListProps): JSX.Element => {
   const { parts, handleSelectTag } = props;
   const userLoggedIn = ModelObserver.getUser() != null;

   const handleAddPart = (partName: string) => {
      ModelObserver.addPart(partName);
   }

   return userLoggedIn ? (
      <div className="base-parts-list">
         <AddPartButton handleAddPart={handleAddPart} />
         {parts.map(p => (
            <Part key={`part-element-${p}`} partId={p} handleSelectTag={handleSelectTag} />
         ))}
      </div>
   ) : (
      <div>
         <p>You need to log in to access your parts.</p>
      </div>
   );
};

export default PartsList;
