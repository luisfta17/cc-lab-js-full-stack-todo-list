const request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const TodoList = function (url) {
  this.url = url
}

TodoList.prototype.bindEvents = function() {
  PubSub.subscribe('NewTodo:todo-submitted', (event) => {
    this.handleSubmit(event.detail)
  })
}

TodoList.prototype.getData = function () {
  request.get(this.url, (err, todos) => {
    PubSub.publish('TodoList:data-loaded', todos);
  })
};

TodoList.prototype.handleSubmit = function(todo) {
  console.log({todo})
}

module.exports = TodoList;
