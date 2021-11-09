import React, { useState } from 'react';
import ComboBoxItem from './ComboBoxItem';
import './ComboBox.css';

export interface ComboBoxProps {
   items: string[];
   selectedItem?: string;
   selectedIndex?: number;
   displayIndex?: boolean;
   handleSelected: (selected: string, index: number) => void;
}

const ComboBox = (props: ComboBoxProps): JSX.Element => {
   const { items, selectedItem, selectedIndex, displayIndex, handleSelected } =
      props;
   // const [selected, setSelected] = useState<string>(items[defSelected ?? 0]);
   const [open, setOpen] = useState<boolean>(false);

   const handleSelectedChanged = (value: string, index: number) => {
      setOpen(false);
      handleSelected(value, index);
   };

   return (
      <div className="base-combo-cont">
         {open ? (
            <div className="combo-modal">
               {selectedItem ? <p className="selected-item">{selectedItem}</p> : ''}
               {selectedIndex !== undefined ? (
                  <p className="selected-item">{items[selectedIndex]}</p>
               ) : (
                  ''
               )}
               {items.length
                  ? items.map((itm, i) => (
                       <ComboBoxItem
                          key={`combo-item-${itm}-${i}`}
                          value={itm}
                          index={i}
                          displayIndex={displayIndex ?? false}
                          handleSelected={handleSelectedChanged}
                       />
                    ))
                  : ''}
               <button onClick={() => setOpen(false)}>Close</button>
            </div>
         ) : (
            <div className="combo-display">
               {selectedItem ? (
                  <p className="selected-item" onClick={() => setOpen(true)}>
                     {selectedItem}
                  </p>
               ) : (
                  ''
               )}
               {selectedIndex !== undefined ? (
                  <p className="selected-item" onClick={() => setOpen(true)}>
                     {items[selectedIndex]}
                  </p>
               ) : (
                  ''
               )}
               <button className="open-button" onClick={() => setOpen(true)}>
                  Open
               </button>
            </div>
         )}
      </div>
   );
};

export default ComboBox;
