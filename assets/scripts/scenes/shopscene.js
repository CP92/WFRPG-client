import phaser from 'phaser';

const auth = require('../auth/events')
let actionKey;
 let miningLvlCost;
    let strLvlCost;
    let foodText
    let strLvlText
    let miningLvlText
    let ourGame
 
export default class ShopScene extends phaser.Scene {
  constructor () {
    super('Shop');
  }
 
  preload () {
  	
  }
 
  create () {
    
    ourGame = this.scene.get('Game');

    //console.log(ourGame)

    let uiPanel = this.add.image(400, 300, 'uiPanel')
    uiPanel.setScale(5)
    let xButton = this.add.sprite(uiPanel.x - 210, uiPanel.y - 220, 'brwnX').setTint(0xff0000).setInteractive()
    let foodButton = this.add.sprite(uiPanel.x - 210, uiPanel.y - 100, 'greyBtn').setInteractive()
    let strLvlButton = this.add.sprite(uiPanel.x - 210, foodButton.y + 50, 'brownBtn').setTint(0xff0000).setInteractive()
    let miningLvlButton = this.add.sprite(uiPanel.x - 210, strLvlButton.y + 50, 'brownBtn').setTint(0xff0000).setInteractive()


     foodText = this.add.text(foodButton.x + 30, foodButton.y - 10, 'Buy food, it heals you. Cost: 5 Gold').setColor('red')
    //let foodCostText = this.add.text(foodText.x + 200, foodText.y, 'Cost: 5 Gold')
    strLvlText = this.add.text(strLvlButton.x + 30, strLvlButton.y - 10, `Raise you Strength level. cost: ${strLvlCost} Gold`).setColor('red')
    //let strLvlCostText = this.add.text(strLvlText.x + 200, strLvlText.y, `cost: ${ourGame.player.data.values.strLvl} Gold`)
    miningLvlText = this.add.text(miningLvlButton.x + 30, miningLvlButton.y - 10, `Raise you Mining level. cost: ${miningLvlCost} Gold`).setColor('red')
    //let miningLvlCostText = this.add.text(miningLvlText.x + 200, miningLvlText.y - 10, `cost: ${(ourGame.player.data.values.miningLvl)} Gold`)

    // Set on click event
    xButton.on('pointerdown', function (pointer) {
      //ourGame = null
      this.scene.switch('Game')
      //this.scene.stop()
    }, this)

    foodButton.on('pointerdown', function (pointer) {
      if (ourGame.player.data.values.inventory.gold >= 5 ) {
        //console.log(ourGame.player.data.values.inventory.food)
        ourGame.player.data.values.inventory.food += 1
        //console.log(ourGame.player.data.values.inventory.food)
        ourGame.player.data.values.inventory.gold -= 5
        this.events.emit('addFood')
        this.events.emit('addGold', ourGame.player.data.values.inventory)
      } else {

      }
    }, this)

    strLvlButton.on('pointerdown', function (pointer) {
      if (ourGame.player.data.values.inventory.gold >= (ourGame.player.data.values.strLvl * 5)) {
        ourGame.player.data.values.strLvl += 1
        ourGame.player.data.values.inventory.gold -= (ourGame.player.data.values.strLvl * 5)
        //console.log(ourGame.player.data.values.strLvl)
        this.events.emit('addGold', ourGame.player.data.values.inventory)
      }
    }, this)

    miningLvlButton.on('pointerdown', function (pointer) {
      if (ourGame.player.data.values.inventory.gold >= (ourGame.player.data.values.miningLvl * 5)) {
        ourGame.player.data.values.miningLvl += 1
        ourGame.player.data.values.inventory.gold -= (ourGame.player.data.values.miningLvl * 5)
        this.events.emit('addGold', ourGame.player.data.values.inventory)
      }
    }, this)

  }

  update () {
    miningLvlCost = (ourGame.player.data.values.miningLvl * 5)
    miningLvlText.setText(`Raise you Mining level. cost: ${miningLvlCost} Gold`)
    strLvlCost = (ourGame.player.data.values.strLvl * 5)
    strLvlText.setText(`Raise you Strength level. cost: ${strLvlCost} Gold`)
  }
};

