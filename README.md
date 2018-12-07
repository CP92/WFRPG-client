# Wicked Fast Role Playing Game (WFRPG)

A 2D game that allows you to collect resources, level up, and fight skelletons.

* [Deployed User Site](https://dontbin.github.io/WFRPG-client/)
* [Client Repo](https://github.com/CP92/WFRPG-client)

API
* [Deployed API](https://pure-citadel-23065.herokuapp.com/)
* [API Repo](https://github.com/CP92/WFRPG-express-api)


## Technologies Used

* HTML5
* Phaser 3 game framework
* jQuery
* Bootstrap
* Ajax
* Tiled map maker
* Opengameart.com
* Teshy labs software
* HTMLgamedevs.com
* Github Pages


## Unsolved Problems

There is no win state. At times actions can take a bit to perform or actions will affect objects that are not targeted. You can't die. Only 2 skills to level up. Animations can be buggy or non existent. 


## Development Stories

This was an absolute blast and nightmare. Learning a game framework is a lot of work and a true rabbit hole to venture down. I have learned so much about how game engines work, animations, sprite sheets, pathing and map making. 

### Planning

We spent the evening before the project creating wireframes, ERDs, and user stories. The first morning of the project we discussed the all three planning elements, confirmed they were good, and went to work.

* [User Stories]()
* [Wireframe]()

### Process & Problem-Solving

Day one was figuring out how a game engine works. A limit was set for myself where if I didn't have basic playable game I would shift to a different project. By day two I had learned the basic flow of the framework and felt comfortable enough to learn more and moving forward. By the end of the day friday I had a map made, a movable character with animations, the ability to open chests with animations, and collisions set up.

Th weekend was dedicated to CRUD. CRUD was achieved via GETTING, SAVING, UPDATING, and DELETING player data. The map was updated on load using the players data. For example, if the save file states that the player has the pickaxe, the pickaxe chest would load as opened instead of closed. CRUD MVP was aquired by sunday night.

Monday and tuesday were dedicated to allowing the player to mine for gold from rocks. Mining can only happen if the player has obtained the pickaxe and uses the action key 'E' within x amount of pixels from a rock. The rocks give a random number of gold per allowed mining tick. The rocks originally would dissapear when drained of resources, but it was discovered that it was much more effective to simply change the tint to gray, then after a alotted time would regain the ability to be mined again. Each rock has its own repawn timer.

wednesday and thursday were dedicated to enemy NPCs which can attack the player, complete with their own animations, setting up the UI for the player, player attacks, eating food to heal the player, and a shop where you can spend gold to buy food and level up your mining and strength levels.

The hardest part of this was using the new and incomplete documentation for the phaser 3 framework. I had to use the HTML5 game dev forums many times for help.

## Client image

![client](https://imgur.com/a/X4TyIFY)