import React, { useState } from 'react';
import ComboBoxItem from './ComboBoxItem';
import './ComboBox.css';

export interface ComboBoxProps {
   items: string[];
   selectedItem: string;
   handleSelected: (selected: string) => void;
}

const ComboBox = (props: ComboBoxProps): JSX.Element => {
   const { items, selectedItem, handleSelected } = props;
   // const [selected, setSelected] = useState<string>(items[defSelected ?? 0]);
   const [open, setOpen] = useState<boolean>(false);

   const handleSelectedChanged = (value: string, index: number) => {
      setOpen(false);
      handleSelected(value);
   };

   return (
      <div className="base-combo-cont">
         {open ? (
            <div className="combo-modal">
               <p className="selected-item">{selectedItem}</p>
               {items.length
                  ? items.map((itm, i) => (
                       <ComboBoxItem
                          key={`combo-item-${itm}-${i}`}
                          value={itm}
                          index={i}
                          handleSelected={handleSelectedChanged}
                       />
                    ))
                  : ''}
               <button onClick={() => setOpen(false)}>Close</button>
            </div>
         ) : (
            <div className="combo-display">
               <p className="selected-item" onClick={() => setOpen(true)}>
                  {selectedItem}
               </p>
               <button className="open-button" onClick={() => setOpen(true)}>
                  Open
               </button>
            </div>
         )}
      </div>
   );
};

export default ComboBox;
