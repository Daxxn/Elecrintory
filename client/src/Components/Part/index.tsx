import React, { useEffect, useState } from 'react';
import PartModel from '../../Data/Models/DataModels';
import ModelObserver from '../../Data/Models/ModelObserver';
import EditPartView from '../../Views/EditPartView';
import DatasheetButton from '../DatasheetButton';
import DeleteButton from '../DeleteButton';
import Expander from '../Expander';
import PackageList from '../PackageList';
import PartTagList from '../PartTagList';
import './Part.css';

export interface PartProps {
   partId: string;
   selectedPackageId: string | null;
   handleSelectTag: (tag: string) => void;
}

/**
 * Individual Part component
 * @param props Part Props
 * @returns Part Component
 */
const Part = (props: PartProps): JSX.Element => {
   const {
      partId,
      handleSelectTag,
      selectedPackageId
   } = props;
   const foundPart = ModelObserver.getPart(partId);
   const [part, setPart] = useState<PartModel | null>(foundPart);
   const [editMode, setEditMode] = useState<boolean>(false);
   
   useEffect(() => {
      const compId = `part-comp-${partId}`;
      ModelObserver.addPartObserver(partId, compId, (updatedPart) => {
         setPart(updatedPart as PartModel);
      });
      return () => {
         ModelObserver.removePartObserver(partId, compId);
      };
   }, [partId]);

   /**
    * Add currently selected package to the part.
    */
   const handleAddSelectedPackage = () => {
      if (selectedPackageId) {
         ModelObserver.addSelectedPackage(partId, selectedPackageId);
      }
   };

   /**
    * Update the part if the updated part parameter is not null.
    * @param part updated part
    */
   const handleCloseEdit = async (part?: PartModel) => {
      if (part) {
         // await ModelObserver.updatePart(part);
         await ModelObserver.fetchUpdatePart(part);
      }
      setEditMode(false);
   };

   /**
    * Delete the part.
    * @param partId Id of part
    */
   const handleDeletePart = async (partId: string) => {
      if (part) {
         // await ModelObserver.deletePart(partId);
         await ModelObserver.fetchDeletePart(partId);
      }
   };

   if (part) {
      return (
         <div>
            {editMode ? (
               <EditPartView partId={part._id} handleCloseEdit={handleCloseEdit} />
            ) : (
               <div className="base-part">
                  <div className="part-item-container name">
                     <p>Part Name</p>
                     <p>{part.partName}</p>
                  </div>
                  <div className="part-item-container manuf">
                     <p>Manufacturer</p>
                     <p>{part.manufacturer}</p>
                  </div>
                  <div className="part-item-container inv">
                     <p>Inventory</p>
                     <p>{part.inventory}</p>
                  </div>
                  <div className="part-item-container ordered">
                     <p>Ordered</p>
                     <p>{part.ordered}</p>
                  </div>
                  <div className="part-item-container desc">
                     <p className="desc-label">Desc</p>
                     <textarea className="desc-box" disabled={true} value={part.desc} />
                  </div>
                  <div className="part-item-container datasheet-container datasheet">
                     <p>Datasheet</p>
                     <DatasheetButton url={part.datasheet} />
                  </div>
                  <div className="tag-container tag">
                     <p>Tag</p>
                     <Expander>
                        <PartTagList tags={part.tags} handleSelectTag={handleSelectTag} />
                     </Expander>
                  </div>
                  <div className="package-container pack">
                     <PackageList
                        packageIds={part.packages}
                        handleAddPackage={handleAddSelectedPackage}
                     />
                  </div>
                  <div className="part-edit-controls edit">
                     <button className="edit-button" onClick={() => setEditMode(true)}>
                        Edit
                     </button>
                     <DeleteButton handleDelete={() => handleDeletePart(part._id)} />
                  </div>
               </div>
            )}
         </div>
      );
   } else {
      return (
         <p>Bad Part</p>
      )
   }
};

export default Part;
