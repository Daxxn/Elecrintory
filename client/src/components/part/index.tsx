import React from 'react';
import ModelObserver from '../../data/models/ModelObserver';
import DatasheetButton from '../datasheetButton';
import './part.css'

export interface PartProps {
   partId: string;
}

const Part = (props: PartProps): JSX.Element => {
   const { partId } = props;
   const part = ModelObserver.getPart(partId);

   if (part) {
      return (
         <div className="base-part">
            <div>
               <p>Part Name</p>
               <p>{part.partName}</p>
            </div>
            <div>
               <p>Datasheet</p>
               <DatasheetButton url={part.datasheet} />
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
