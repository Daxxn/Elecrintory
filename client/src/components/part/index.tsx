import React from 'react';
import ModelObserver from '../../data/models/ModelObserver';
import DatasheetButton from '../datasheetButton';
import Expander from '../Expander';
import PartTagList from '../PartTagList';
import './part.css'

export interface PartProps {
   partId: string;
   handleSelectTag: (tag: string) => void;
}

const Part = (props: PartProps): JSX.Element => {
   const { partId, handleSelectTag } = props;
   const part = ModelObserver.getPart(partId);

   if (part) {
      return (
         <div className="base-part">
            <div className="item-container name">
               <p>Part Name</p>
               <p>{part.partName}</p>
            </div>
            <div className="item-container manuf">
               <p>Manufacturer</p>
               <p>{part.manufacturer}</p>
            </div>
            <div className="item-container inv">
               <p>Inventory</p>
               <p>{part.inventory}</p>
            </div>
            <div className="item-container ordered">
               <p>Ordered</p>
               <p>{part.ordered}</p>
            </div>
            <div className="item-container desc">
               <p>Desc</p>
               <textarea disabled={true}>{part.desc}</textarea>
            </div>
            <div className="item-container datasheet">
               <p>Datasheet</p>
               <DatasheetButton url={part.datasheet} />
            </div>
            <div className="item-container tag">
               <p>Tag</p>
               <Expander>
                  <PartTagList tags={part.tags} handleSelectTag={handleSelectTag} />
               </Expander>
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
