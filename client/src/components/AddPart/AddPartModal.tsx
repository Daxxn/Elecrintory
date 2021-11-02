import React, { useState } from 'react';
import './AddPart.css';

export interface AddPartModalProps {
   handleAddPart: (partName: string) => void;
   handleClose: () => void;
}

const AddPartModal = (props: AddPartModalProps): JSX.Element => {
   const { handleAddPart, handleClose } = props;
   const [partName, setPartName] = useState<string>('');

   const handleAddPartClick = () => {
      if (partName.length > 0) {
         handleAddPart(partName);
      }
   }

   return (
      <div className="base-part-modal">
         <p>Part Name</p>
         <input className={`add-part-input ${partName.length > 0 ? 'valid' : 'invalid'}`} onChange={(e) => setPartName(e.target.value)} value={partName} />
         <button onClick={handleAddPartClick}>New</button>
         <button onClick={handleClose}>X</button>
      </div>
   );
};

export default AddPartModal;
