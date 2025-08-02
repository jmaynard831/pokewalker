export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('OptionsScene');
  }

  create() {
    this.add.text(400, 300, 'Options - Press ESC to go back', {
      font: '28px Arial',
      fill: '#fff'
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-ESC', () => {
      this.scene.start('DayCareScene');
    });
  }
}
