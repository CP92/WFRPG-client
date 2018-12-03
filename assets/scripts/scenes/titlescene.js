import phaser from 'phaser';
 
export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }
 
  preload () {
  }
 
  create () {

  	
  	let email = prompt('Please enter your name')
  	let password = prompt('Please enter your password')
  }
};