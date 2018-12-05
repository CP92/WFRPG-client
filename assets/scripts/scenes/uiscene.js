import phaser from 'phaser'
import config from './../config/config'

const store = require('../store')

let goldCount;
let info;
let goldIcon;
let pickIcon;

export default class UiScene extends phaser.Scene {

    constructor ()
    {
        super();

        this.pickAxe;
        this.gold;
    }

    create ()
    {   
        //  Grab a reference to the Game Scene
        let ourGame = this.scene.get('Game');

        
        
        goldIcon = this.add.sprite(40, 20, 'golds', 0).setScale(1)

        
        //  Our Text object to display the Score
        info = this.add.text(goldIcon.x + 10, goldIcon.y - 5, '', { font: '24px Arial', fill: '#000000' });

        

            //pickIcon = this.add.sprite(info.getBottomRight().x + 80, info.getBottomRight().y + 10, 'tools')
        pickIcon = this
          

        //  Listen for events from gamescene
        ourGame.events.on('addPickIcon', function () {
            pickIcon.add.sprite(config.width / 2, 30, 'tools', 1)
  
            store.pickFrameSet = true

            console.log('frame set')
        })


        ourGame.events.on('addGold', function (inventory) {
            this.pickAxe = inventory.pickaxe;    
            this.gold = inventory.gold;

            //console.log(this.pickAxe)

            if (Math.floor(this.gold / 10) <= 0) {
                goldCount = 0
            } else if (Math.floor(this.gold / 10) === 1) {
                goldCount = 1
            } else if (Math.floor(this.gold / 10) === 2) {
                goldCount = 2
            } else if (Math.floor(this.gold / 10) === 3) {
                goldCount = 3
            } else if (Math.floor(this.gold / 10) === 4) {
                goldCount = 4
            } else if (Math.floor(this.gold / 10) === 5) {
                goldCount = 5
            } else if (Math.floor(this.gold / 10) >= 6) {
                goldCount = 6
            }

            //console.log(goldCount)

            goldIcon.setFrame(goldCount)
            
            info.setText('' + this.gold);

        }, this);
    }
}