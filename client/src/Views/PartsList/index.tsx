import React from 'react';
import AddPartButton from '../../Components/AddPart';
import Part from '../../Components/Part';
import ModelObserver from '../../Data/Models/ModelObserver';
import './PartsList.css';

export interface PartsListProps {
   parts: string[];
   selectedPackageId: string | null;
   handleSelectTag: (tag: string) => void;
}

/**
 * Generate parts list.
 * @param props Parts
 * @returns Parts List Component
 */
const PartsList = (props: PartsListProps): JSX.Element => {
   const {
      parts,
      selectedPackageId,
      handleSelectTag,
   } = props;
   const userLoggedIn = ModelObserver.getUser() != null;

   /**
    * Sends part name to the server to create a new part.
    * The part list is updated when the new part returns
    * from the server.
    * @param partName New part name
    */
   const handleAddPart = async (partName: string) => {
      // await ModelObserver.newPart(partName);
      await ModelObserver.fetchCreatePart(partName);
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
