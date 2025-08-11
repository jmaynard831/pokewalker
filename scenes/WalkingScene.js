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
        this.load.image('hoenn', 'assets/spritesheets/hoenn_trans.png');
    }

    create() {
        this.add.image(0, 0, 'bg_dcr').setOrigin(0, 0);
        this.add.image(0, 700, 'bg_textbox').setOrigin(0, 0);

        //uhh this is some code im stealing 
        player = this.load.spritesheet(100, 450, 'hoenn');
        

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hoenn', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'hoenn', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hoenn', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

    }

    update(time, delta) {

    }

}