import React, { useState } from 'react';
import LEDResistor from '../../Components/Calculators/LEDResistor';
import ResistorColors from '../../Components/Calculators/ResistorColors';
import './CalculatorsView.css';

export interface CalculatorsViewProps {
   defaultCalc?: number;
}

const CalculatorsView = (props: CalculatorsViewProps): JSX.Element => {
   const { defaultCalc } = props;
   const [selected, setSelected] = useState<number>(defaultCalc ?? 0);
   return (
      <div className="calc-view-cont">
         <h1>Calculators</h1>
         <div className="calc-item-controls">
            <button type="button" onClick={() => setSelected(1)}>
               LED Resistor Calculator
            </button>
            <button type="button" onClick={() => setSelected(2)}>
               Resistor Color Codes
            </button>
         </div>
         <div className="calc-container">
            {selected === 1 ? <LEDResistor /> : ''}
            {selected === 2 ? <ResistorColors /> : ''}
         </div>
      </div>
   );
};

export default CalculatorsView;
