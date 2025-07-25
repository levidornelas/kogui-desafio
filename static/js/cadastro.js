document.getElementById("cadastro-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const msgSucesso = document.getElementById('msg-success');
  const msgErro = document.getElementById('msg-error');

  // Limpar mensagens anteriores
  msgSucesso.classList.add('d-none');
  msgErro.classList.add('d-none');
  msgSucesso.textContent = '';
  msgErro.textContent = '';

  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const response = await fetch("/api/auth/cadastro/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": window.csrftoken
      },
      body: JSON.stringify({ username, email, password }),
      credentials: "include"
    });

    const data = await response.json();

    if (response.ok) {
      msgSucesso.textContent = data.message || 'Cadastro realizado com sucesso!';
      msgSucesso.classList.remove('d-none');
      e.target.reset();
      setTimeout(() => {
        window.location.href = "/"
      }, 1500);
    } else {
      msgErro.textContent = data.message || data.detail || 'Erro ao realizar cadastro';
      msgErro.classList.remove('d-none');
    }
  } catch (error) {
    msgErro.textContent = 'Erro de conexão. Tente novamente.';
    msgErro.classList.remove('d-none');
  }
});