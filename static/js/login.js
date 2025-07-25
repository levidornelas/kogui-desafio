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
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      window.location.href = "/calculadora/";
    } else {
      const res = await response.json();
      msg.textContent = res.detail || 'Falha no login';
      msg.classList.remove('d-none');
    }
  } catch (err) {
    msg.textContent = 'Erro de conexão.';
    msg.classList.remove('d-none');
  }
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}