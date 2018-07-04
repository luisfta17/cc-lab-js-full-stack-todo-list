const debug = true

function request(url, options, callback) {
  if (debug) {console.log('<request>', {url})}

  fetch(url, options)
    .then(res => res.json())
    .then(json => callback(null, json))
    .catch(error => callback(error, null))
}

function get(url, callback) {
  request(url, {}, callback)
}

module.exports = {get}
