export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {
    this.load.image('titleBG', 'assets/bg_title.png');
  }

  create() {
    const bg = this.add.image(0, 0, 'titleBG')
      .setOrigin(0) // top-left corner
      .setDisplaySize(this.scale.width, this.scale.height);

    this.input.keyboard.once('keydown-ENTER', () => {
      this.scene.start('GameScene');
    });
  }
}
