const request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const TodoList = function (url) {
  this.url = url
}

TodoList.prototype.bindEvents = function() {
  PubSub.subscribe('NewTodo:todo-submitted', (event) => {
    this.handleSubmit(event.detail)
  })

  PubSub.subscribe('TodoList:delete-todo', (event) => {
    this.handleDelete(event.detail)
  })

  PubSub.subscribe('TodoList:update-todo', (event) => {
    const {id, todo} = event.detail
    this.handleUpdate(id, todo)
  })
}

TodoList.prototype.getData = function () {
  request.get(this.url, (err, todos) => {
    PubSub.publish('TodoList:data-loaded', todos);
  })
};

TodoList.prototype.handleSubmit = function(todo) {
  request.post(this.url, todo, (err, todos) => {
    PubSub.publish('TodoList:data-loaded', todos);
  })
}

TodoList.prototype.handleDelete = function(id) {
  request.delete(this.url, id, (err, todos) => {
    PubSub.publish('TodoList:data-loaded', todos);
  })
}

TodoList.prototype.handleUpdate = function(id, todo) {
  request.put(this.url, id, todo, (err, todos) => {
    PubSub.publish('TodoList:data-loaded', todos);
  })
}




module.exports = TodoList;
