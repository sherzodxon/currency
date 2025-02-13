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