import React, { useState } from 'react';
import Number from '../../Components/SimpleComponents/Number';
import './CompTestView.css';

/**
 * Component Testing View
 * @returns Testing View Component
 */
const CompTestView = (): JSX.Element => {
   const [num, setNum] = useState<number>(0);
   const [editMode, setEdit] = useState<boolean>(false);

   const handleInput = (value: number) => {
      console.log(value, typeof value);
      setNum(value);
   };

   return (
      <div className="comp-test-cont">
         <button onClick={() => setEdit(!editMode)}>Edit</button>
         <Number
            value={num}
            disabled={editMode}
            handleChange={num => handleInput(num)}
         />
      </div>
   );
};

export default CompTestView;
