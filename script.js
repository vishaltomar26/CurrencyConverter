const apiKey = '8b9fe4cf8de82830b80fea00';  // Replace with your API key from Exchangerate-API
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;


const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const result = document.getElementById('result');

// Fetch list of currencies and populate dropdowns
async function populateCurrencyDropdowns() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const currencies = Object.keys(data.conversion_rates);

    currencies.forEach(currency => {
      const optionFrom = document.createElement('option');
      const optionTo = document.createElement('option');

      optionFrom.value = currency;
      optionFrom.textContent = currency;
      fromCurrency.appendChild(optionFrom);

      optionTo.value = currency;
      optionTo.textContent = currency;
      toCurrency.appendChild(optionTo);
    });
  } catch (error) {
    console.error('Error fetching the currency data:', error);
  }
}

// Convert currency on button click
document.getElementById('convertBtn').addEventListener('click', async function() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    result.innerText = 'Please enter a valid amount.';
    return;
  }

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`);
    const data = await response.json();
    const rate = data.conversion_rate;
    const convertedAmount = (amount * rate).toFixed(2);
    
    result.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
  } catch (error) {
    console.error('Error fetching the conversion rate:', error);
    result.innerText = 'Error fetching conversion rate.';
  }
});

// Populate currency dropdowns on page load
populateCurrencyDropdowns();
