import React from 'react';
import { ReactComponent as Icon } from '../../Icons/AddPackageIcon.svg';
import './AddPackageButton.css';

export interface AddPackageButtonProps {
   handleCreate: () => void;
   disabled?: boolean;
}

const AddPackageButton = (props: AddPackageButtonProps): JSX.Element => {
   const { handleCreate, disabled } = props;

   return (
      <button
         className={`add-package-button ${disabled ? 'disabled-button' : ''}`}
         disabled={disabled}
         type="button"
         onClick={handleCreate}
      >
         <Icon />
      </button>
   );
};

export default AddPackageButton;
