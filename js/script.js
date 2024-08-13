//dom element
const hourel = document.querySelector(".hour");
const minuteel = document.querySelector(".minute");

const displayel = document.querySelector(".value");
const acel = document.querySelector(".ac");
const pmel = document.querySelector(".pm");
const percentel = document.querySelector(".percent");
const additionel = document.querySelector(".addition");
const subtractionel = document.querySelector(".subtraction");
const multiplicationel = document.querySelector(".multiplication");
const divisionel = document.querySelector(".division");

const equalel = document.querySelector(".equal");

const decimalel = document.querySelector(".decimal");

const number0el = document.querySelector(".number-0");

const number1el = document.querySelector(".number-1");
const number2el = document.querySelector(".number-2");
const number3el = document.querySelector(".number-3");
const number4el = document.querySelector(".number-4");
const number5el = document.querySelector(".number-5");
const number6el = document.querySelector(".number-6");
const number7el = document.querySelector(".number-7");
const number8el = document.querySelector(".number-8");
const number9el = document.querySelector(".number-9");

const numberelarray = [
  number0el,
  number1el,
  number2el,
  number3el,
  number4el,
  number5el,
  number6el,
  number7el,
  number8el,
  number9el,
];

// variable

let valuestringInmemory = null;
let operatorInmemory = null;

// function
const getvalueAsStr = () => displayel.textContent.split(",").join("");

const getValueAsnum = () => {
  return parseFloat(getvalueAsStr());
};

const setStringasvalue = (valuestr) => {
  if (valuestr[valuestr.length - 1] === ".") {
    displayel.textContent += ".";
    return;
  }
  const [wholeNumStr, decimalStr] = valuestr.split(".");
  if (decimalStr) {
    displayel.textContent =
      parseFloat(wholeNumStr).toLocaleString() + "." + decimalStr;
  } else {
    displayel.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

const handlenumberclick = (numStr) => {
  const displaystr = getvalueAsStr();
  if (displaystr === "0") {
    setStringasvalue(numStr);
  } else {
    setStringasvalue(displaystr + numStr);
  }
};

const getresultofoperationStr = () => {
  const currentValuenum = getValueAsnum();
  const valuenumInmemory = parseFloat(valuestringInmemory);
  let newValuenum;
  if (operatorInmemory === "addition") {
    newValuenum = valuenumInmemory + currentValuenum;
  } else if (operatorInmemory === "subtraction") {
    newValuenum = valuenumInmemory - currentValuenum;
  } else if (operatorInmemory === "multiplication") {
    newValuenum = valuenumInmemory * currentValuenum;
  } else if (operatorInmemory === "division") {
    newValuenum = valuenumInmemory / currentValuenum;
  }
  return newValuenum.toString();
};

const handleoperatorclick = (operation) => {
  const currentValuestr = getvalueAsStr();

  if (!valuestringInmemory) {
    valuestringInmemory = currentValuestr;
    operatorInmemory = operation;
    setStringasvalue("0");
    return;
  }

  valuestringInmemory = getresultofoperationStr();

  operatorInmemory = operation;
  setStringasvalue("0");
};

//add event listeners to functions

acel.addEventListener("click", () => {
  setStringasvalue("0");
  valuestringInmemory = null;
  operatorInmemory = null;
});

pmel.addEventListener("click", () => {
  const currentvaluenum = getValueAsnum();
  const currentValuestr = getvalueAsStr();
  if (currentValuestr === "-0") {
    setStringasvalue("0");
    return;
  }

  if (currentvaluenum >= 0) {
    setStringasvalue("-" + currentValuestr);
  } else {
    setStringasvalue(currentValuestr.substring(1));
  }
});

percentel.addEventListener("click", () => {
  const currentvaluenum = getValueAsnum();
  const newvalueNum = currentvaluenum / 100;
  setStringasvalue(newvalueNum.toString());
  valuestringInmemory = null;
  operatorInmemory = null;
});

// add Event listeners to operators

additionel.addEventListener("click", () => {
  handleoperatorclick("addition");
});

subtractionel.addEventListener("click", () => {
  handleoperatorclick("subtraction");
});

multiplicationel.addEventListener("click", () => {
  handleoperatorclick("multiplication");
});

divisionel.addEventListener("click", () => {
  handleoperatorclick("division");
});

equalel.addEventListener("click", () => {
  if (valuestringInmemory) {
    setStringasvalue(getresultofoperationStr());
    valuestringInmemory = null;
    operatorInmemory = null;
  }
});

// add Event listeners to numbers and decimal

for (let i = 0; i < numberelarray.length; i++) {
  const numberel = numberelarray[i];
  numberel.addEventListener("click", () => {
    handlenumberclick(i.toString());
  });
}

decimalel.addEventListener("click", () => {
  const currentValuestr = getvalueAsStr();
  if (!currentValuestr.includes(".")) {
    setStringasvalue(currentValuestr + ".");
  }
});

const updateTime = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  if (currentHour > 12) {
    currentHour -= 12;
  }

  hourel.textContent = currentHour.toString();
  minuteel.textContent = currentMinute.toString().padStart(2, "0");
};
setInterval(updateTime, 1000);
updateTime();
