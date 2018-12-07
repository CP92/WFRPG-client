import phaser from 'phaser'
import config from './../config/config'

const store = require('../store')

let goldCount;
let goldInfo;
let goldIcon;
let pickIcon;
let topBar;
let burger;
let burgerInfo;
let healthIcon;
let healthInfo;

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
        let shop = this.scene.get('Shop');

        topBar = this.add.image(400, 25, 'whiteBtn').setScale(4.5,1)
        
        
        goldIcon = this.add.sprite(40, 20, 'golds', 0).setScale(1)

        
        //  Our Text object to display the Score
        goldInfo = this.add.text(goldIcon.x + 10, goldIcon.y - 5, '', { font: '24px Arial', fill: '#000000' });

        burger = this.add.sprite(goldInfo.x + 50, goldInfo.y + 10, 'burger')
        
        burgerInfo = this.add.text(burger.x + 10, burger.y - 5, '', { font: '24px Arial', fill: '#000000' });

        healthIcon = this.add.sprite(750, burger.y, 'heart')
        healthInfo = this.add.text(healthIcon.x + 10, healthIcon.y - 5, '', { font: '24px Arial', fill: '#000000' })

            //pickIcon = this.add.sprite(goldInfo.getBottomRight().x + 80, goldInfo.getBottomRight().y + 10, 'tools')
        pickIcon = this
          

        //  Listen for events from gamescene
        ourGame.events.on('addPickIcon', function () {
            pickIcon.add.sprite(config.width / 2, 30, 'tools', 1)
  
            store.pickFrameSet = true

            //console.log('frame set')
        })


        ourGame.events.on('addGold', function (inventory) {
                
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
            
            goldInfo.setText('' + this.gold);

        }, this);

        shop.events.on('addGold', function (inventory) {
                
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
            
            goldInfo.setText('' + this.gold);

        }, this);

        shop.events.on('addFood', function () {
            burgerInfo.setText('' + ourGame.player.data.values.inventory.food)
        }, this)
        ourGame.events.on('addFood', function () {
            burgerInfo.setText('' + ourGame.player.data.values.inventory.food)
        }, this)
        ourGame.events.on('addHealth', function () {
            healthInfo.setText('' + ourGame.player.data.values.hp)
        }, this)
    }
}