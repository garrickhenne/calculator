let storedNumber = '';
let lastOp = '';

function add(a, b) {
    if (isString(a) || isString(b)) {
        a = parseInt(a);
        b = parseInt(b);
    }
    return a + b;
}

function subtract(a, b) {
    if (isString(a) || isString(b)) {
        a = parseInt(a);
        b = parseInt(b);
    }
    return a - b;
}

function multiply(a, b) {
    if (isString(a) || isString(b)) {
        a = parseInt(a);
        b = parseInt(b);
    }
    return a * b;
}

function divide(a, b) {
    if (isString(a) || isString(b)) {
        a = parseInt(a);
        b = parseInt(b);
    }
    return a / b;
}

function operate(op, a, b) {
    if (isString(a) || isString(b)) {
        a = parseInt(a);
        b = parseInt(b);
    }
    return op(a,b);
}

function isString(word) {
    return typeof word == 'string';
}

const inputs = document.querySelectorAll('.circle');
inputs.forEach((input) => {
    input.addEventListener('click', determineButton);
})

const zero = document.querySelector('.zero');
zero.addEventListener('click', determineButton);

function determineButton(input) {
    input = input.target;
    input.currentTime = 0;
    console.log(input.textContent);

    if (isNumber(input)) {
        updateInputBox(input.textContent);
    } else if (input.textContent === "AC") {
        clearInputs();
    } else if (isOp(input.textContent)) {
        calcOp(input.textContent);
    }
    
}

function isOp(operation) {
    return operation === '/' ||
            operation === 'X' ||
            operation === '-' ||
            operation === '+' ||
            operation === '=';
}

function calcOp(op) {
    const inputBox = document.querySelector('.text-box-input');
    if (inputBox.textContent === '0') {
        console.log("its empty");
    } else {
        if (storedNumber === '') {
            storedNumber = inputBox.textContent;
            lastOp = op;
            inputBox.textContent = '0';
        } else {
            let otherNum = inputBox.textContent;
            switch (op) {
                case '/':
                    lastOp = '/';
                    inputBox.textContent = operate(divide,storedNumber,otherNum);
                    break;
                case 'X':
                    lastOp = 'X';
                    inputBox.textContent = operate(multiply, storedNumber, otherNum);
                    break;
                case '-':
                    lastOp = '-';
                    inputBox.textContent = operate(subtract, storedNumber, otherNum);
                    break;
                case '+':
                    lastOp = '+';
                    inputBox.textContent = operate(add, storedNumber, otherNum);
                    break;
                case '=':
                    if (lastOp !== '') {
                        let desiredOp = computeForEqual(lastOp);
                        inputBox.textContent = operate(desiredOp, storedNumber, otherNum);
                        lastOp = '';
                    }

            }
        }
    }
}

function computeForEqual(op) {
    switch (op) {
        case '/':
            return divide;
        case 'X':
            return multiply;
        case '-':
            return subtract;
        case '+':
            return add;
        default:
            return null;
    }
} 

function isNumber(input) {
    let reg = /[0-9]/;
    number = input.textContent;
    return number.match(reg) !== null;
}

function updateInputBox(number) {
    const textBox = document.querySelector('.text-box-input');

    if (textBox.textContent === "0") {
        textBox.textContent = number;
    } else {
        if (textBox.textContent.length > 23) {
            alert("Calculator does not support numbers greater than 23...");
            return;
        }
        textBox.textContent += number;
    }
}

function clearInputs() {
    const inputBox = document.querySelector('.text-box-input');
    inputBox.textContent = 0;
    storedNumber = '';
    lastOp = '';
}

