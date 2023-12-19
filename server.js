const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let todos = [];

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { title } = req.body;
  const newTodo = { id: todos.length + 1, title };
  todos.push(newTodo);
  res.json(newTodo);
});

// Catch-all route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});