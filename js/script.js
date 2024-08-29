/* =============================
   Funções da calculadora
   ============================= */

   let history = [];
   let currentInput = '';
   let previousInput = '';
   let operator = '';
   let resultDisplayed = false;
   
   function clearDisplay() {
       currentInput = '';
       previousInput = '';
       operator = '';
       updateDisplay('0');
   }
   
   function deleteLast() {
       currentInput = currentInput.slice(0, -1);
       updateDisplay(currentInput || '0');
   }
   
   function appendNumber(number) {
       if (resultDisplayed) {
           currentInput = ''; // Limpa o input atual se o resultado foi exibido
           resultDisplayed = false;
       }
       currentInput += number;
       updateDisplay(currentInput);
   }
   
   function appendOperator(op) {
       if (currentInput === '' && previousInput !== '') {
           operator = op; // Permite trocar o operador
           return;
       }
   
       if (previousInput === '') {
           previousInput = currentInput;
           currentInput = '';
       } else {
           calculateResult();
       }
   
       operator = op;
       updateDisplay(previousInput + " " + operator); // Exibe o resultado parcial com o operador
       resultDisplayed = true;
   }
   
   function isOperator(character) {
       return ['+', '-', '*', '/'].includes(character);
   }
   
   function calculateResult() {
       let result;
       const num1 = parseFloat(previousInput);
       const num2 = parseFloat(currentInput);
   
       if (isNaN(num1) || isNaN(num2)) return;
   
       switch (operator) {
           case '+':
               result = num1 + num2;
               break;
           case '-':
               result = num1 - num2;
               break;
           case '*':
               result = num1 * num2;
               break;
           case '/':
               result = num1 / num2;
               break;
           default:
               return;
       }
   
       previousInput = result.toString();
       addToHistory(num1 + " " + operator + " " + num2 + " = " + result);
       currentInput = '';
       operator = '';
       updateDisplay(previousInput);
       resultDisplayed = true;
   }
   
   /* Nova Função para Calcular Porcentagem */
   function calculatePercentage() {
       let currentValue = parseFloat(document.getElementById('display').value);
       if (isNaN(currentValue)) return;
       let result = currentValue / 100;
       updateDisplay(result);
       addToHistory(currentValue + "% = " + result);
   }
   
   /* Nova Função para Calcular Raiz Quadrada */
   function calculateSquareRoot() {
       let currentValue = parseFloat(document.getElementById('display').value);
       if (isNaN(currentValue)) return;
       let result = Math.sqrt(currentValue);
       updateDisplay(result);
       addToHistory("√" + currentValue + " = " + result);
   }
   
   function updateDisplay(value) {
       document.getElementById('display').value = value;
   }
   
   /* =============================
      Funções de Histórico
      ============================= */
   
   function addToHistory(entry) {
       history.push(entry);
       localStorage.setItem('calcHistory', JSON.stringify(history));
   }
   
   function loadHistory() {
       let storedHistory = JSON.parse(localStorage.getItem('calcHistory')) || [];
       history = storedHistory;
       let historyList = document.getElementById('history-list');
       if (historyList) {
           historyList.innerHTML = ''; // Limpa a lista antes de adicionar os itens
           history.forEach(entry => {
               let listItem = document.createElement('li');
               listItem.textContent = entry;
               historyList.appendChild(listItem);
           });
       }
   }
   
   function clearHistory() {
       history = [];
       localStorage.removeItem('calcHistory');
       loadHistory();
   }
   
   /* Carrega o histórico ao abrir a página */
   window.onload = loadHistory;
   
   /* =============================
      Funções de entrada via teclado
      ============================= */
   
   document.addEventListener('keydown', function(event) {
       const key = event.key;
   
       // Verifica se a tecla é um número (0-9)
       if (!isNaN(key)) {
           appendNumber(key);
       }
   
       // Verifica se a tecla é um operador
       if (['+', '-', '*', '/'].includes(key)) {
           appendOperator(key);
       }
   
       // Verifica se a tecla é Enter (para calcular o resultado)
       if (key === 'Enter') {
           calculateResult();
       }
   
       // Verifica se a tecla é Backspace (para apagar o último caractere)
       if (key === 'Backspace') {
           deleteLast();
       }
   
       // Verifica se a tecla é Escape (para limpar o display)
       if (key === 'Escape') {
           clearDisplay();
       }
   
       // Verifica se a tecla é % (Shift + 5)
       if (key === '%') {
           calculatePercentage();
       }
   
       // Verifica se a tecla é √ (Alt + V)
       if (key === 'v' && event.altKey) {
           calculateSquareRoot();
       }
   
       // Verifica se a tecla é ponto (.)
       if (key === '.') {
           appendNumber('.');
       }
   });
   