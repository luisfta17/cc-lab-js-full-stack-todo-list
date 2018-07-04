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

  PubSub.subscribe('TodoList:update-done', (event) => {
    const {id, done} = event.detail
    this.handleUpdateDone(id, done)
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

TodoList.prototype.handleUpdateDone = function(id, done) {
  request.put(this.url, id, {done}, (err, todos) => {
    PubSub.publish('TodoList:data-loaded', todos);
  })
}




module.exports = TodoList;
