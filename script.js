//DOM / Variables
const output = document.getElementById('output');
const prevValue = document.querySelector('.current-operator');
const utilityBtns = document.querySelectorAll('.utility-btn');
const operatorBtns = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.numbers');
const equal = document.querySelector('.equal');
const turnNegative = document.querySelector('.negative-value');

let firstValue = undefined;
let secondValue = undefined;
let operator = undefined;

//Eventlisteners
numbers.forEach(number => number.addEventListener('click', updateOutput));
operatorBtns.forEach(operator => operator.addEventListener('click', updateOperator));
equal.addEventListener('click', () => { calculate() })
utilityBtns.forEach(btn => btn.addEventListener('click', utilities));
turnNegative.addEventListener('click', () => turnNumNegative(+output.value));
window.addEventListener('keydown', kBoardSupport);

//Functions
function updateOutput(e) {
    //Remove the zero when we start entering values.
    if(output.value == '0') output.value = '';

    output.value += e.target.textContent;

    if(checkClass(e.currentTarget, 'comma')) {
        if(output.value.includes('.')) return;
        output.value += '.';
    }

}

function updateOperator(e) {
    if(output.value !== '0' && output.value !== '.' && !firstValue) {
        firstValue = +output.value;
    const data = e.currentTarget.dataset.value;

    prevValue.innerHTML = `${firstValue} ${data}`;

    switch(data) {
        case '+':
            operator = addition();
            break;
        case '-':
            operator = subtraction();
            break;
        case '*':
            operator = multiplication();
            break;
        default:
            operator = division();
            break;
    }

    output.value = '0';
    };
}

function calculate() {
    if(output.value !== '0') {
        secondValue = +output.value;
        if(firstValue && secondValue) {
            operator(firstValue, secondValue);
            returnDefault();
        }
    };
}

function utilities(e) {
    if(checkClass(e.currentTarget, 'clear-all')) {
        returnDefault();
        output.value = '0';
    } else if(checkClass(e.currentTarget, 'clear-current')) {
        output.value = '0';
    } else {
        if(output.value.length > 1) {
            output.value = output.value.slice(0, output.value.length - 1);
        } else {
            output.value = '0';
        }
    }
}


function turnNumNegative(number) {
    if(number !== 0) {
        output.value = number * -1;
    }
}

function addition() {
    return function(a,b) {
        output.value = a + b;
    }
}
function subtraction() {
    return function(a,b) {
        output.value = a - b;
    }
}
function multiplication() {
    return function(a,b) {
        const result = a * b;
        isFloat(result);
    }
}
function division() {
    return function(a,b) {
        const result = a / b;
        isFloat(result);
    }
}

function returnDefault() {
    firstValue = undefined;
    secondValue = undefined;
    operator = undefined;
    prevValue.innerHTML = '';
}

function checkClass(element, className) {
    if(element.classList.contains(className)) {
        return true;
    } else {
        return false;
    }
}

function isFloat(n){
    if(Number(n) === n && n % 1 !== 0) {
        output.value = n.toFixed(2);
    } else {
        output.value = n;
    }
}

function kBoardSupport(e) {
    operatorBtns.forEach(operator => {
        const data = operator.dataset.value;
        if(e.key == data) {
           operator.click();
        }
    })
    numbers.forEach(number => {
        const numberInfo = number.textContent;
        if(e.key == numberInfo) {
            number.click();
        } else if(e.key == '.') {
            if(output.value.includes('.')) return;
            output.value += '.';
        }
    })
    if(e.key == 'Enter') {
        calculate();
    } else if(e.key == 'Backspace') {
        if(output.value.length > 1) {
            output.value = output.value.slice(0, output.value.length - 1);
        } else {
            output.value = '0';
        }
    }
}