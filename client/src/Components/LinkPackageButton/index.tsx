import React from 'react';
import { ReactComponent as Icon } from '../../Icons/AddToPartIcon2.svg';
import './LinkPackageButton.css';

export interface LinkPackageButtonProps {
   onClick: () => void;
}

const LinkPackageButton = (props: LinkPackageButtonProps): JSX.Element => {
   const { onClick } = props;

   return (
      <button type="button" className="base-link-button" onClick={onClick}>
         <Icon />
      </button>
   );
};

export default LinkPackageButton;
