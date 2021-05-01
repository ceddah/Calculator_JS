//DOM / Variables
const output = document.getElementById('output');
const prevValue = document.querySelector('.current-operator');
const utilityBtns = document.querySelectorAll('.utility-btn');
const operatorBtns = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.numbers');
const equal = document.querySelector('.equal');

let firstValue = undefined;
let secondValue = undefined;
let operator = undefined;

//Eventlisteners
numbers.forEach(number => number.addEventListener('click', updateOutput));
operatorBtns.forEach(operator => operator.addEventListener('click', updateOperator));
equal.addEventListener('click', () => { calculate() })

//Functions

function updateOutput(e) {
    output.value += e.target.textContent;
    //Proveriti da li output sadrzi tacku, ako ne dodaj je ako da return.
}

function updateOperator(e) {
    if(output.value == '') return;
    firstValue = +output.value;
    const data = e.target.dataset.value;
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

    output.value = '';
}

function calculate() {
    if(output.value == '') return;
    secondValue = +output.value;
    operator(firstValue, secondValue);
    returnDefault();
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
        output.value = a * b;
    }
}
function division() {
    return function(a,b) {
        output.value = a / b;
    }
}

function returnDefault() {
    let firstValue = undefined;
    let secondValue = undefined;
    let operator = undefined;
    prevValue.innerHTML = '';
}