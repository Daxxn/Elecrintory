import React, { useState, useMemo } from 'react';
import { resistorColorCalc } from '../../../Data/Utils/Calculators';
import ComboBox from '../../SimpleComponents/ComboBox';
import { ReactComponent as RefreshIcon } from '../../../Icons/RefreshIcon.svg';
import './ResistorColors.css';

const bandColors = {
   numerators: [
      'black',
      'brown',
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'violet',
      'grey',
      'white',
   ],
   multiplier: [
      'black',
      'brown',
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'violet',
      'grey',
      'white',
      'gold',
      'silver',
   ],
   toleranceColors: [
      'brown',
      'red',
      'green',
      'blue',
      'violet',
      'grey',
      'gold',
      'silver',
   ],
   toleranceValues: [1, 2, 0.5, 0.25, 0.1, 0.05, 5, 10],
};

const ResistorColors = (): JSX.Element => {
   const [band1, setBand1] = useState<number>(0);
   const [band2, setBand2] = useState<number>(0);
   const [band3, setBand3] = useState<number>(0);
   const [bandMul, setBandMul] = useState<number>(1);
   const [bandTol, setBandTol] = useState<number>(1);
   const [resistance, setRes] = useState<number>(0);
   const [resTol, setResTol] = useState<number>(0);

   const handleSelectBand1 = (value: string, index: number) => {
      if (index >= 0 && index < bandColors.numerators.length) {
         setBand1(index);
         // setRes(resistorColorCalc(band1, band2, band3, bandMul));
      }
   };

   const handleSelectBand2 = (value: string, index: number) => {
      if (index >= 0 && index < bandColors.numerators.length) {
         setBand2(index);
         // setRes(resistorColorCalc(band1, band2, band3, bandMul));
      }
   };

   const handleSelectBand3 = (value: string, index: number) => {
      if (index >= 0 && index < bandColors.numerators.length) {
         setBand3(index);
         // setRes(resistorColorCalc(band1, band2, band3, bandMul));
      }
   };

   const handleSelectBandMul = (value: string, index: number) => {
      if (index >= 0 && index < bandColors.numerators.length) {
         setBandMul(index);
         // setRes(resistorColorCalc(band1, band2, band3, bandMul));
      }
   };

   const handleSelectBandTol = (value: string, index: number) => {
      if (index >= 0 && index < bandColors.numerators.length) {
         setBandTol(index);
         setResTol(bandColors.toleranceValues[index]);
      }
   };

   const handleRefresh = () => {
      setRes(resistorColorCalc(band1, band2, band3, bandMul));
   };

   useMemo(() => {
      setRes(resistorColorCalc(band1, band2, band3, bandMul));
   }, [band1, band2, band3, bandMul]);

   return (
      <div className="res-colors-cont">
         <svg
            width="700"
            height="320"
            viewBox="0 0 185.2086 84.667038"
            version="1.1"
            id="svg5"
            xmlns="http://www.w3.org/2000/svg"
         >
            <defs id="defs2" />
            <g id="layer1">
               <rect
                  id="lead-1"
                  className="legs"
                  width="23.812531"
                  height="10.583346"
                  x="-5.1563642e-09"
                  y="37.041714"
                  ry="0.26458368"
               />
               <rect
                  id="lead-2"
                  className="legs"
                  width="23.812531"
                  height="10.583346"
                  x="161.39604"
                  y="37.041714"
                  ry="0.26458368"
               />
               <path
                  className="body"
                  d="M 23.812531,82.020942 V 2.6458357 l 1.322918,-1.322918 h 29.104204 l 1.322918,1.322918 V 13.229183 l 1.322919,1.322919 h 76.72926 l 1.32292,-1.322919 V 2.6458357 l 1.32292,-1.322918 h 23.81253 l 1.32292,1.322918 V 82.020942 l -1.32292,1.32291 h -23.65241 l -1.48304,-1.32291 V 71.437591 l -1.22496,-1.322919 -76.82722,10e-7 -1.322919,1.322918 v 10.583351 l -1.322918,1.32291 H 25.135449 Z"
                  id="resistor"
               />
               <rect
                  className="band"
                  style={{ fill: bandColors.numerators[band1] }}
                  id="band-1"
                  width="10.583346"
                  height="82.020935"
                  x="34.395878"
                  y="1.3229183"
                  ry="0.26458368"
               />
               <rect
                  className="band"
                  style={{ fill: bandColors.numerators[band2] }}
                  id="band-2"
                  width="10.583346"
                  height="55.562572"
                  x="58.208408"
                  y="14.552101"
                  ry="0.26458368"
               />
               <rect
                  className="band"
                  style={{ fill: bandColors.numerators[band3] }}
                  id="band-3"
                  width="10.583346"
                  height="55.562572"
                  x="74.083427"
                  y="14.552101"
                  ry="0.26458368"
               />
               <rect
                  className="band"
                  style={{ fill: bandColors.multiplier[bandMul] }}
                  id="band-4"
                  width="10.583346"
                  height="55.562572"
                  x="105.83347"
                  y="14.552101"
                  ry="0.26458368"
               />
               <rect
                  className="band"
                  style={{ fill: bandColors.toleranceColors[bandTol] }}
                  id="band-5"
                  width="10.583344"
                  height="82.020935"
                  x="142.87518"
                  y="1.3229183"
                  ry="0.26458368"
               />
            </g>
         </svg>
         <div className="res-color-controls">
            <ComboBox
               items={bandColors.numerators}
               selectedIndex={band1}
               handleSelected={handleSelectBand1}
               displayIndex={true}
            />
            <ComboBox
               items={bandColors.numerators}
               selectedIndex={band2}
               handleSelected={handleSelectBand2}
               displayIndex={true}
            />
            <ComboBox
               items={bandColors.numerators}
               selectedIndex={band3}
               handleSelected={handleSelectBand3}
               displayIndex={true}
            />
            <ComboBox
               items={bandColors.multiplier}
               selectedIndex={bandMul}
               handleSelected={handleSelectBandMul}
            />
            <ComboBox
               items={bandColors.toleranceColors}
               selectedIndex={bandTol}
               handleSelected={handleSelectBandTol}
            />
         </div>

         <button onClick={handleRefresh}>
            <RefreshIcon />
         </button>

         <div className="res-color-result-cont">
            <p className="res-result-label">Resistance:</p>
            <p className="res-color-result">{resistance}</p>
            <p> +- {resTol}%</p>
         </div>
      </div>
   );
};

export default ResistorColors;
