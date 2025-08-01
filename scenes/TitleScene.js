export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {
    this.load.image('titleBG', 'assets/bg-title.png');
  }

  create() {
    this.add.image(400, 300, 'titleBG').setDisplaySize(800, 600);

    // const text = this.add.text(400, 500, 'Press Any Key to Start', {
    //   font: '32px Arial',
    //   fill: '#ffffff'
    // });
    // text.setOrigin(0.5);

    this.input.keyboard.once('keydown', () => {
  this.scene.start('MenuScene');
});

  }
}
