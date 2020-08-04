const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

let display = document.querySelector('#results > h1');

function updateDisplay(){
    display.textContent = calculator.displayValue;
}

updateDisplay();

function action(event){
    const { target } = event;
    const { value } = target;
    switch(value){
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value);
            break;
        case "AC":
            allClear();
            break;
        case ".":
            displayDot(value);
            break;
        default:
            displayDigit(value);
        }
    updateDisplay();
}

function displayDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } 
    else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function displayDot(dot) {
    if (calculator.displayValue.includes(".")){
        return false;
    } 
    else {
        calculator.displayValue += ".";
    }
}

function operate(operator, firstOperand, secondOperand) {
    switch (operator) {
        case "+":
            return firstOperand + secondOperand;
            break;
        case "-":
            return firstOperand - secondOperand;
            break;
        case "*":
            return firstOperand * secondOperand;
            break;
        case "/":
            if (secondOperand == 0) {
                throw new Error("∞")
            }
            return firstOperand / secondOperand;
            break;
    }
    return secondOperand;
}

function handleOperator(nextOperator) {
    const { firstOperand, operator } = calculator;
    let { displayValue } = calculator;

    const inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } 
    else if (operator) {
        try {
            const result = operate(operator, firstOperand, inputValue);
            calculator.displayValue = `${parseFloat(result.toFixed(6))}`;
            calculator.firstOperand = result;
        } 
        catch (error){            
            allClear();
            calculator.displayValue = error.message;
            display.setAttribute("style", "color : red; font-size: 32px;");
            return false;
        }
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function allClear() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    display.setAttribute("style", "color : black; font-size: 40px;");
}

let btns = document.querySelectorAll(".btnItem")

btns.forEach((btn) => {
      btn.addEventListener("click", action);
})

function erasetext() {
    let arr = calculator.displayValue.split("");
    arr.pop();
    calculator.displayValue = arr.join("");
    updateDisplay();
}

let erase = document.querySelector(".backspace");
erase.onclick = erasetext;

function pressKey(event) {
    let key = document.querySelector(`button[data-key="${event.keyCode}"]`);
    if (!key) return false;    
    switch (event.keyCode) {
        case(107):
        case(109):
        case(106):
        case(111):
        case(13):
            handleOperator(key.value);
            break;
        case (8):
            erasetext();
            break;
        case (36):
            allClear();
            break;
        case (46):
            displayDot(key.value);
            break;
        default:
            displayDigit(key.value);
    }  
    updateDisplay();
}

window.addEventListener("keydown", pressKey)












