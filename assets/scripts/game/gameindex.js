import phaser from 'phaser';
import config from './../config/config';
import GameScene from './../scenes/gamescene';
import BootScene from './../scenes/bootscene';
import PreloaderScene from './../scenes/preloaderscene';
import TitleScene from './../scenes/titlescene';
import ShopScene from './../scenes/shopscene';
import UiScene from './../scenes/uiscene';
 
let scene;

class Game extends phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Shop', ShopScene)
    this.scene.add('Ui', UiScene )
    this.scene.start('Boot');
    //scene = this
  }
}
 

const start = function () { 
	window.game = new Game();
	
}

module.exports = {start}