const request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const TodoList = function (url) {
  this.url = url
}

TodoList.prototype.getData = function () {
  request.get(this.url, (error, todos) => {
    PubSub.publish('TodoList:data-loaded', todos);
  })
};

module.exports = TodoList;