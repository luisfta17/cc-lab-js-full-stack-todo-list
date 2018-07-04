const TodoListModel = require('./models/todo_list');
const TodoList = require('./views/todo_list_view')

document.addEventListener('DOMContentLoaded', () => {
  const newTodo = document.querySelector('#new-todo');
  const todoList = document.querySelector('#todos');

  const todoListModel = new TodoListModel('http://localhost:3000/api/todo')
  todoListModel.getData()

  const todoListView = new TodoList(todoList);
  todoListView.bindEvents();

})
