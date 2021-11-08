import React from 'react';
import './ComboBox.css';

export interface ComboBoxItemProps {
   value: string;
   index: number;
   handleSelected: (value: string, index: number) => void;
}

const ComboBoxItem = (props: ComboBoxItemProps): JSX.Element => {
   const { value, index, handleSelected } = props;

   return (
      <button
         type="button"
         className="combo-item-button"
         onClick={() => handleSelected(value, index)}
      >
         {value}
      </button>
   );
};

export default ComboBoxItem;
