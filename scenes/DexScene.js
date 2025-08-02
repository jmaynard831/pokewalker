export default class DexScene extends Phaser.Scene {
    constructor() {
        super('DexScene');
    }

    preload() {
        this.load.video('wip', 'assets/REALLYIMPORTANTSTUFF/ralsei.mp4', 'loadeddata', false, true);
    }

    create() {
        const video = this.add.video(this.scale.width / 2, this.scale.height / 2, 'wip');
        video.setOrigin(0.5);
        video.on('play', () => {
            video.setDisplaySize(this.scale.width, this.scale.height);
        });

        video.play(true); //true == loop

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update(time, delta) {
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {

            this.scene.start('DayCareScene');

        }

    }
}