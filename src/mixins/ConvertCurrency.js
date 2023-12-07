export default {
    methods: {
        convertCurrency(amount, fromCurrency, toCurrency) {
            const exchangeRate = 1 / 4000;
            let convertedAmount;

            if (fromCurrency === 'USD' && toCurrency === 'KHR') {
                convertedAmount = amount * exchangeRate;
            } else if (fromCurrency === 'KHR' && toCurrency === 'USD') {
                convertedAmount = amount / (exchangeRate * 4000);
            } else {
                convertedAmount = amount;
            }

            return convertedAmount;
        }
    }
}