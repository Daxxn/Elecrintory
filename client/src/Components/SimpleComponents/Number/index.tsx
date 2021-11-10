import React from 'react';
import './Number.css';

export interface NumberProps {
   value: number;
   handleChange?: (value: number) => void;
   disabled?: boolean;
   isFloat?: boolean;
}

const Number = (props: NumberProps): JSX.Element => {
   const { value, handleChange, disabled, isFloat } = props;

   const handleIncrease = () => {
      if (handleChange) {
         handleChange(value + 1);
      }
   };

   const handleDecrease = () => {
      if (handleChange) {
         handleChange(value - 1);
      }
   };

   const handleInput = (input: string) => {
      if (handleChange) {
         if (isFloat) {
            var num = 0;
            if (isFloat) {
               num = parseFloat(input);
            } else {
               num = parseInt(input);
            }
            if (!isNaN(num)) {
               handleChange(num);
            }
         }
      }
   };

   return disabled ? (
      <p className="number-static">{value}</p>
   ) : (
      <div className="number-edit-container">
         <input onChange={e => handleInput(e.target.value)} value={value} />
         <button className="number-plus-button" onClick={handleIncrease}>
            +
         </button>
         <button className="number-minus-button" onClick={handleDecrease}>
            -
         </button>
      </div>
   );
};

export default Number;
