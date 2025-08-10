import { GameData } from '../GameData.js';

export default class WalkingScene extends Phaser.Scene {
    constructor() {
        super('WalkingScene');
    }
    /**so we're gonna want to load up the player sprite. then the pokemon sprite. 
     * and we're gonna wanna make them walk. and right now just loop around teh screen. 
     * i envision parallax scrolling one day. anyhoo
     * so it walks. and while it walks. we have a little counter ticking up
     * once per second. and when it hits what the egg needs, then we show a message. 
     */

    preload() {
        this.load.image('bg_dcr', 'assets/UI/bg_route_daycareroad.png');
        this.load.image('bg_textbox', 'assets/UI/bg_walking_textbox.png');
    }

    create() {
        this.add.image(0, 0, 'bg_dcr').setOrigin(0, 0);
        this.add.image(0, 700, 'bg_textbox').setOrigin(0, 0);
    }

    update(time, delta) {

    }

}