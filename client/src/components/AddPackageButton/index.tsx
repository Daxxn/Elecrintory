import React from 'react';
import { ReactComponent as Icon } from '../../icons/AddPackageIcon.svg';
import './AddPackageButton.css';

export interface AddPackageButtonProps {
   handleCreate: () => void;
}

const AddPackageButton = (props: AddPackageButtonProps): JSX.Element => {
   const { handleCreate } = props;

   return (
      <button
         className="add-package-button"
         type="button"
         onClick={handleCreate}
      >
         <Icon />
      </button>
   );
};

export default AddPackageButton;
