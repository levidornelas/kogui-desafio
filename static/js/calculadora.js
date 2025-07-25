let inputAtual = '0';
let inputAnterior = '';
let operador = '';
let aguardandoNovoNumero = false;

// Carregar histórico ao inicializar a página
document.addEventListener('DOMContentLoaded', function () {
  carregarHistorico();
});

function atualizarDisplay() {
  document.getElementById('display').textContent = inputAtual;
}

function adicionarNumero(num) {
  if (aguardandoNovoNumero) {
    inputAtual = num;
    aguardandoNovoNumero = false;
  } else {
    inputAtual = inputAtual === '0' ? num : inputAtual + num;
  }
  atualizarDisplay();
}

function adicionarDecimal() {
  if (aguardandoNovoNumero) {
    inputAtual = '0.';
    aguardandoNovoNumero = false;
  } else if (inputAtual.indexOf('.') === -1) {
    inputAtual += '.';
  }
  atualizarDisplay();
}

function adicionarOperador(op) {
  if (operador && !aguardandoNovoNumero) {
    calcular();
  }
  inputAnterior = inputAtual;
  operador = op;
  aguardandoNovoNumero = true;
}

async function calcular() {
  if (operador && inputAnterior && !aguardandoNovoNumero) {
    const anterior = parseFloat(inputAnterior);
    const atual = parseFloat(inputAtual);
    let resultado;

    switch (operador) {
      case '+':
        resultado = anterior + atual;
        break;
      case '-':
        resultado = anterior - atual;
        break;
      case '×':
        resultado = anterior * atual;
        break;
      case '÷':
        resultado = atual !== 0 ? anterior / atual : 'Erro';
        break;
      default:
        return;
    }

    if (resultado !== 'Erro') {
      // Salvar no banco de dados via API
      await salvarNoBanco(anterior, operador, atual, resultado);

      // Recarregar histórico
      carregarHistorico();
    }

    inputAtual = resultado.toString();
    operador = '';
    inputAnterior = '';
    aguardandoNovoNumero = true;
    atualizarDisplay();
  }
}

async function salvarNoBanco(num1, op, num2, resultado) {
  try {
    const parametros = `${num1} ${op} ${num2}`;

    const response = await fetch('/api/operacoes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': window.csrftoken
      },
      body: JSON.stringify({
        parametros: parametros,
        resultado: resultado.toString(),
      })
    });

    if (!response.ok) {
      const dadosErro = await response.json();
      console.error('Erro ao salvar operação:', dadosErro);
    }
  } catch (erro) {
    console.error('Erro de conexão ao salvar operação:', erro);
  }
}

async function carregarHistorico() {
  try {
    const response = await fetch('/api/operacoes/');
    if (response.ok) {
      const operacoes = await response.json();
      renderizarHistorico(operacoes);
    }
  } catch (erro) {
    console.error('Erro ao carregar histórico:', erro);
  }
}

function renderizarHistorico(operacoes) {
  const divHistorico = document.getElementById('history');
  divHistorico.innerHTML = '';

  // Mostrar apenas os últimos 10 itens
  const operacoesRecentes = operacoes.slice(-10).reverse();

  operacoesRecentes.forEach(operacao => {
    const itemHistorico = document.createElement('div');
    itemHistorico.className = 'mb-3';

    const dataOperacao = new Date(operacao.data_inclusao);
    const horario = dataOperacao.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });

    itemHistorico.innerHTML = `
                    <div class="text-white-50 small">${operacao.parametros}</div>
                    <div class="text-white">= ${operacao.resultado}</div>
                    <div class="text-white small">${horario}</div>
                `;

    divHistorico.appendChild(itemHistorico);
  });
}

function limparTudo() {
  inputAtual = '0';
  inputAnterior = '';
  operador = '';
  aguardandoNovoNumero = false;
  atualizarDisplay();
}

async function limparHistorico() {
  await fetch('/api/operacoes/deletar_todas/', {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': window.csrftoken
    },
  });

  document.getElementById('history').innerHTML = '';
}