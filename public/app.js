document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
  
    document.getElementById('todoInput').addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        addTodo();
      }
    });
  });
  
  function fetchTodos() {
    fetch('http://localhost:3000/todos')
      .then(response => response.json())
      .then(todos => displayTodos(todos))
      .catch(error => console.error('Error fetching todos:', error));
  }
  
  function displayTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.title;
      todoList.appendChild(li);
    });
  }
  
  function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const title = todoInput.value.trim();
  
    if (title !== '') {
      fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      })
        .then(response => response.json())
        .then(newTodo => {
          todoInput.value = '';
          fetchTodos();
        })
        .catch(error => console.error('Error adding todo:', error));
    }
  }