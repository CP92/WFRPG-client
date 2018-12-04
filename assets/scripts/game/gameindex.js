import phaser from 'phaser';
import config from './../config/config';
import GameScene from './../scenes/gamescene';
import BootScene from './../scenes/bootscene';
import PreloaderScene from './../scenes/preloaderscene';
import TitleScene from './../scenes/titlescene';
import PauseScene from './../scenes/pausescene';
 
let scene;

class Game extends phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Pause', PauseScene)
    this.scene.start('Boot');
    //scene = this
  }
}
 

const start = function () { 
	window.game = new Game();
	
}

const end = function () {
    game.destroy(true);
    //game = null;
    this.renderer.destroy();
    this.loop.stop()
    this.canvas.remove()
  }



module.exports = {start, end}