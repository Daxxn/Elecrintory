import React from 'react';
import './Number.css';

export interface NumberProps {
   value: number;
   handleChange?: (value: number) => void;
   disabled?: boolean;
   isFloat?: boolean;
   min?: number;
   max?: number;
   interval?: number;
   tabIndex?: number;
}

/**
 * Number input and display
 * @param props Number Props
 * @returns Number Component
 */
const Number = (props: NumberProps): JSX.Element => {
   const { value, handleChange, disabled, isFloat, min, max, interval, tabIndex } =
      props;

   /**
    * Check and increase value
    */
   const handleIncrease = () => {
      if (handleChange) {
         const newValue = value + (interval ?? 1);
         if (max) {
            if (max > newValue) {
               handleChange(newValue);
            } else {
               handleChange(max);
            }
         } else {
            handleChange(newValue);
         }
      }
   };

   /**
    * Check and decrease value
    */
   const handleDecrease = () => {
      if (handleChange) {
         const newValue = value - (interval ?? 1);
         if (min) {
            if (min < newValue) {
               handleChange(newValue);
            } else {
               handleChange(min);
            }
         } else {
            handleChange(newValue);
         }
      }
   };

   /**
    * Parse and set the number from the Input component
    * @param input Input component value
    */
   const handleInput = (input: string) => {
      if (handleChange) {
         if (!disabled) {
            if (input) {
               var num = 0;
               if (isFloat) {
                  num = parseFloat(input);
               } else {
                  num = parseInt(input);
               }
               if (!isNaN(num)) {
                  if (min && max) {
                     if (min > num) {
                        handleChange(min);
                        return;
                     }
                     if (max < num) {
                        handleChange(max);
                        return;
                     }
                  }
                  handleChange(num);
               }
            } else {
               handleChange(0);
            }
         }
      }
   };

   return disabled ? (
      <p className="number-static">{value}</p>
   ) : (
      <div className="number-edit-container">
         <input
            className="number-input"
            tabIndex={tabIndex}
            onChange={e => handleInput(e.target.value)}
            value={value}
         />
         <div className="number-edit-controls">
            <button className="number-plus-button" onClick={handleIncrease}>
               +
            </button>
            <button className="number-minus-button" onClick={handleDecrease}>
               -
            </button>
         </div>
      </div>
   );
};

export default Number;
