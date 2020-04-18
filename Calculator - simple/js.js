const item = document.querySelectorAll(".item");
const input = document.querySelector(".input");
const ans = document.querySelector('.ans');
let inputArr = [];
const isOperator = ['+','-','*','/'];
let lastAns = 0;
let magicNumber;

for (let i = 0; i < item.length; i++) {item[i].addEventListener("click", function() {
  //Clear - [AC]
  magicNumber = i; //Can call "i" outside the loop through "magicNumber"
  if (i === 0) {
    input.textContent = '';
    ans.textContent = 0;
    inputArr = [];
    item[14].disabled = false; // Disabled button "="
    lastAns = 0;
  }
  //Number - [0...9]
  if ([3,4,5,7,8,9,11,12,13,15].indexOf(i) > -1) {
    if ((inputArr[inputArr.length-1] === '0') && (isOperator.indexOf(inputArr[inputArr.length-2]) > -1)) {
      inputArr.pop();
      inputArr.push(item[i].value);
    }
    else inputArr.push(item[i].value);
  }
  //Dot - [.]
  if (i === 16) {
    if (inputArr.length === 0) {
      inputArr.push(0);
      inputArr.push(item[i].value);
    }
    else if (inputArr.lastIndexOf('.') > -1) {
      if (dotcheck()) {
        if (isOperator.indexOf(inputArr[inputArr.length-1]) > -1) {
          inputArr.push(0);
          inputArr.push(item[i].value);
        } 
        else if (inputArr[inputArr.length-1] === ".") {
          inputArr.pop();
          inputArr.push(item[i].value);
        }
      }
    }
    else if (isOperator.indexOf(inputArr[inputArr.length-1]) > -1) {
      inputArr.push(0);
      inputArr.push(item[i].value);
    } 
    else inputArr.push(item[i].value);
  }
  //Operators - [+-*/]
  if ([1,2,6,10].indexOf(i) > -1) {
    if (inputArr.length === 0) {
      Number.isInteger(lastAns) ? inputArr.push(lastAns) : decNumber();
      inputArr.push(item[i].value);
    }
    else if (isOperator.indexOf(inputArr[inputArr.length-1]) > -1) {
      inputArr.pop();
      inputArr.push(item[i].value);
    }
    else inputArr.push(item[i].value);
  }
    //Digit limit
  if (inputArr.length > 20) {
    inputArr.pop();
    ans.textContent = "Digit is limited";
    item[14].disabled = true;
  }
  //Double zero
  if (inputArr[0] === "0" && inputArr[1] === "0") {
    inputArr.pop();
  }
  //Show input
  input.textContent = inputArr.join().replace(/,/g,'');
  //Equal - [=]
  if (i === 14) {
    lastAns = eval(input.textContent);
    ans.textContent = lastAns.toString().slice(0,14);
    inputArr = [];
  }
}
)}
function dotcheck() {
    const newArr = inputArr.slice(inputArr.lastIndexOf('.'),inputArr.length);
    return newArr.some(elem => isOperator.includes(elem));
} 
function decNumber() {
  let dot = lastAns.toString().indexOf('.');
  inputArr.push(lastAns.toString().slice(0,dot+7));
}