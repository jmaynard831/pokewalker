import { GameData } from '../GameData.js';
import { Egg } from '../dataObjects/Egg.js';

export default class WalkScene extends Phaser.Scene {
    constructor() {
        super('WalkScene');
    }

    /* were gonna want to show a list of hte eggs we own, a list of hte walking mons to pick from, and a list of routes to pick from 
    then the user picks a route, an egg and a mon, and we build the walk. */
    preload() {
        console.log(GameData.eggList)
    }

    create() {
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(time, delta) {
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.scene.start('DayCareScene');
        }
    }
}