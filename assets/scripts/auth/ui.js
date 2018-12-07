const store = require('../store.js')
const gameIndex = require('./../game/gameindex')
const gameScene = require('./../scenes/gamescene')

const signUpSuccess = function (response) {
  $('#display-message').html('').hide()
  $('#sign-up-form').trigger('reset')
  $('#sign-up-form').collapse()
  $('#display-message').text(`Success! Sign in with new credentials.`).fadeToggle().delay(2000).fadeToggle()
  $('#display-message').css('color', 'green')
  
}

const signUpFailure = function () {
  $('#display-message').html('').hide()
  $('#display-message').html('That username is taken. Please try another').fadeToggle().delay(1000).fadeToggle()
  $('#display-message').css('color', 'red')
  $('#sign-up-form').trigger('reset')
 
}

const signInSuccess = function (response) {
  store.user = response.user
  $('#sign-up-form').collapse('hide')
  $('#change-password-button, #sign-out-button, #dashboard, .dashbutton, #owner-surveys, #delete-save-button').removeClass('hidden')
  $('#sign-up-button, #sign-in-button').addClass('hidden')
  $('#display-message').html('').hide()
  $('#sign-in-form').trigger('reset')
  $('#display-message').css('color', 'green')
  $('#display-message').text(`Welcome, ${store.user.email}`).fadeToggle().delay(2000).fadeToggle()
  $('#content').removeClass('hidden')
  gameIndex.start()
}

const signInFailure = function (response) {
  $('#display-message').html('').hide()
  $('#display-message').text('Incorrect username/password. Sign up to create a new user.').fadeToggle().delay(2000).fadeToggle()
  $('#display-message').css('color', 'red')
  $('#sign-in-form').trigger('reset')
}

const changePasswordSuccess = function (response) {
  $('#display-message').html('').hide()
  $('#change-password-form').trigger('reset')
  $('#display-message').text(`Successfully changed password!`).fadeToggle().delay(2000).fadeToggle()
  $('#display-message').css('color', 'green')
}

const changePasswordFailure = function () {
  $('#display-message').html('').hide()
  $('#display-message').text('Something went wrong, please try again').fadeToggle().delay(2000).fadeToggle()
  $('#display-message').css('color', 'red')
  $('#change-password-form').trigger('reset')
}

const signOutSuccess = function () {
  store.user = null
  store.playerData.players = null
  $('#change-password-button, #sign-out-button, #dashboard, .dashbutton, #owner-surveys, #delete-save-button').addClass('hidden')
  $('#sign-up-button, #sign-in-button').removeClass('hidden')
  $('#sign-up-form, #change-password-form, #delete-save-drop-button').collapse('hide')
  $('#display-message').html('').hide()
  $('#sign-up-form, #sign-in-form, #change-password-form').trigger('reset')
  $('#display-message').text(`You have signed out`).fadeToggle().delay(2000).fadeToggle()
  $('#display-message').css('color', 'green')
  $('#create-survey-form, #view-surveys-btn, #dashboard-btn').addClass('hidden')
  $('#add-survey-form').trigger('reset')
  //$('#content').addClass('hidden')
  //$('#content').html('')
  //gameIndex.end()
}

const signOutFailure = function () {
  $('#display-message').removeClass('hidden')
  $('#display-message').html('Something went wrong')
  $('#display-message').css('color', 'red')
}

const deleteSuccess = function () {
  $('#display-message').html('').hide()
  $('#display-message').css('color', 'green')
  $('#display-message').text(`DELETED!`).fadeToggle().delay(2000).fadeToggle()
  gameIndex.start()

}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  deleteSuccess
}
