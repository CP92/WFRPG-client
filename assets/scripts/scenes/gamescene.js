import phaser from 'phaser'
// import config from './../config/config'
const saver = require('./../game/save')
const store = require('./../store')
// const auth = require('./../auth/events')

let player
let actionKey
let openBowChest
let spriteBowChest
let openSwordChest
let spriteSwordChest
let swordChestObject
let spritePickaxeChest
let bowChestObject
let pickaxeChestObject
let saveTimeEvent
let goldRock1Object
let goldRock2Object
let goldRock3Object
let goldRock4Object
let goldRock5Object
let goldRock6Object
let goldRock1
let goldRock2
let goldRock3
let goldRock4
let goldRock5
let goldRock6
let goldRock1RespawnTimer
let goldRock2RespawnTimer
let goldRock3RespawnTimer
let goldRock4RespawnTimer
let goldRock5RespawnTimer
let goldRock6RespawnTimer
let saveText
let rockGroup
let goldStack
let skellies;
let waitMineTime = 0
const showDebug = false

export default class GameScene extends phaser.Scene {
  constructor () {
    super('Game')
    // this.saveText;
  }

  end () {
    this.sys.game.destroy(true)
  }

  preload () {
    // load images
    // this.load.image('logo', 'assets/logo.png');

  }

