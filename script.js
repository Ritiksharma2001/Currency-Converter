const apiKey = "53d20f22b75dc05ef9b4cefc"; // Replace with your ExchangeRate-API key
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

let exchangeRates = {};

// Fetch currency rates when the page loads
fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        if (data.result === "success") {
            exchangeRates = data.conversion_rates;
            populateCurrencyOptions();
        } else {
            console.error("Failed to fetch exchange rates.");
        }
    })
    .catch(error => console.error("Error fetching exchange rates:", error));

// Populate dropdowns with currency options
function populateCurrencyOptions() {
    fromCurrency.innerHTML = "";
    toCurrency.innerHTML = "";

    for (let currency in exchangeRates) {
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");

        option1.value = option2.value = currency;
        option1.text = option2.text = currency;

        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    }

    // Set default values
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
}

// Convert currency
function convertCurrency() {
    let fromValue = fromCurrency.value;
    let toValue = toCurrency.value;
    let amountValue = amount.value;

    if (amountValue === "" || amountValue <= 0) {
        result.innerHTML = "Please enter a valid amount!";
        return;
    }

    let convertedAmount = (amountValue * exchangeRates[toValue]) / exchangeRates[fromValue];
    result.innerHTML = `${amountValue} ${fromValue} = ${convertedAmount.toFixed(2)} ${toValue}`;
}

const themeToggle = document.getElementById("theme-toggle");

// Check & Apply Saved Theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerText = "☀️ Light Mode";
}

// Toggle Theme on Button Click
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.innerText = "🌙 Dark Mode";
    }
});
