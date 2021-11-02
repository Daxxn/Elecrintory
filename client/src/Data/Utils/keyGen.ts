export default function keyGenSync(length: number = 10, maxRecirc: number = 50) {
   const output: string[] = [];
   for (let i = 0; i < length; i++) {
      const chr = rollChar(maxRecirc);
      output.push(chr);
   }
   return output.join('');
}

const rollChar = (maxRecirc: number): string => {
   if (maxRecirc <= 0) {
      return '~';
   }
   const i = rollInt();
   return i < 95 ? String.fromCharCode(i + 48) : rollChar(maxRecirc--);
}

const rollInt = (): number => {
   const roll = Math.random() * 10 ^ 2;
   const floor = Math.floor(roll);
   return floor;
}

/**
 * Generates a key asyncronously.
 * Best for long (over 20) keys.
 * @param length Length of the generated key.
 * @returns {Promise<string>} a promise of the key
 */
export async function keyGenAsync(length: number = 10) {
   return new Promise<string>((res, rej) => {
      try {
         res(keyGenSync(length));
      } catch (err) {
         rej(err);
      }
   });
}