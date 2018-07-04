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
    const { text, done } = todo
    const li = document.createElement('li');
    li.textContent = `${done?'✅':'☑️'} ${text}`;

    const button = document.createElement('button');
    button.textContent = '🗑'
    button.className = "todo-delete"
    button.value = todo._id;
    button.addEventListener('click', evt => {
      const id = evt.target.value;
      PubSub.publish('TodoList:delete-todo', id)
    })

    li.appendChild(button);
    ul.appendChild(li);
  }
  this.container.appendChild(ul);
};

module.exports = TodoList;