  create () {
    // this.add.image(400, 300, 'logo');
    const map = this.make.tilemap({ key: 'map' })

    const tileset = map.addTilesetImage('WFRPG_center', 'tiles')
    // const chestset = map.addTilesetImage('Chest', 'chests')

    const belowLayer = map.createStaticLayer('Bottom', tileset, 0, 0)
    const worldLayer = map.createStaticLayer('World', tileset, 0, 0)
    // const chestLayer = map.createStaticLayer('Chest', chestset, 0, 1)
    // set collisions to true and watch the player for collisions
    worldLayer.setCollisionByProperty({ collides: true })
    // chestLayer.setCollisionByProperty({ collides: true })

    const aboveLayer = map.createStaticLayer('Top', tileset, 0, 0)

    // goldStack = this.add.sprite(2, 2, 'golds', 0)

    // aboveLayer.setDepth(10);
    console.log(store.playerData)
    // Get chest objects from map
    this.swordChestObject = map.findObject('Objects', obj => obj.name === 'Sword Chest')
    this.bowChestObject = map.findObject('Objects', obj => obj.name === 'Bow Chest')
    this.pickaxeChestObject = map.findObject('Objects', obj => obj.name === 'Pickaxe Chest')
    // Get gold rock objects from map
    this.goldRock1Object = map.findObject('Objects', obj => obj.name === 'Gold Rock 1')
    this.goldRock2Object = map.findObject('Objects', obj => obj.name === 'Gold Rock 2')
    this.goldRock3Object = map.findObject('Objects', obj => obj.name === 'Gold Rock 3')
    this.goldRock4Object = map.findObject('Objects', obj => obj.name === 'Gold Rock 4')
    this.goldRock5Object = map.findObject('Objects', obj => obj.name === 'Gold Rock 5')
    this.goldRock6Object = map.findObject('Objects', obj => obj.name === 'Gold Rock 6')
    this.goldRock1Object.data = {
      damage: getRandomMaxDamage(),
      destroyed: false
    }
    this.goldRock2Object.data = {
      damage: getRandomMaxDamage(),
      destroyed: false
    }
    this.goldRock3Object.data = {
      damage: getRandomMaxDamage(),
      destroyed: false
    }
    this.goldRock4Object.data = {
      damage: getRandomMaxDamage(),
      destroyed: false
    }
    this.goldRock5Object.data = {
      damage: getRandomMaxDamage(),
      destroyed: false
    }
    this.goldRock6Object.data = {
      damage: getRandomMaxDamage(),
      destroyed: false
    }
    // Default spawn point
    const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn Point')
    const skellySpawn = map.findObject('Objects', obj => obj.name === 'Skelly Spawn')
    // Load save data if exists
    if (store.playerData) {
      console.log(store.playerData.players._id)
      // Check if player has the sword and set the chest to opened if it does
      this.swordChestObject.data = {
        state: {
          opened: store.playerData.players.sword
        }
      }
      if (this.swordChestObject.data.state.opened) {
        spriteSwordChest = this.physics.add.sprite(this.swordChestObject.x, this.swordChestObject.y, 'chests', 1)
      } else {
        spriteSwordChest = this.physics.add.sprite(this.swordChestObject.x, this.swordChestObject.y, 'chests', 0)
      }
      // Check if player has the bow and set the chest to opened if it does
      this.bowChestObject.data = {
        state: {
          opened: store.playerData.players.bow
        }
      }
      if (this.bowChestObject.data.state.opened) {
        spriteBowChest = this.physics.add.sprite(this.bowChestObject.x, this.bowChestObject.y, 'chests', 1)
      } else {
        spriteBowChest = this.physics.add.sprite(this.bowChestObject.x, this.bowChestObject.y, 'chests', 0)
      }
      // Check if player has the bow and set the chest to opened if it does
      this.pickaxeChestObject.data = {
        state: {
          opened: store.playerData.players.pickaxe
        }
      }
      if (this.pickaxeChestObject.data.state.opened) {
        spritePickaxeChest = this.physics.add.sprite(this.pickaxeChestObject.x, this.pickaxeChestObject.y, 'chests', 1)
      } else {
        spritePickaxeChest = this.physics.add.sprite(this.pickaxeChestObject.x, this.pickaxeChestObject.y, 'chests', 0)
      }

      player = this.physics.add.sprite(store.playerData.players.x, store.playerData.players.y, 'atlas', 'misa-front').setSize(30, 40).setOffset(0, 24)
      player.setData({
        inventory: {
          bow: store.playerData.players.bow,
          sword: store.playerData.players.sword,
          pickaxe: store.playerData.players.pickaxe,
          gold: store.playerData.players.gold
        }
      })
      // Enemy groups
    } else {
    // if there is no save data, use default values

    // Chest objects
    // console.log(this.swordChestObject)
      this.swordChestObject.data = {
        state: {
          opened: false
        }
      }
      this.bowChestObject.data = {
        state: {
          opened: false
        }
      }
      this.pickaxeChestObject.data = {
        state: {
          opened: false
        }
      }
      // Add player sprite
      player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'atlas', 'misa-front').setSize(30, 40).setOffset(0, 24)
      player.setData({
        inventory: {
          bow: false,
          sword: false,
          pickaxe: false,
          gold: 0
        }
      })
     
      // Chest sprites
      spriteSwordChest = this.physics.add.sprite(this.swordChestObject.x, this.swordChestObject.y, 'chests', 0)
      spriteBowChest = this.physics.add.sprite(this.bowChestObject.x, this.bowChestObject.y, 'chests', 0)
      spritePickaxeChest = this.physics.add.sprite(this.pickaxeChestObject.x, this.pickaxeChestObject.y, 'chests', 0)
      saveGame()
      console.log(store.playerData)
    }
    goldRock1 = this.physics.add.sprite(this.goldRock1Object.x, this.goldRock1Object.y, 'rocks', 224).setTint(0xffd700)
    goldRock2 = this.physics.add.sprite(this.goldRock2Object.x, this.goldRock2Object.y, 'rocks', 224).setTint(0xffd700)
    goldRock3 = this.physics.add.sprite(this.goldRock3Object.x, this.goldRock3Object.y, 'rocks', 224).setTint(0xffd700)
    goldRock4 = this.physics.add.sprite(this.goldRock4Object.x, this.goldRock4Object.y, 'rocks', 224).setTint(0xffd700)
    goldRock5 = this.physics.add.sprite(this.goldRock5Object.x, this.goldRock5Object.y, 'rocks', 224).setTint(0xffd700)
    goldRock6 = this.physics.add.sprite(this.goldRock6Object.x, this.goldRock6Object.y, 'rocks', 224).setTint(0xffd700)

