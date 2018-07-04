const PubSub = require('../helpers/pub_sub');

const TodoList = function(container){
  this.container = container
}

TodoList.prototype.bindEvents = function () {
  PubSub.subscribe('TodoList:data-loaded', (evt) => {
    this.render(evt.detail);
  })

};

TodoList.prototype.render = function (todos) {
  this.container.innerHTML = ''
  const ul = document.createElement('ul');

  for (const todo of todos) {
    const { _id, text, done } = todo
    const li = document.createElement('li');

    const checkbox = createCheckbox(_id, done)
    li.appendChild(checkbox)

    const textField = createTextField(_id, text)
    li.appendChild(textField)

    const button = createDeleteButton(_id)
    li.appendChild(button);

    ul.appendChild(li);
  }
  this.container.appendChild(ul);
};

function createCheckbox(id, done) {
  const checkbox = document.createElement('input')
  checkbox.type = "checkbox"
  checkbox.checked = done

  checkbox.addEventListener('change', (evt) => {
    const todo = {done:evt.target.checked}
    PubSub.publish('TodoList:update-todo', {id, todo})
  })

  return checkbox
}

function createTextField(id, text) {
  const textField = document.createElement('input')
  textField.value = text;
  textField.className = "text-field"

  textField.addEventListener('change', (evt) => {
    const todo = {text:evt.target.value}
    PubSub.publish('TodoList:update-todo', {id, todo})
  })

  return textField
}

function createDeleteButton(id) {
  const button = document.createElement('button');
  button.textContent = '🗑'
  button.className = "todo-delete"

  button.addEventListener('click', () => {
    PubSub.publish('TodoList:delete-todo', id)
  })

  return button
}

module.exports = TodoList;
