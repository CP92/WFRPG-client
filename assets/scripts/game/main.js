	const tile = require('../../tilesets/hvvMHA-extruded.png')
	const tilemap = require('../../Tilemaps/WFRPG_center_map.json')
	const atlasImage = require('../../atlas/atlas.png')
	const atlasJson = require('../../atlas/atlas.json')
	const chest = require('../../tilesets/chest2.png')

	import phaser from 'phaser'

	console.log('huu')

	const config = {
    	type: Phaser.AUTO,
    	width: 800,
    	height: 600,
    	parent: 'content',
    	scene: {
    	    preload: preload,
    	    create: create,
    	    update: update
    	},
    	physics: {
    		default: 'arcade',
    		arcade: {
    			gravity: { y: 0 }
    		}
    	}
	}; 
	const game =  new phaser.Game(config)
	let player;
	let cursors;
	let actionKey;
	let openBowChest;
	let closedBowChest;
	let openSwordChest;
	let closedSwordChest;
	let swordChestObject;
	let bowChestObject;
	let showDebug = false
	
	function preload () {
		this.load.image('tiles', tile);
    	this.load.tilemapTiledJSON('map', tilemap);

    	this.load.atlas('atlas', atlasImage, atlasJson)

    	this.load.spritesheet('chests', chest, { frameWidth: 32, frameHeight: 32 });
    	
	}

	

	function create () {

		const map = this.make.tilemap({ key: 'map'})

		const tileset = map.addTilesetImage('WFRPG_center', 'tiles')
		//const chestset = map.addTilesetImage('Chest', 'chests')

		const belowLayer = map.createStaticLayer('Bottom', tileset, 0, 0)
		const worldLayer = map.createStaticLayer('World', tileset, 0, 0)
		//const chestLayer = map.createStaticLayer('Chest', chestset, 0, 1)
		//set collisions to true and watch the player for collisions 
		worldLayer.setCollisionByProperty({ collides: true })
		//chestLayer.setCollisionByProperty({ collides: true })

		const aboveLayer = map.createStaticLayer('Top', tileset, 0, 0)
		aboveLayer.setDepth(10);
		
		//Chest objects
		this.swordChestObject = map.findObject('Objects', obj => obj.name === 'Sword Chest');
		console.log(this.swordChestObject)
		this.swordChestObject.data = {
			state: {
				opened: false
			}
		}
		this.bowChestObject = map.findObject('Objects', obj => obj.name === 'Bow Chest');
		this.bowChestObject.data = {
			state: {
				opened: false
			}
		}
		//spawn point
		const spawnPoint = map.findObject('Objects', obj => obj.name === 'Spawn Point');
		//Add player sprite
		player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'atlas', 'misa-front').setSize(30, 40).setOffset(0, 24);
		player.data = {
			inventory: {
				bow: false,
				sword: false,
				pickaxe: false
			}
		}
		//Chest sprites
		closedSwordChest = this.physics.add.sprite(this.swordChestObject.x, this.swordChestObject.y, 'chests', 0)
		closedBowChest = this.physics.add.sprite(this.bowChestObject.x, this.bowChestObject.y, 'chests', 0)
		// make them immovable
		closedSwordChest.body.setImmovable(true)
		closedBowChest.body.setImmovable(true)
		//set colliders
		this.physics.add.collider(player, worldLayer);
		this.physics.add.collider(player, closedSwordChest)
		this.physics.add.collider(player, closedBowChest)
		//this.physics.add.collider(player, chestLayer);
		//Player animations
		const anims = this.anims;
		anims.create({
			key: 'misa-left-walk',
			frames: anims.generateFrameNames('atlas', { prefix: 'misa-left-walk.', start: 0, end: 3, zeroPad: 3}),
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'misa-right-walk',
			frames: anims.generateFrameNames('atlas', { prefix: 'misa-right-walk.', start: 0, end: 3, zeroPad: 3}),
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'misa-front-walk',
			frames: anims.generateFrameNames('atlas', { prefix: 'misa-front-walk.', start: 0, end: 3, zeroPad: 3}),
			frameRate: 10,
			repeat: -1
		});
		anims.create({
			key: 'misa-back-walk',
			frames: anims.generateFrameNames('atlas', { prefix: 'misa-back-walk.', start: 0, end: 3, zeroPad: 3 }),
			frameRate: 10,
			repeat: -1
		});

		//Camera controls for following the character
		const camera = this.cameras.main;
		camera.startFollow(player);
		camera.setBounds(0, 0, map.widthInPixels,
			map.heightInPixels);

		cursors = this.input.keyboard.createCursorKeys();

		actionKey = this.input.keyboard.addKeys('E')

		// Turn debugger on
		this.input.keyboard.once('keydown_D', event => {
			this.physics.world.createDebugGraphic();

			const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
			worldLayer.renderDebug(graphics, {
				titleColor: null,
				collidingTileColor: new phaser.Display.Color(243, 134, 48, 255),
				faceColor: new phaser.Display.Color(40, 39, 37, 255)
			})
		})
	
	}



	function update (time, delta) {
		const speed = 175;
  		const prevVelocity = player.body.velocity.clone();

  		// Stop any previous movement from the last frame
 		 player.body.setVelocity(0);
 		 
 		 // Press E to open chests if in vicinity and in front of the chest
 		 if(actionKey.E.isDown) {
 		 	// console.log(player.body.x)
 		 	// console.log(player.body.y)
 		 	// console.log(closedSwordChest.body.x)
 		 	// console.log(closedSwordChest.body.y)
 		 	console.log(player)
 		 	if ((Math.abs(player.body.x - closedSwordChest.body.x) < 20) && ((player.body.y - closedSwordChest.body.y) < 40)) {
 		 		this.closedSwordChest = this.physics.add.sprite(this.swordChestObject.x, this.swordChestObject.y, 'chests', 1)
 		 		this.swordChestObject.data.state.opened = true;
 		 	}
 		 	//console.log(player.body.y)
 		 	//console.log(closedSwordChest.body.y)
 		 	if ((Math.abs(player.body.x - closedBowChest.body.x) < 20) && ((player.body.y - closedBowChest.body.y) < 40)) {
 		 		this.closedBowChest = this.physics.add.sprite(this.bowChestObject.x, this.bowChestObject.y, 'chests', 1)
 		 		this.bowChestObject.data.state.opened = true;
 		 	}
			
 		 }

  		// Horizontal movement
  		if (cursors.left.isDown) {
  		  player.body.setVelocityX(-speed);
  		} else if (cursors.right.isDown) {
  		  player.body.setVelocityX(speed);
  		}
		
		// Vertical movement
		if (cursors.up.isDown) {
		  player.body.setVelocityY(-speed);
		} else if (cursors.down.isDown) {
		  player.body.setVelocityY(speed);
		}
		// Normalize and scale the velocity so that player can't move faster along a diagonal
		player.body.velocity.normalize().scale(speed);
		// Update the animation last and give left/right animations precedence over up/down animations
		if (cursors.left.isDown) {
		  player.anims.play("misa-left-walk", true);
		} else if (cursors.right.isDown) {
		  player.anims.play("misa-right-walk", true);
		} else if (cursors.up.isDown) {
		  player.anims.play("misa-back-walk", true);
		} else if (cursors.down.isDown) {
		  player.anims.play("misa-front-walk", true);
		} else {
		  player.anims.stop();
		  // If we were moving, pick and idle frame to use
		  if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
		  else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
		  else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
		  else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
  		}
		
	}



module.exports = {
	
}
