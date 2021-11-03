import React, { useState } from 'react';
import './DeleteButton.css';

export interface DeleteButtonProps {
   handleDelete: () => void;
}

const DeleteButton = (props: DeleteButtonProps): JSX.Element => {
   const { handleDelete } = props;
   const [open, setOpen] = useState<boolean>(false);

   const handleConfirmDelete = () => {
      setOpen(false);
      handleDelete();
   }

   return (
      <div className="delete-container">
         {open ? (
            <>
               <button
                  type="button"
                  className="confirm-button"
                  onClick={handleConfirmDelete}
               >
                  Confirm
               </button>
               <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setOpen(false)}
               >
                  Cancel
               </button>
            </>
         ) : (
            <button
               type="button"
               className="delete-button"
               onClick={() => setOpen(true)}
            >
               Delete
            </button>
         )}
      </div>
   );
};

export default DeleteButton;
