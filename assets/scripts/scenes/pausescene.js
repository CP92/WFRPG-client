import phaser from 'phaser';

const auth = require('./../auth/events')
let actionKey;
 
export default class PauseScene extends phaser.Scene {
  constructor () {
    super('Pause');
  }
 
  preload () {
  	
  }
 
  create () {
    

    let uiPanel = this.add.image(400, 300, 'uiPanel')
    uiPanel.setScale(4)
    let xButton = this.add.sprite(uiPanel.x - 170, uiPanel.y - 170, 'brwnX').setTint(0xff0000).setInteractive()
    let logOutButton = this.add.sprite(uiPanel.x - 170, uiPanel.y - 100, 'greyBtn').setInteractive()
    let deleteSaveButton = this.add.sprite(uiPanel.x - 170, uiPanel.y, 'brownBtn').setTint(0xff0000).setInteractive()

    let logOutText = this.add.text(logOutButton.x + 20, logOutButton.y - 10, 'Log Out')
    let deleteSaveText = this.add.text(deleteSaveButton.x + 20, deleteSaveButton.y - 10, 'Delete current save')

    // Set on click event
    xButton.on('pointerdown', function (pointer) {
      this.scene.switch('Game')
      //this.scene.stop()
    }, this)

    logOutButton.on('pointerdown', function (pointer) {
      //this.canvas.remove()
      window.game.destroy(false)
      //window.game = null
    }, this)

    deleteSaveButton.on('pointerdown', function (pointer) {
      auth.onDeleteSave()
    }, this)

  }

  update () {
    
  }
};