const request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const TodoList = function (url) {
  this.url = url
}

TodoList.prototype.getData = function () {
  request.get(this.url, (todos) => {
      PubSub.publish('Sightings:data-loaded', todos);
    })
};
