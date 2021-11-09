export default function seriesResistorLEDCalc(
   vcc: number,
   fv: number,
   curr: number
): number {
   return (vcc - fv) / (curr * 0.001);
}

export function resistorColorCalc(
   band1: number,
   band2: number,
   band3: number,
   mul: number
) {
   var output = band3;
   output += band2 * 10;
   output += band1 * 100;
   if (mul >= 0 && mul < 10) {
      return output * Math.pow(10, mul);
   } else {
      if (mul === 10) {
         return output * 0.1;
      } else if (mul === 11) {
         return output * 0.01;
      } else {
         throw new Error('Multiplier outside valid range.');
      }
   }
}
