let currentInput = '0';
let previousInput = '';
let operator = '';
let waitingForNewNumber = false;

// Carregar histórico ao inicializar a página
document.addEventListener('DOMContentLoaded', function () {
  loadHistory();
});

function updateDisplay() {
  document.getElementById('display').textContent = currentInput;
}

function addNumber(num) {
  if (waitingForNewNumber) {
    currentInput = num;
    waitingForNewNumber = false;
  } else {
    currentInput = currentInput === '0' ? num : currentInput + num;
  }
  updateDisplay();
}

function addDecimal() {
  if (waitingForNewNumber) {
    currentInput = '0.';
    waitingForNewNumber = false;
  } else if (currentInput.indexOf('.') === -1) {
    currentInput += '.';
  }
  updateDisplay();
}

function addOperator(op) {
  if (operator && !waitingForNewNumber) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  waitingForNewNumber = true;
}

async function calculate() {
  if (operator && previousInput && !waitingForNewNumber) {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = current !== 0 ? prev / current : 'Erro';
        break;
      default:
        return;
    }

    if (result !== 'Erro') {
      // Salvar no banco de dados via API
      await saveToDatabase(prev, operator, current, result);

      // Recarregar histórico
      loadHistory();
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    waitingForNewNumber = true;
    updateDisplay();
  }
}

async function saveToDatabase(num1, op, num2, resultado) {
  try {
    const parametros = `${num1} ${op} ${num2}`;

    const response = await fetch('/api/operacoes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify({
        parametros: parametros,
        resultado: resultado.toString(),
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao salvar operação:', errorData);
    }
  } catch (error) {
    console.error('Erro de conexão ao salvar operação:', error);
  }
}

async function loadHistory() {
  try {
    const response = await fetch('/api/operacoes/');
    if (response.ok) {
      const operacoes = await response.json();
      renderHistory(operacoes);
    }
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
  }
}

function renderHistory(operacoes) {
  const historyDiv = document.getElementById('history');
  historyDiv.innerHTML = '';

  // Mostrar apenas os últimos 10 itens
  const recentOperacoes = operacoes.slice(-10).reverse();

  recentOperacoes.forEach(operacao => {
    const historyItem = document.createElement('div');
    historyItem.className = 'mb-3';

    const dataOperacao = new Date(operacao.data_inclusao);
    const time = dataOperacao.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });

    historyItem.innerHTML = `
                    <div class="text-white-50 small">${operacao.parametros}</div>
                    <div class="text-white">= ${operacao.resultado}</div>
                    <div class="text-white small">${time}</div>
                `;

    historyDiv.appendChild(historyItem);
  });
}

function clearAll() {
  currentInput = '0';
  previousInput = '';
  operator = '';
  waitingForNewNumber = false;
  updateDisplay();
}

function toggleSign() {
  if (currentInput !== '0') {
    currentInput = currentInput.charAt(0) === '-' ?
      currentInput.slice(1) : '-' + currentInput;
    updateDisplay();
  }
}

function percentage() {
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}

async function clearHistory() {
  await fetch('/api/operacoes/deletar_todas/', {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': getCookie('csrftoken')
    },
  });

  document.getElementById('history').innerHTML = '';
}

function getCookie(nome) {
  let valorCookie = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, nome.length + 1) === (nome + '=')) {
        valorCookie = decodeURIComponent(cookie.substring(nome.length + 1));
        break;
      }
    }
  }
  return valorCookie;
}