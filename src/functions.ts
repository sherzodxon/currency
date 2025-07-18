export const getMonthName=(monthNumber:number)=> {
    switch (monthNumber) {
        case 1: return "Yanvar";
        case 2: return "Fevral";
        case 3: return "Mart";
        case 4: return "Aprel";
        case 5: return "May";
        case 6: return "Iyun";
        case 7: return "Iyul";
        case 8: return "Avgust";
        case 9: return "Sentyabr";
        case 10: return "Oktyabr";
        case 11: return "Noyabr";
        case 12: return "Dekabr";
        default: return "Invalid month number";
    }
}
export function getFirstTwoLetters(word:string) {
    if (word.length === 3) {
      return word.substring(0, 2);
    } else {
      return 'Input must be a three-letter word';
    }
}
export function convertToDDMMYY(dateString:string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = String(date.getFullYear()).slice(2); // Get last two digits of year

  return `20${year}-${month}-${day}`;
}