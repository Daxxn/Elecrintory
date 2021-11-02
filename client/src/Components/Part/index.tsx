import React, { useEffect, useState } from 'react';
import PartModel from '../../Data/Models/DataModels';
import ModelObserver from '../../Data/Models/ModelObserver';
import DatasheetButton from '../DatasheetButton';
import Expander from '../Expander';
import PackageList from '../PackageList';
import PartTagList from '../PartTagList';
import './Part.css';

export interface PartProps {
   partId: string;
   selectedPackageId: string | null;
   handleSelectTag: (tag: string) => void;
   // handleAddSelectedPack: (partId: string) => void;
}

const Part = (props: PartProps): JSX.Element => {
   const {
      partId,
      handleSelectTag,
      // handleAddSelectedPack,
      selectedPackageId
   } = props;
   const foundPart = ModelObserver.getPart(partId);
   const [part, setPart] = useState<PartModel | null>(foundPart);
   
   useEffect(() => {
      const compId = `part-comp-${partId}`;
      ModelObserver.addPartObserver(partId, compId, (updatedPart) => {
         setPart(updatedPart as PartModel);
      });
      return () => {
         ModelObserver.removePartObserver(partId, compId);
      };
   }, [partId]);

   const handleAddSelectedPackage = () => {
      // handleAddSelectedPack(partId);
      if (selectedPackageId) {
         ModelObserver.addSelectedPackage(partId, selectedPackageId);
      }
   }

   if (part) {
      return (
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
         </div>
      );
   } else {
      return (
         <p>Bad Part</p>
      )
   }
};

export default Part;
