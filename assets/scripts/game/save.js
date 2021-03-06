const config = require('../config.js')
const store = require('../store.js')

const getSave = function () {
  return $.ajax({
    url: config.apiUrl + '/players',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'GET'
  })
}

const setNewSave = function (bow, pickaxe, sword, x, y, gold, hp, str, mining, food) {
  return $.ajax({
    url: config.apiUrl + '/players',
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'POST',
    data: {
      player: {
        bow: bow,
        pickaxe: pickaxe,
        sword: sword,
        x: x,
        y: y,
        gold: gold,
        hp: hp,
        strLvl: str,
        miningLvl: mining,
        food: food
      }
    }
  })
}

const setUpdateSave = function (id, bow, pickaxe, sword, x, y, gold, hp, str, mining, food) {
  return $.ajax({
    url: config.apiUrl + `/players/${id}`,
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'PATCH',
    data: {
      player: {
        bow: bow,
        pickaxe: pickaxe,
        sword: sword,
        x: x,
        y: y,
        gold: gold,
        hp: hp,
        strLvl: str,
        miningLvl: mining,
        food: food
    }
  }
  })
}

const setDeleteSave = function () {
  return $.ajax({
    url: config.apiUrl + `/players/${store.playerData._id}`,
    headers: {
      Authorization: `Token token=${store.user.token}`
    },
    method: 'DELETE'
  })
}

module.exports = {
	getSave,
  setUpdateSave,
  setNewSave,
  setDeleteSave

}