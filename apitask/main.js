// main.js
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', event => {
      event.preventDefault();
      loginForm.classList.add('was-validated');
      if (!loginForm.checkValidity()) return;
      const user = document.getElementById('username').value.trim();
      const pass = document.getElementById('password').value;
      // For demo: any non‑empty credentials accepted
      if (user && pass) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'landing.html';
      }
    });
  }

  // On landing: check auth and fetch todos
  if (window.location.pathname.endsWith('landing.html')) {
    if (localStorage.getItem('loggedIn') !== 'true') {
      window.location.href = 'index.html';
      return;
    }
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10'
)
      .then(res => res.json())
      .then(todos => {
        const ul = document.getElementById('todoList');
        todos.forEach(todo => {
          const li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          li.textContent = todo.title;
          const badge = document.createElement('span');
          badge.className = todo.id? 'badge bg-success' : 'badge bg-warning';
          badge.textContent = todo.title ? 'Done' : 'Pending';
          li.appendChild(badge);
          ul.appendChild(li);
        });
      })
      .catch(err => {
        console.error('Error fetching todos', err);
        alert('Failed to load todos');
      });
  }
  
});
