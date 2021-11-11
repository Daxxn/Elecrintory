import React, { useState } from 'react';
import Number from '../../Components/SimpleComponents/Number';
import PartModel from '../../Data/Models/DataModels';
import ModelObserver from '../../Data/Models/ModelObserver';
import './EditPartView.css';

export interface EditPartViewProps {
   partId: string;
   handleCloseEdit: (part?: PartModel) => void;
}

const blankPart: PartModel = {
   partName: 'Broken Part',
   _id: '',
   __v: 0,
   datasheet: '',
   desc: '',
   inventory: 0,
   manufacturer: '',
   ordered: 0,
   packages: [],
   tags: [],
};

/**
 * Part editor component
 * @param props EditPart Props
 * @returns EditPartView Component
 */
const EditPartView = (props: EditPartViewProps): JSX.Element => {
   const { partId, handleCloseEdit } = props;
   const foundPart = ModelObserver.getPart(partId);

   const [part, setPart] = useState<PartModel>(foundPart ?? blankPart);

   const datasheetLinkChange = (url: string) => {
      setPart({
         ...part,
         datasheet: url,
      });
   };

   const nameChange = (name: string) => {
      setPart({
         ...part,
         partName: name,
      });
   };

   const manufChange = (name: string) => {
      setPart({
         ...part,
         manufacturer: name,
      });
   };

   const descChange = (value: string) => {
      setPart({
         ...part,
         desc: value,
      });
   };

   return part ? (
      <div className="base-part-edit">
         <div className="part-item-edit-container name">
            <p>Part Name</p>
            <input
               tabIndex={1}
               className="part-input-edit"
               onChange={e => nameChange(e.target.value)}
               value={part.partName}
            />
         </div>
         <div className="part-item-edit-container manuf">
            <p>Manufacturer</p>
            <input
               tabIndex={2}
               className="part-input-edit"
               onChange={e => manufChange(e.target.value)}
               value={part.manufacturer}
            />
         </div>
         <div className="part-item-edit-container ordered">
            <p>Ordered</p>
            <Number
               tabIndex={3}
               value={part.ordered}
               handleChange={num => setPart({ ...part, ordered: num })}
               min={0}
            />
         </div>
         <div className="part-item-edit-container inv">
            <p>Inventory</p>
            <Number
               tabIndex={4}
               value={part.inventory}
               handleChange={num => setPart({ ...part, inventory: num })}
               min={0}
            />
         </div>
         <div className="part-item-edit-container desc">
            <p className="desc-label">Desc</p>
            <textarea
               tabIndex={6}
               className="desc-box"
               onChange={e => descChange(e.target.value)}
               value={part.desc}
            />
         </div>
         <div className="part-item-edit-container datasheet-container datasheet">
            <p>Datasheet</p>
            <input
               tabIndex={5}
               type="url"
               onChange={e => datasheetLinkChange(e.target.value)}
               value={part.datasheet}
            />
         </div>

         <button className="save-button" onClick={() => handleCloseEdit(part)}>
            Save
         </button>
         <button className="cancel-button" onClick={() => handleCloseEdit()}>
            Cancel
         </button>
      </div>
   ) : (
      <p>Part Edit Failure</p>
   );
};

export default EditPartView;
