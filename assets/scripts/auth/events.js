const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const save = require('./../game/save')

const onSignUp = function (event) {
  event.preventDefault()
  $(event.target).collapse('toggle')
  const credentials = getFormFields(event.target)
  api.signUp(credentials)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  $(event.target).collapse('toggle')
  const credentials = getFormFields(event.target)
  api.signIn(credentials)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  $(event.target).collapse('toggle')
  const credentials = getFormFields(event.target)
  api.changePassword(credentials)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onDeleteSave = function () {
  event.preventDefault()
  save.setDeleteSave()
    .then(ui.deleteSuccess)
    .catch()
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onDeleteSave
}
