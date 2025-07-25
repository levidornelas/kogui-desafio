const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.classList.add('d-none');
  msg.textContent = '';

  const data = {
    username: form.username.value,
    password: form.password.value,
  };

  try {
    const response = await fetch('/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': window.csrftoken
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      window.location.href = "/calculadora/";
    } else {
      const data = await response.json();
      msg.textContent = data.detail || 'Falha no login';
      msg.classList.remove('d-none');
    }
  } catch (err) {
    msg.textContent = 'Erro de conexão.';
    msg.classList.remove('d-none');
  }
});

