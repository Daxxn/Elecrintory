import React from 'react';
import './ComboBox.css';

export interface ComboBoxItemProps {
   value: string;
   index: number;
   handleSelected: (value: string, index: number) => void;
   displayIndex?: boolean;
}

const ComboBoxItem = (props: ComboBoxItemProps): JSX.Element => {
   const { value, index, displayIndex, handleSelected } = props;

   const selected = () => handleSelected(value, index);

   return (
      <button type="button" className="combo-item-button" onClick={selected}>
         {`${displayIndex ? `${index} - ` : ''}${value}`}
      </button>
   );
};

export default ComboBoxItem;
