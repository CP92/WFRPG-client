import phaser from 'phaser';

const logo = require('./../../images/logo.png')
 
export default class BootScene extends phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
  	this.load.image('logo', logo)
  }
 
  create () {
  	//console.log('boot end')
  	this.scene.start('Preloader')
  }
};