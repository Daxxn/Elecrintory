import React, { useState, useMemo } from 'react';
import seriesResistorLEDCalc from '../../../Data/Utils/Calculators';
import { ReactComponent as RefreshIcon } from '../../../Icons/RefreshIcon.svg';
import './LEDResistor.css';

const LEDResistor = (): JSX.Element => {
   const [vcc, setVcc] = useState<number>(5);
   const [forwardV, setForwardV] = useState<number>(1.8);
   const [current, setCurrent] = useState<number>(20);
   const [resistor, setResistor] = useState<number>(0);

   const handleInput = (id: string, value: string) => {
      const num = parseFloat(value);
      if (isNaN(num)) {
         return;
      }
      if (id === 'vcc') {
         setVcc(num);
      } else if (id === 'fV') {
         setForwardV(num);
      } else if (id === 'current') {
         setCurrent(num);
      }
      // reCalc();
   };

   const reCalc = () => {
      const res = seriesResistorLEDCalc(vcc, forwardV, current);
      setResistor(Math.round(res));
   };

   useMemo(() => {
      reCalc();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [vcc, forwardV, current, resistor]);

   return (
      <div className="led-res-calc">
         <div className="led-res-inputs">
            <label>VCC</label>
            <input
               id="vcc"
               type="number"
               onChange={e => handleInput(e.target.id, e.target.value)}
            />
            <label>Forward Voltage</label>
            <input
               id="fV"
               type="number"
               onChange={e => handleInput(e.target.id, e.target.value)}
            />
            <label>Current</label>
            <input
               id="current"
               type="number"
               onChange={e => handleInput(e.target.id, e.target.value)}
            />
            <button onClick={reCalc}>
               <RefreshIcon />
            </button>
            <label>Resistance</label>
            <p className="calc-result">{resistor}</p>
         </div>
         {/* <Image className="led-res-image" /> */}
         <div className="led-res-image">
            <svg
               width="470"
               height="350"
               viewBox="0 0 124.35426 92.604558"
               version="1.1"
               id="svg5"
               xmlns="http://www.w3.org/2000/svg"
            >
               <defs id="defs2">
                  <marker
                     //  style="overflow:visible"
                     style={{ overflow: 'visible' }}
                     id="Arrow2Mend"
                     refX="0"
                     refY="0"
                     orient="auto"
                  >
                     <path
                        transform="scale(-0.6)"
                        d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"
                        // style="fill:context-stroke;fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round"
                        style={{
                           fill: 'context-stroke',
                           fillRule: 'evenodd',
                           strokeWidth: '0.625',
                           strokeLinejoin: 'round',
                        }}
                        id="path1185"
                     />
                  </marker>
                  <marker
                     //  style="overflow:visible"
                     style={{ overflow: 'visible' }}
                     id="Arrow2Lend"
                     refX="0"
                     refY="0"
                     orient="auto"
                  >
                     <path
                        transform="matrix(-1.1,0,0,-1.1,-1.1,0)"
                        d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"
                        // style="fill:context-stroke;fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round"
                        style={{
                           fill: 'context-stroke',
                           fillRule: 'evenodd',
                           strokeWidth: '0.625',
                           strokeLinejoin: 'round',
                        }}
                        id="path1179"
                     />
                  </marker>
                  <marker
                     //  style="overflow:visible"
                     style={{ overflow: 'visible' }}
                     id="Arrow1Lend"
                     refX="0"
                     refY="0"
                     orient="auto"
                  >
                     <path
                        transform="matrix(-0.8,0,0,-0.8,-10,0)"
                        // style="fill:context-stroke;fill-rule:evenodd;stroke:context-stroke;stroke-width:1pt"
                        style={{
                           fill: 'context-stroke',
                           fillRule: 'evenodd',
                           stroke: 'context-stroke',
                           strokeWidth: '1pt',
                        }}
                        d="M 0,0 5,-5 -12.5,0 5,5 Z"
                        id="path1161"
                     />
                  </marker>
                  <marker
                     //  style="overflow:visible"
                     style={{ overflow: 'visible' }}
                     id="marker1428"
                     refX="0"
                     refY="0"
                     orient="auto"
                  >
                     <path
                        transform="matrix(0.8,0,0,0.8,10,0)"
                        // style="fill:context-stroke;fill-rule:evenodd;stroke:context-stroke;stroke-width:1pt"
                        style={{
                           fill: 'context-stroke',
                           fillRule: 'evenodd',
                           stroke: 'context-stroke',
                           strokeWidth: '1pt',
                        }}
                        d="M 0,0 5,-5 -12.5,0 5,5 Z"
                        id="path1426"
                     />
                  </marker>
                  <marker
                     //  style="overflow:visible"
                     style={{ overflow: 'visible' }}
                     id="Arrow1Lstart"
                     refX="0"
                     refY="0"
                     orient="auto"
                  >
                     <path
                        transform="matrix(0.8,0,0,0.8,10,0)"
                        // style="fill:context-stroke;fill-rule:evenodd;stroke:context-stroke;stroke-width:1pt"
                        style={{
                           fill: 'context-stroke',
                           fillRule: 'evenodd',
                           stroke: 'context-stroke',
                           strokeWidth: '1pt',
                        }}
                        d="M 0,0 5,-5 -12.5,0 5,5 Z"
                        id="path1158"
                     />
                  </marker>
                  <marker
                     //  style="overflow:visible"
                     style={{ overflow: 'visible' }}
                     id="Arrow2Mend-3"
                     refX="0"
                     refY="0"
                     orient="auto"
                  >
                     <path
                        transform="scale(-0.6)"
                        d="M 8.7185878,4.0337352 -2.2072895,0.01601326 8.7185884,-4.0017078 c -1.7454984,2.3720609 -1.7354408,5.6174519 -6e-7,8.035443 z"
                        // style="fill:context-stroke;fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round"
                        style={{
                           fill: 'context-stroke',
                           fillRule: 'evenodd',
                           strokeWidth: '0.625',
                           strokeLinejoin: 'round',
                        }}
                        id="path1185-6"
                     />
                  </marker>
               </defs>
               <g id="layer1">
                  <g id="LED" transform="translate(-65.616656)">
                     <path
                        // style="fill:none;stroke:#000000;stroke-width:1.05833;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;marker-end:url(#Arrow2Mend-3)"
                        style={{
                           fill: 'none',
                           stroke: '#000000',
                           fillRule: 'evenodd',
                           strokeLinecap: 'round',
                           strokeWidth: '1.05833',
                           strokeLinejoin: 'round',
                           strokeOpacity: 1,
                           strokeMiterlimit: 4,
                           markerEnd: 'url(#Arrow2Mend-3)',
                        }}
                        d="M 169.33333,29.104166 182.5625,39.687499"
                        id="path1076-7"
                     />
                     <path
                        // style="fill:none;stroke:#000000;stroke-width:1.05833;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;marker-end:url(#Arrow2Mend)"
                        style={{
                           fill: 'none',
                           stroke: '#000000',
                           fillRule: 'evenodd',
                           strokeLinecap: 'round',
                           strokeWidth: '1.05833',
                           strokeLinejoin: 'round',
                           strokeOpacity: 1,
                           strokeMiterlimit: 4,
                           markerEnd: 'url(#Arrow2Mend)',
                        }}
                        d="M 169.33333,37.041666 182.5625,47.624999"
                        id="path1076"
                     />
                     <path
                        // style="fill:#000000;fill-opacity:1;stroke:none;stroke-width:1.05833;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        style={{
                           fill: '#000000',
                           stroke: 'none',
                           fillOpacity: 1,
                           strokeLinecap: 'round',
                           strokeWidth: '1.05833',
                           strokeLinejoin: 'round',
                           strokeOpacity: 1,
                           strokeMiterlimit: 4,
                        }}
                        d="m 145.52083,26.458333 h 18.52083 2.64584 L 156.10416,39.6875 Z"
                        id="path947"
                     />
                     <path
                        // style="fill:none;stroke:#000000;stroke-width:1.05833;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        style={{
                           fill: 'none',
                           stroke: '#000000',
                           fillOpacity: 1,
                           strokeLinecap: 'round',
                           strokeWidth: '1.05833',
                           strokeLinejoin: 'round',
                           strokeOpacity: 1,
                           strokeMiterlimit: 4,
                        }}
                        d="M 145.52083,39.6875 H 166.6875"
                        id="path949"
                     />
                     <path
                        // style="fill:none;stroke:#000000;stroke-width:1.05833;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        style={{
                           fill: 'none',
                           stroke: '#000000',
                           fillOpacity: 1,
                           strokeLinecap: 'round',
                           strokeWidth: '1.05833',
                           strokeLinejoin: 'round',
                           strokeOpacity: 1,
                           strokeMiterlimit: 4,
                        }}
                        d="m 156.10416,39.6875 v 7.937499"
                        id="path951"
                     />
                     <path
                        // style="fill:none;stroke:#000000;stroke-width:1.05833;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        style={{
                           fill: 'none',
                           stroke: '#000000',
                           fillOpacity: 1,
                           strokeLinecap: 'round',
                           strokeWidth: '1.05833',
                           strokeLinejoin: 'round',
                           strokeOpacity: 1,
                           strokeMiterlimit: 4,
                        }}
                        d="m 156.10416,26.458333 v -7.9375"
                        id="path953"
                     />
                  </g>
                  <path
                     //  style="fill:none;stroke:#000000;stroke-width:1.05833;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                     style={{
                        fill: 'none',
                        stroke: '#000000',
                        fillOpacity: 1,
                        strokeLinecap: 'round',
                        strokeWidth: '1.05833',
                        strokeLinejoin: 'round',
                        strokeOpacity: 1,
                        strokeMiterlimit: 4,
                     }}
                     d="M 13.758336,44.979166 V 2.645834 l 76.729168,-10e-7"
                     id="line-4"
                  />
                  <g id="source">
                     <path
                        // style="fill:none;stroke:#000000;stroke-width:1.05833;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        style={{
                           fill: 'none',
                           stroke: '#000000',
                           strokeLinecap: 'round',
                           strokeWidth: '1.05833',
                           strokeLinejoin: 'round',
                           strokeOpacity: 1,
                           strokeMiterlimit: 4,
                        }}
                        d="M 3.1750003,44.979166 H 24.341672"
                        id="source-pos"
                     />
                     <path
                        // style="fill:none;stroke:#000000;stroke-width:1.05833;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                        style={{
                           fill: 'none',
                           stroke: '#000000',
                           strokeLinecap: 'round',
                           strokeWidth: '1.05833',
                           strokeLinejoin: 'round',
                           strokeOpacity: 1,
                           strokeMiterlimit: 4,
                        }}
                        d="M 8.4666674,50.270833 H 19.050005"
                        id="source-neg"
                     />
                  </g>
                  <path
                     //  style="fill:none;stroke:#000000;stroke-width:1.05833;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                     style={{
                        fill: 'none',
                        stroke: '#000000',
                        strokeLinecap: 'round',
                        strokeWidth: '1.05833',
                        strokeLinejoin: 'round',
                        strokeOpacity: 1,
                        strokeMiterlimit: 4,
                     }}
                     d="M 74.612504,68.791666 H 65.352088 L 64.029171,63.499999 61.383338,74.083333 58.737504,63.499999 56.091671,74.083333 53.445838,63.499999 50.800005,74.083333 48.154171,63.499999 45.508338,74.083333 44.185421,68.791666 h -9.260416"
                     id="resistor"
                  />
                  <path
                     //  style="fill:none;stroke:#000000;stroke-width:1.05833;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                     style={{
                        fill: 'none',
                        stroke: '#000000',
                        strokeLinecap: 'round',
                        strokeWidth: '1.05833',
                        strokeLinejoin: 'round',
                        strokeOpacity: 1,
                        strokeMiterlimit: 4,
                     }}
                     d="M 34.925005,68.791666 H 13.758336 V 50.270833"
                     id="line-3"
                  />
                  <path
                     //  style="fill:none;stroke:#000000;stroke-width:1.05833;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                     style={{
                        fill: 'none',
                        stroke: '#000000',
                        strokeLinecap: 'round',
                        strokeWidth: '1.05833',
                        strokeLinejoin: 'round',
                        strokeOpacity: 1,
                        strokeMiterlimit: 4,
                     }}
                     d="m 74.612504,68.791666 h 15.875 V 47.625"
                     id="line-2"
                  />
                  <path
                     //  style="fill:none;stroke:#000000;stroke-width:1.05833;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                     style={{
                        fill: 'none',
                        stroke: '#000000',
                        strokeLinecap: 'round',
                        strokeWidth: '1.05833',
                        strokeLinejoin: 'round',
                        strokeOpacity: 1,
                        strokeMiterlimit: 4,
                     }}
                     d="M 90.487504,18.520833 V 2.645834"
                     id="line-1"
                  />
                  <path
                     //  style="fill:none;stroke:#000000;stroke-width:0.79375;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                     style={{
                        fill: 'none',
                        stroke: '#000000',
                        strokeLinecap: 'round',
                        strokeWidth: '1.05833',
                        strokeLinejoin: 'round',
                        strokeOpacity: 1,
                        strokeMiterlimit: 4,
                     }}
                     d="m 19.050005,26.458333 v -15.875 l 3.96875,3.96875"
                     id="path2482"
                  />
                  <g id="current-text" transform="translate(-14.928714,-14.728972)">
                     <text
                        xmlSpace="preserve"
                        // style="font-style:normal;font-weight:normal;font-size:4.09633px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.102406"
                        style={{
                           fontStyle: 'normal',
                           fontWeight: 'normal',
                           fontSize: '4px',
                           lineHeight: 1.25,
                           fill: '#000000',
                           fillOpacity: 1,
                           stroke: 'none',
                        }}
                        x="42.943836"
                        y="30.575043"
                        id="current-label"
                        transform="scale(1.0327506,0.96828799)"
                     >
                        <tspan
                           id="tspan4642"
                           //   style="stroke-width:0.102406"
                           x="42.943836"
                           y="30.575043"
                        >
                           Current
                        </tspan>
                     </text>
                     <text
                        xmlSpace="preserve"
                        // style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"
                        style={{
                           fontStyle: 'normal',
                           fontWeight: 'normal',
                           fontSize: '10px',
                           lineHeight: 1.25,
                           fill: '#000000',
                           fillOpacity: 1,
                           stroke: 'none',
                        }}
                        x="38.033169"
                        y="39.67075"
                        id="current-value"
                     >
                        <tspan
                           id="tspan6890"
                           //   style="stroke-width:0.264583"
                           style={{ strokeWidth: '0.264583' }}
                           x="38.033169"
                           y="39.67075"
                        >
                           {current}
                        </tspan>
                     </text>
                  </g>
                  <g id="source-text" transform="translate(-15.832228,-8.7675903)">
                     <text
                        xmlSpace="preserve"
                        // style="font-style:normal;font-weight:normal;font-size:5.28857px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.132219"
                        style={{
                           fontStyle: 'normal',
                           fontWeight: 'normal',
                           fontSize: '5px',
                           lineHeight: 1.25,
                           fill: '#000000',
                           fillOpacity: 1,
                           stroke: 'none',
                        }}
                        x="47.603081"
                        y="55.363548"
                        id="vcc-label"
                     >
                        <tspan
                           id="tspan9180"
                           //   style="stroke-width:0.132219"
                           x="47.603081"
                           y="55.363548"
                        >
                           VCC
                        </tspan>
                     </text>
                     <text
                        xmlSpace="preserve"
                        // style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"
                        style={{
                           fontStyle: 'normal',
                           fontWeight: 'normal',
                           fontSize: '10px',
                           lineHeight: 1.25,
                           fill: '#000000',
                           fillOpacity: 1,
                           stroke: 'none',
                        }}
                        x="38.652203"
                        y="65.100693"
                        id="vcc-value"
                     >
                        <tspan
                           id="tspan9700"
                           //   style="stroke-width:0.264583"
                           x="38.652203"
                           y="65.100693"
                        >
                           {vcc}
                        </tspan>
                     </text>
                  </g>
                  <g
                     id="resistor-text"
                     transform="translate(-7.4083295,-10.583333)"
                  >
                     <text
                        xmlSpace="preserve"
                        // style="font-style:normal;font-weight:normal;font-size:3.87634px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.0969087"
                        style={{
                           fontStyle: 'normal',
                           fontWeight: 'normal',
                           fontSize: '4px',
                           lineHeight: 1.25,
                           fill: '#000000',
                           fillOpacity: 1,
                           stroke: 'none',
                        }}
                        x="52.19537"
                        y="89.813492"
                        id="res-label"
                     >
                        <tspan
                           id="tspan11660"
                           //   style="stroke-width:0.0969087"
                           x="52.19537"
                           y="89.813492"
                        >
                           Resistance
                        </tspan>
                     </text>
                     <text
                        xmlSpace="preserve"
                        // style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"
                        style={{
                           fontStyle: 'normal',
                           fontWeight: 'normal',
                           fontSize: '10px',
                           lineHeight: 1.25,
                           fill: '#000000',
                           fillOpacity: 1,
                           stroke: 'none',
                        }}
                        x="48.39677"
                        y="100.35821"
                        id="res-value"
                     >
                        <tspan
                           id="tspan14208"
                           //   style="stroke-width:0.264583"
                           x="48.39677"
                           y="100.35821"
                        >
                           {resistor}
                        </tspan>
                     </text>
                  </g>
                  <g
                     id="forwar-voltage-text"
                     transform="translate(-5.7664587,-9.5798714)"
                  >
                     <text
                        xmlSpace="preserve"
                        // style="font-style:normal;font-weight:normal;font-size:5.26478px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.13162"
                        style={{
                           fontStyle: 'normal',
                           fontWeight: 'normal',
                           fontSize: '5px',
                           lineHeight: 1.25,
                           fill: '#000000',
                           fillOpacity: 1,
                           stroke: 'none',
                        }}
                        x="110.7935"
                        y="23.08077"
                        id="forward-volt-label"
                     >
                        <tspan
                           id="tspan16096"
                           //   style="stroke-width:0.13162"
                           x="110.7935"
                           y="23.08077"
                        >
                           Vf
                        </tspan>
                     </text>
                     <text
                        xmlSpace="preserve"
                        // style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264583"
                        style={{
                           fontStyle: 'normal',
                           fontWeight: 'normal',
                           fontSize: '10px',
                           lineHeight: 1.25,
                           fill: '#000000',
                           fillOpacity: 1,
                           stroke: 'none',
                        }}
                        x="99.261871"
                        y="32.391663"
                        id="forward-volt-value"
                     >
                        <tspan
                           id="tspan17912"
                           //   style="stroke-width:0.264583"
                           x="99.261871"
                           y="32.391663"
                        >
                           {forwardV}
                        </tspan>
                     </text>
                  </g>
               </g>
            </svg>
         </div>
      </div>
   );
};

export default LEDResistor;
