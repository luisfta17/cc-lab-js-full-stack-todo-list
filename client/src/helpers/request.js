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

function post(url, body, callback) {
  const options = {
    body: JSON.stringify(body),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }

  request(url, options, callback)
}

function deleteRequest(url, id, callback) {
  const options = {
    method: 'DELETE'
  }

  request(`${url}/${id}`, options, callback)
}

module.exports = {get, post, delete: deleteRequest}
