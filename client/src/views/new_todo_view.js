const PubSub = require('../helpers/pub_sub')

const NewTodo = function(form) {
  this.form = form
}

NewTodo.prototype.bindEvents = function() {
  this.form.addEventListener('submit', (event) => {
    event.preventDefault()
    const form = event.target
    this.handleSubmit(form)
  })
}

NewTodo.prototype.handleSubmit = function(form) {
  const text = form.text.value
  const done = form.done.checked
  PubSub.publish('NewTodo:todo-submitted', {text, done})
  form.reset()
}

module.exports = NewTodo