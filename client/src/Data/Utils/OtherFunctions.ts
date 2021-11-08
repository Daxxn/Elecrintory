export default function Parse(input: string): number {
   const num = parseInt(input);
   if (!isNaN(num)) {
      return num;
   }
   return num;
}