    //Enemy groups
     // Skelly gen group
      this.skellies = this.add.group({
        key: 'skellyAtlas',
        frame: 'skelly-idle.000',
        repeat: 4,
        setXY: {
          x: skellySpawn.x,
          y: skellySpawn.y,
          stepX: randomSkellySpawn(),
          stepY: randomSkellySpawn()
        }
      })

    // make them immovable
    spriteSwordChest.body.setImmovable(true)
    spriteBowChest.body.setImmovable(true)
    spritePickaxeChest.body.setImmovable(true)
    goldRock1.body.setImmovable(true)
    goldRock2.body.setImmovable(true)
    goldRock3.body.setImmovable(true)
    goldRock4.body.setImmovable(true)
    goldRock5.body.setImmovable(true)
    goldRock6.body.setImmovable(true)
    // set colliders
    this.physics.add.collider(player, worldLayer)
    this.physics.add.collider(player, spriteSwordChest)
    this.physics.add.collider(player, spriteBowChest)
    this.physics.add.collider(player, spritePickaxeChest)
    this.physics.add.collider(player, goldRock1)
    this.physics.add.collider(player, goldRock2)
    this.physics.add.collider(player, goldRock3)
    this.physics.add.collider(player, goldRock4)
    this.physics.add.collider(player, goldRock5)
    this.physics.add.collider(player, goldRock6)
    // Add rocks to group
    this.rockGroup = this.add.group()
    this.rockGroup.addMultiple([goldRock1, goldRock2, goldRock3, goldRock4, goldRock5, goldRock6])
    console.log(this.rockGroup.countActive())
    // this.physics.add.collider(player, chestLayer);
    // Player animations
    const anims = this.anims
    console.log(anims)
    anims.create({
      key: 'misa-left-walk',
      frames: anims.generateFrameNames('atlas', { prefix: 'misa-left-walk.', start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    anims.create({
      key: 'misa-right-walk',
      frames: anims.generateFrameNames('atlas', { prefix: 'misa-right-walk.', start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    anims.create({
      key: 'misa-front-walk',
      frames: anims.generateFrameNames('atlas', { prefix: 'misa-front-walk.', start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    anims.create({
      key: 'misa-back-walk',
      frames: anims.generateFrameNames('atlas', { prefix: 'misa-back-walk.', start: 0, end: 3, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    // SkellyAnimations
    //const skellyAnims = this.anims
    //console.log(skellyAnims)
    anims.create({
      key: 'skelly-idle',
      frames: anims.generateFrameNames('skellyAtlas', { prefix: 'skelly-idle.', start: 0, end: 9, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    anims.create({
      key: 'skelly-walk',
      frames: anims.generateFrameNames('skellyAtlas', { prefix: 'skelly-walk.', start: 0, end: 9, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    anims.create({
      key: 'skelly-attack',
      frames: anims.generateFrameNames('skellyAtlas', { prefix: 'skelly-attack.', start: 0, end: 9, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })
    anims.create({
      key: 'skelly-death',
      frames: anims.generateFrameNames('skellyAtlas', { prefix: 'skelly-death.', start: 0, end: 9, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    })

    // Camera controls for following the character
    const camera = this.cameras.main
    camera.startFollow(player)
    camera.setBounds(0, 0, map.widthInPixels,
      map.heightInPixels)

    // cursors = this.input.keyboard.createCursorKeys()

    actionKey = this.input.keyboard.addKeys('E,W,A,S,D,P')

    // Turn debugger on
    this.input.keyboard.once('keydown_K', event => {
      this.physics.world.createDebugGraphic()

      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20)
      worldLayer.renderDebug(graphics, {
        titleColor: null,
        collidingTileColor: new phaser.Display.Color(243, 134, 48, 255),
        faceColor: new phaser.Display.Color(40, 39, 37, 255)
      })
    })

    // saveText.setOrigin(0.5, 0.5)
    saveTimeEvent = this.time.addEvent({ delay: 30000, repeat: -1, callback: saveGame, callbackScope: this })

    function saveGame () {
      // console.log('save triggered')
      if (store.playerData) {
        saver.setUpdateSave(store.playerData.players._id, player.data.values.inventory.bow, player.data.values.inventory.pickaxe, player.data.values.inventory.sword, player.body.x, player.body.y, player.data.values.inventory.gold)
        // .then(response => console.log(response))
        console.log('Updated')
        // saveText.setText('Save updated!')
      } else {
        saver.setNewSave(player.data.values.inventory.bow, player.data.values.inventory.pickaxe, player.data.values.inventory.sword, player.body.x, player.body.y, player.data.values.inventory.gold)
          .then(response => console.log(response))
        console.log('New save')
        // saveText.setText('New save created!')
      }
    }

    // waitTimerEvent = this.time.addEvent({ delay: 1000, repeat: -1, callback: removeWaitTimer(this.goldRock1Object), callbackScope: this })

    // saveText = this.add.text(400, 300, 'Saved', { fontSize: '32px', fill: '#000000' });
    // saveText.setDepth(100)
  }

  update (time, delta) {
    const playerSpeed = 175
    const skellySpeed = 125
    const playerPrevVelocity = player.body.velocity.clone()

    // saveText.setText('works')

    // Stop any previous movement from the last frame
    player.body.setVelocity(0)

    if (phaser.Input.Keyboard.JustDown(actionKey.P)) {
      this.scene.switch('Pause')
      // this.scene.pause()
    }
    // Triggers rock respawn
    if (goldRock1RespawnTimer && (this.time.now > (goldRock1RespawnTimer + 30000))) {
      goldRock1.setTint(0xffd700)
      // console.log('respawn triggered')
      this.goldRock1Object.data = {
        damage: getRandomMaxDamage(),
        destroyed: false
      }

      goldRock1RespawnTimer = null
    }

    if (this.time.now > (goldRock2RespawnTimer + 30000)) {
      goldRock2.setTint(0xffd700)
      this.goldRock2Object.data = {
        damage: getRandomMaxDamage(),
        destroyed: false
      }
      goldRock2RespawnTimer = null
    }

    if (this.time.now > (goldRock3RespawnTimer + 30000)) {
      goldRock3.setTint(0xffd700)
      this.goldRock3Object.data = {
        damage: getRandomMaxDamage(),
        destroyed: false
      }
      goldRock3RespawnTimer = null
    }

    if (this.time.now > (goldRock4RespawnTimer + 30000)) {
      goldRock4.setTint(0xffd700)
      this.goldRock4Object.data = {
        damage: getRandomMaxDamage(),
        destroyed: false
      }
      goldRock4RespawnTimer = null
    }

    if (this.time.now > (goldRock5RespawnTimer + 30000)) {
      goldRock5.setTint(0xffd700)
      this.goldRock5Object.data = {
        damage: getRandomMaxDamage(),
        destroyed: false
      }
      goldRock5RespawnTimer = null
    }

    if (this.time.now > (goldRock6RespawnTimer + 30000)) {
      goldRock6.setTint(0xffd700)
      this.goldRock6Object.data = {
        damage: getRandomMaxDamage(),
        destroyed: false
      }
      goldRock6RespawnTimer = null
    }

    // Press E to open chests if in vicinity and in front of the chest
    if (actionKey.E.isDown) {
      // console.log(player.body.x)
      // console.log(player.body.y)
      // console.log(spriteSwordChest.body.x)
      // console.log(spriteSwordChest.body.y)
      // console.log(player)
      if ((Math.abs(player.body.x - spriteSwordChest.body.x) < 20) && ((player.body.y - spriteSwordChest.body.y) < 40)) {
        this.spriteSwordChest = this.physics.add.sprite(this.swordChestObject.x, this.swordChestObject.y, 'chests', 1)
        this.swordChestObject.data.state.opened = true
        player.data.values.inventory.sword = true
      }
      // console.log(player.body.y)
      // console.log(spriteSwordChest.body.y)
      if ((Math.abs(player.body.x - spriteBowChest.body.x) < 20) && ((player.body.y - spriteBowChest.body.y) < 40)) {
        this.spriteBowChest = this.physics.add.sprite(this.bowChestObject.x, this.bowChestObject.y, 'chests', 1)
        this.bowChestObject.data.state.opened = true
        player.data.values.inventory.bow = true
      }

      if ((Math.abs(player.body.x - spritePickaxeChest.body.x) < 20) && ((player.body.y - spritePickaxeChest.body.y) < 40)) {
        this.spritePickaxeChest = this.physics.add.sprite(this.pickaxeChestObject.x, this.pickaxeChestObject.y, 'chests', 1)
        this.pickaxeChestObject.data.state.opened = true
        player.data.values.inventory.pickaxe = true
      }
      // Check for rock 1
      if ((player.data.values.inventory.pickaxe && !this.goldRock1Object.data.destroyed && (this.time.now > (waitMineTime + 1000)) && (this.time.now > (waitMineTime + 1000))) && (Math.abs(player.body.x - goldRock1.body.x) < 40) && (Math.abs(player.body.y - goldRock1.body.y) < 50)) {
        // damages rocks
        this.goldRock1Object.data.damage -= 1
        // Starts the timer that forces the user to wait to mine a rock again
        waitMineTime = this.time.now
        // Checks damage and destroys the rock if 0 or less
        if (this.goldRock1Object.data.damage <= 0) {
          goldRock1.clearTint()
          this.goldRock1Object.data.destroyed = true
          goldRock1RespawnTimer = this.time.now
        }
        // Add gold to players inventory
        player.data.values.inventory.gold += getRandomGold()
        console.log(player.data.values.inventory.gold)
      }
      // Check for rock 2
      if ((player.data.values.inventory.pickaxe && !this.goldRock2Object.data.destroyed && (this.time.now > (waitMineTime + 1000))) && (Math.abs(player.body.x - goldRock2.body.x) < 40) && (Math.abs(player.body.y - goldRock2.body.y) < 50)) {
        this.goldRock2Object.data.damage -= 1
        waitMineTime = this.time.now
        if (this.goldRock2Object.data.damage <= 0) {
          goldRock2.clearTint()
          this.goldRock2Object.data.destroyed = true
          goldRock2RespawnTimer = this.time.now
        }
        player.data.values.inventory.gold += getRandomGold()
        console.log(player.data.values.inventory.gold)
      }
      // check for rock 3
      if ((player.data.values.inventory.pickaxe && !this.goldRock3Object.data.destroyed && (this.time.now > (waitMineTime + 1000))) && (Math.abs(player.body.x - goldRock3.body.x) < 40) && (Math.abs(player.body.y - goldRock3.body.y) < 50)) {
        this.goldRock3Object.data.damage -= 1
        waitMineTime = this.time.now
        if (this.goldRock3Object.data.damage <= 0) {
          goldRock3.clearTint()
          this.goldRock3Object.data.destroyed = true
          goldRock3RespawnTimer = this.time.now
        }
        player.data.values.inventory.gold += getRandomGold()
        console.log(player.data.values.inventory.gold)
      }
      // Check for rock 4
      if ((player.data.values.inventory.pickaxe && !this.goldRock4Object.data.destroyed && (this.time.now > (waitMineTime + 1000))) && (Math.abs(player.body.x - goldRock4.body.x) < 40) && (Math.abs(player.body.y - goldRock4.body.y) < 50)) {
        this.goldRock4Object.data.damage -= 1
        waitMineTime = this.time.now
        if (this.goldRock4Object.data.damage <= 0) {
          goldRock4.clearTint()
          this.goldRock4Object.data.destroyed = true
          goldRock4RespawnTimer = this.time.now
        }
        player.data.values.inventory.gold += getRandomGold()
        console.log(player.data.values.inventory.gold)
      }
      // Check for rock 5
      if ((player.data.values.inventory.pickaxe && !this.goldRock5Object.data.destroyed && (this.time.now > (waitMineTime + 1000))) && (Math.abs(player.body.x - goldRock5.body.x) < 40) && (Math.abs(player.body.y - goldRock5.body.y) < 50)) {
        this.goldRock5Object.data.damage -= 1
        waitMineTime = this.time.now
        if (this.goldRock5Object.data.damage <= 0) {
          goldRock5.clearTint()
          this.goldRock5Object.data.destroyed = true
          goldRock5RespawnTimer = this.time.now
        }
        player.data.values.inventory.gold += getRandomGold()
        console.log(player.data.values.inventory.gold)
      }
      // Check for rock 6
      if ((player.data.values.inventory.pickaxe && !this.goldRock6Object.data.destroyed && (this.time.now > (waitMineTime + 1000))) && (Math.abs(player.body.x - goldRock6.body.x) < 40) && (Math.abs(player.body.y - goldRock6.body.y) < 50)) {
        this.goldRock6Object.data.damage -= 1
        waitMineTime = this.time.now
        if (this.goldRock6Object.data.damage <= 0) {
          goldRock6.clearTint()
          this.goldRock6Object.data.destroyed = true
          goldRock6RespawnTimer = this.time.now
        }
        player.data.values.inventory.gold += getRandomGold()
        console.log(player.data.values.inventory.gold)
      }
    }

    // Horizontal movement
    if (actionKey.A.isDown) {
      player.body.setVelocityX(-playerSpeed)
    } else if (actionKey.D.isDown) {
      player.body.setVelocityX(playerSpeed)
    }

    // Vertical movement
    if (actionKey.W.isDown) {
      player.body.setVelocityY(-playerSpeed)
    } else if (actionKey.S.isDown) {
      player.body.setVelocityY(playerSpeed)
    }
    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(playerSpeed)
    // Update the animation last and give left/right animations precedence over up/down animations
    if (actionKey.A.isDown) {
      player.anims.play('misa-left-walk', true)
    } else if (actionKey.D.isDown) {
      player.anims.play('misa-right-walk', true)
    } else if (actionKey.W.isDown) {
      player.anims.play('misa-back-walk', true)
    } else if (actionKey.S.isDown) {
      player.anims.play('misa-front-walk', true)
    } else {
      player.anims.stop()
      // If we were moving, pick and idle frame to use
      if (playerPrevVelocity.x < 0) player.setTexture('atlas', 'misa-left')
      else if (playerPrevVelocity.x > 0) player.setTexture('atlas', 'misa-right')
      else if (playerPrevVelocity.y < 0) player.setTexture('atlas', 'misa-back')
      else if (playerPrevVelocity.y > 0) player.setTexture('atlas', 'misa-front')
    }

    let enemies = this.skellies.getChildren();
    let numEnemies = enemies.length;

    for (let i = 0; i < numEnemies; i++) {
      enemies[i].anims.play('skelly-idle', true)
    }

    if (player.data.values.inventory.pickaxe && !store.pickFrameSet) {
      this.events.emit('addPickIcon')
    }

    this.events.emit('addGold', player.data.values.inventory)
    // console.log(time)
    // console.log(saveTimeEvent.getProgress().toString())
  }
};

function removeWaitTimer (object) {
  console.log(object.data.wait)
  console.log('wait over')
  object.data.wait = false
  console.log(object)
}

function getRandomMaxDamage () {
  return Math.floor(Math.random() * Math.floor(10))
}

function getRandomGold () {
  return Math.floor(Math.random() * Math.floor(5))
}

function randomSkellySpawn () {
  return phaser.Math.RND.between(32, 128)
}
