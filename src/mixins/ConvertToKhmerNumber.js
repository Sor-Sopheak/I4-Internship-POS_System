export default {
  methods: {
    ConvertToKhmerNumber(number, currencySymbol = "") {
      const khmerNumbers = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
      const numberStr = number.toString();
      let khmerNumber = "";

      for (let i = 0; i < numberStr.length; i++) {
        const char = numberStr.charAt(i);
        if (char == ".") {
          khmerNumber += ".";
        } else {
          const digit = parseInt(char);
          khmerNumber += khmerNumbers[digit];
        }
      }

      return khmerNumber + currencySymbol;
    },
  },
};
