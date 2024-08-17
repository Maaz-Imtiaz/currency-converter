const apiKey = "692e25b111bfbfbabab631f9";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlage(evt.target);
  });
}
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();
    const exchangeRate = data.conversion_rates[toCurr.value];

    if (exchangeRate) {
      const convertedAmount = (amtVal * exchangeRate).toFixed(2);
      msg.innerText = `${amtVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
    } else {
      msg.innerText = "Conversion rate not available";
    }
  } catch (error) {
    msg.innerText = "Error fetching exchange rates: " + error.message;
  }
};
const updateFlage = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png `;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});
