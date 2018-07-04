const TodoListModel = require('./models/todo_list')

document.addEventListener('DOMContentLoaded', () => {
  const newTodo = document.querySelector('#new-todo');
  const todoList = document.querySelector('#todos');
  
  const todoListModel = new TodoListModel('http://localhost:3000/api/todo')
  todoListModel.getData()
})
