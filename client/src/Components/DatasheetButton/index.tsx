import React from 'react';
import { ReactComponent as Icon } from '../../Icons/DatasheetLinkIcon1.svg';
import './DatasheetButton.css';

export interface DatasheetButtonProps {
   url: string;
}

const DatasheetButton = (props: DatasheetButtonProps): JSX.Element => {
   const { url } = props

   return (
      <a target="_blank" rel="noreferrer" href={url}>
         <button type="button" className="base-ds-button">
            <Icon />
         </button>
      </a>
   );
};

export default DatasheetButton;
