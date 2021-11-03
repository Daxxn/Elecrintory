import React from 'react';
import AddPartButton from '../../Components/AddPart';
import Part from '../../Components/Part';
import ModelObserver from '../../Data/Models/ModelObserver';
// import { StatusResult } from '../../Data/Utils/urlHelper';
import './PartsList.css';

export interface PartsListProps {
   parts: string[];
   selectedPackageId: string | null;
   // messageCallback: (message: string, status: StatusResult) => void;
   handleSelectTag: (tag: string) => void;
   // handleAddSelectedPack: (packageId: string) => void;
}

const PartsList = (props: PartsListProps): JSX.Element => {
   const {
      parts,
      selectedPackageId,
      handleSelectTag,
      // handleAddSelectedPack,
   } = props;
   const userLoggedIn = ModelObserver.getUser() != null;

   const handleAddPart = async (partName: string) => {
      await ModelObserver.addPart(partName);
   }

   return userLoggedIn ? (
      <div className="base-parts-list">
         <AddPartButton handleAddPart={handleAddPart} />
         {parts.map(p => (
            <Part
               key={`part-element-${p}`}
               partId={p}
               selectedPackageId={selectedPackageId}
               handleSelectTag={handleSelectTag}
               // handleAddSelectedPack={handleAddSelectedPack}
            />
         ))}
      </div>
   ) : (
      <div>
         <p>You need to log in to access your parts.</p>
      </div>
   );
};

export default PartsList;
