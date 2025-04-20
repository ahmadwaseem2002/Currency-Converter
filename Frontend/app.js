// const BASEURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/inr/usd/.json";

 

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(" .to select");
const msg = document.querySelector(".msg");

const proxy = "https://cors-anywhere.herokuapp.com/";

for (let select of dropdowns) {

    for (currcode in countryList) {
        newOption = document.createElement("option");
        newOption.value = currcode;
        newOption.innerText = currcode;
        select.appendChild(newOption);
        if (select.name === "from" && currcode === "USD") {
            newOption.selected = true;
        }
        else if (select.name === "to" && currcode === "INR") {
            newOption.selected = true;
        }
        select.addEventListener("change", (evet) => {
            flagupdate(evet.target);
        })
    }
}

const flagupdate = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode]
    let flag = element.parentElement.querySelector("img");
    flag.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue === "" || amountValue <= 0) {
        amount.value = "1";
        amountValue = 1;
        alert("Please enter a valid amount");
    }

    
    // let URL = `${BASEURL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    // let response = await fetch(URL);
    // console.log(response);

    const apiKey = "fca_live_qH4bcnFu9cZTNvCeDeN9DdyGXGeiPFmQwGS8uNph";
  const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${fromcurr.value}`;
  let response = await fetch( proxy+url);
  console.log(response);
  const data = await response.json();
  let rate= data.data[tocurr.value];
    console.log(rate);

    let amounts= (amountValue * rate);
    console.log(amounts);

    msg.innerText = `${amountValue} ${fromcurr.value} = ${amounts.toFixed(2)} ${tocurr.value}`;
        



});



