import phaser from 'phaser';

  const store = require('./../store')
  const saver = require('./../game/save')
  const tile = require('../../tilesets/hvvMHA-extruded.png')
	const tilemap = require('../../Tilemaps/WFRPG_center_map.json')
	const atlasImage = require('../../atlas/atlas.png')
	const atlasJson = require('../../atlas/atlas.json')
  const skellyAtlasImage = require('../../atlas/skelly.png')
  const skellyAtlasJson = require('../../atlas/skelly.json')
  const knifeAtlasImage = require('../../atlas/knifesheet.png')
  const knifeAtlasJson = require('../../atlas/knifesheet.json')
  const chest = require('../../tilesets/chest2.png')
  const uiPanel = require('../../images/UIpack_RPG/PNG/panel_beige.png')
  const brownX = require('../../images/UIpack_RPG/PNG/iconCross_brown.png')
  const greyButton = require('../../images/UIpack_RPG/PNG/buttonRound_grey.png')
  const brownButton = require('../../images/UIpack_RPG/PNG/buttonRound_brown.png')
  const whiteButton = require('../../images/UIpack_RPG/PNG/buttonLong_grey.png')
  const burger = require('../../images/UIpack_RPG/PNG/baconcheeseburger1.png')
  const goldSheet = require('../../tilesets/gold-stack-sheet.png')
  const tools = require('../../tilesets/IconsPJ - 24px.png')
  const heart = require('../../images/heart_full_16x16.png')


export default class PreloaderScene extends phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init () {
  this.readyCount = 0;
}
 
ready () {
  this.readyCount++;
  if (this.readyCount === 2) {
    this.scene.start('Game');
    this.scene.start('Ui')
  }
}
 
  preload () {
    // display logo
    this.add.image(400, 200, 'logo')

    // Get player data
    store.playerData = null
    //console.log(store.playerData)
    saver.getSave()
      .then((response) => {
        store.playerData = response.players
        //console.log(store.playerData)
      })

  	// display progress bar
  var progressBar = this.add.graphics();
  var progressBox = this.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(240, 270, 320, 50);
 
  var width = this.cameras.main.width;
  var height = this.cameras.main.height;
  var loadingText = this.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      fill: '#ffffff'
    }
  });
  loadingText.setOrigin(0.5, 0.5);
 
  var percentText = this.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  percentText.setOrigin(0.5, 0.5);
 
  var assetText = this.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  assetText.setOrigin(0.5, 0.5);
 
  // update progress bar
  this.load.on('progress', function (value) {
    percentText.setText(parseInt(value * 100) + '%');
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(250, 280, 300 * value, 30);
  });
 
  // update file progress text
  this.load.on('fileprogress', function (file) {
    assetText.setText('Loading asset: ' + file.key);
  });
 
  // remove progress bar when complete
  this.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
    assetText.destroy();
    this.ready()
  }.bind(this));

  this.timedEvent = this.time.delayedCall(3000, this.ready, [], this)
 
  		// load assets needed in our game
  		
  		this.load.image('tiles', tile);
      this.load.spritesheet('rocks', tile, { frameWidth: 32, frameHeight: 32, margin: 1, spacing: 2 })
    	this.load.tilemapTiledJSON('map', tilemap);

    	this.load.atlas('atlas', atlasImage, atlasJson)
      this.load.atlas('skellyAtlas', skellyAtlasImage, skellyAtlasJson)
      this.load.atlas('knifeAtlas', knifeAtlasImage, knifeAtlasJson)

    	this.load.spritesheet('chests', chest, { frameWidth: 32, frameHeight: 32 });

      this.load.image('uiPanel', uiPanel)
      this.load.image('brwnX', brownX)
      this.load.image('greyBtn', greyButton)
      this.load.image('brownBtn', brownButton)
      this.load.image('whiteBtn', whiteButton)
      this.load.image('burger', burger)
      this.load.image('heart', heart)
      //this.load.image('gold1', gold1)
      this.load.spritesheet('golds', goldSheet, { frameWidth: 64, frameHeight: 64 })
      this.load.spritesheet('tools', tools, { frameWidth: 24, frameHeight: 24 })
  }
 
  create () {
  	
  }
};

