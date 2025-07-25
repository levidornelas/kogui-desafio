document.getElementById("cadastro-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const msgSuccess = document.getElementById('msg-success');
  const msgError = document.getElementById('msg-error');

  // Limpar mensagens anteriores
  msgSuccess.classList.add('d-none');
  msgError.classList.add('d-none');
  msgSuccess.textContent = '';
  msgError.textContent = '';

  const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const response = await fetch("/api/auth/cadastro/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf
      },
      body: JSON.stringify({ username, email, password }),
      credentials: "include"
    });

    const data = await response.json();

    if (response.ok) {
      msgSuccess.textContent = data.message || 'Cadastro realizado com sucesso!';
      msgSuccess.classList.remove('d-none');
      e.target.reset();
      setTimeout(() => {
        window.location.href = "/"
      }, 1500);
    } else {
      msgError.textContent = data.message || data.detail || 'Erro ao realizar cadastro';
      msgError.classList.remove('d-none');
    }
  } catch (error) {
    msgError.textContent = 'Erro de conexão. Tente novamente.';
    msgError.classList.remove('d-none');
  }
});