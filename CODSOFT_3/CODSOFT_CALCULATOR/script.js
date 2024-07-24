document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let previousInput = '';
    let operator = null;

    updateDisplay();

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (!isNaN(value) || value === '.') {
                handleNumber(value);
            } else if (value === 'C') {
                clear();
            } else if (value === '=') {
                handleEquals();
            } else {
                handleOperator(value);
            }
            updateDisplay();
        });
    });

    function handleNumber(num) {
        if (currentInput.includes('.') && num === '.') return;
        currentInput = currentInput + num;
    }

    function handleOperator(op) {
        if (currentInput === '') return;

        if (previousInput === '') {
            previousInput = currentInput;
        } else if (operator) {
            previousInput = operate(operator, previousInput, currentInput);
        }

        operator = op;
        currentInput = '';
    }

    function handleEquals() {
        if (operator && currentInput) {
            currentInput = operate(operator, previousInput, currentInput);
            operator = null;
            previousInput = '';
        }
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operator = null;
    }

    function updateDisplay() {
        display.innerText = `${previousInput} ${operator || ''} ${currentInput}`;
    }

    function operate(operator, num1, num2) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        switch (operator) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return (num1 / num2).toString();
            default:
                return '';
        }
    }
});
