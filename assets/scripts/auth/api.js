const config = require('../config.js')
const store = require('../store.js')

const signUp = function (credentials) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: credentials
  })
}

const signIn = function (credentials) {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: credentials
  })
}

const changePassword = function (passwords) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'PATCH',
    data: passwords
  })
}

const signOut = function () {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'DELETE'
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
