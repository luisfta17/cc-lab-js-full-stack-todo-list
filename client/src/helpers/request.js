const debug = true

function request(url, callback) {
  if (debug) {console.log('<request>', {url})}

  fetch(url)
    .then(res => res.json())
    .then(json => callback(null, json))
    .catch(error => callback(error, null))
}

module.exports = request
