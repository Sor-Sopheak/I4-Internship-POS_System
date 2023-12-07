export default {
    methods: {
      convertToKhmerNumber(number) {
        const khmerNumbers = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
        const numStr = String(number);
        let khmerNum = '';
  
        for (const digit of numStr) {
          khmerNum += khmerNumbers[parseInt(digit)];
        }
  
        return khmerNum;
      },
  
      FormattedKhmerDate(gregorianDate, includeTime = false) {
        const dateParts = gregorianDate.split(" ");
        const [gregorianDatePart, timePart] = dateParts;
        const [day, month, year] = gregorianDatePart.split("-").map(Number);
  
        const khmerMonths = [
          "មករា",
          "កុម្ភៈ",
          "មិនា",
          "មេសា",
          "ឧសភា",
          "មិថុនា",
          "កក្កដា",
          "សីហា",
          "កញ្ញា",
          "តុលា",
          "វិច្ឆិកា",
          "ធ្នូ",
        ];
  
        const khmerYear = this.convertToKhmerNumber(year);
        const khmerMonth = khmerMonths[month - 1];
        const khmerDay = this.convertToKhmerNumber(day);
  
        const convertedDate = `${khmerDay}-${khmerMonth}-២០${khmerYear}`;
  
        if (includeTime) {
          const convertedTime = this.convertToKhmerTime(timePart);
          return `${convertedDate} ${convertedTime}`;
        }
        return convertedDate;
      },
  
      convertToKhmerTime(timePart) {
        const [hours, minutes, seconds] = timePart.split(":").map(Number);
        const period = hours >= 12 ? "ល្ងាច" : "ព្រឹក";
        const khmerHours = hours > 12 ? hours - 12 : hours;
  
        return `${khmerHours}:${minutes}:${seconds} ${period}`;
      },
    },
  };
  