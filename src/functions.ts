export const getMonthName = (monthNumber : string) => {
  const date  = new Date(monthNumber);
  const month = date.getMonth();
 
    switch (month) {
        case 0:
            return "Yanvar";
        case 1:
            return "Fevral";
        case 2:
            return "Mart";
        case 3:
            return "Aprel";
        case 4:
            return "May";
        case 5:
            return "Iyun";
        case 6:
            return "Iyul";
        case 7:
            return "Avgust";
        case 8:
            return "Sentyabr";
        case 9:
            return "Oktyabr";
        case 10:
            return "Noyabr";
        case 11:
            return "Dekabr";
        default:
            return "Invalid month number";
    }
}
export function getFirstTwoLetters(word : string) {
    if (word.length === 3) {
        return word.substring(0, 2);
    } else {
        return 'Input must be a three-letter word';
    }
}
export function convertToYYYYMMDD(date: Date | Date[] | null | undefined): string | string[] {
  const format = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (!date) {
    return Array.isArray(date) ? [] : "";
  }

  if (Array.isArray(date)) {
    return date.map(d => format(d));
  }

  return format(date);
}



export function formatDateTime(datetimeStr : string) {
    const date = new Date(datetimeStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format: DD.MM.YYYY HH:mm
    return `${day}.${month}.${year} , ${hours}:${minutes}`;
}
export function getLast12Months() {
    const today = new Date();
    const result = [];

    for (let i = 0; i < 12; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1); // 12-kuni
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based => +1
        const year = date.getFullYear();
        result.unshift(`${year}-${month}-01`);
    }

    return result;
}

export function roundToLowerHundred(value : any) {
    return Math.floor(value / 100) * 100;
}
export function roundToUpperHundred(value : any) {
    return Math.ceil(value / 100) * 100;
}
export function findMinMaxRate(data : any) {
    if (data.length) {
        let minRate = data[0].rate;
        let maxRate = data[0].rate;

        for (let i = 1; i < data.length; i++) {
            if (data[i].rate < minRate) {
                minRate = data[i].rate;
            }
            if (data[i].rate > maxRate) {
                maxRate = data[i].rate;
            }
        }

        return {minRate, maxRate};
    }
    else {
      const minRate = 0;
      const maxRate = 100;
       return {minRate, maxRate};
    }
}