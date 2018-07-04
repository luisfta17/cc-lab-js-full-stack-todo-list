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

    const textSpan = document.createElement('span')
    textSpan.textContent = text;
    li.appendChild(textSpan)
    
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
    const done = evt.target.checked
    PubSub.publish('TodoList:update-done', {id, done})
  })

  return checkbox
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
