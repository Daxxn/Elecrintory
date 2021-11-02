import React, { useState } from 'react';
import { ReactComponent as Icon } from '../../Icons/AddPart.svg';
import AddPartModal from './AddPartModal';
import './AddPart.css';

export interface AddPartButtonProps {
   handleAddPart: (partname: string) => void;
}

const AddPartButton = (props: AddPartButtonProps): JSX.Element => {
   const { handleAddPart } = props;
   const [open, setOpen] = useState<boolean>(false);

   return (
      <div className="add-part-container">
         <button type="button" className="add-part-button" onClick={() => setOpen(true)}>
            <Icon />
         </button>
         {open ? (
            <AddPartModal
               handleAddPart={handleAddPart}
               handleClose={() => setOpen(false)}
            />
         ) : ''}
      </div>
   );
};

export default AddPartButton;
