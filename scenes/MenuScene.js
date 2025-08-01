export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
    this.menuItems = ['Start Game', 'Options'];
    this.selectedIndex = 0;
  }

  create() {
    this.cameras.main.setBackgroundColor('#000');

    this.menuTexts = this.menuItems.map((item, index) => {
      return this.add.text(400, 300 + index * 50, item, {
        font: '32px Arial',
        fill: '#fff'
      }).setOrigin(0.5);
    });

    this.updateMenu();

    this.input.keyboard.on('keydown-UP', () => {
      this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex - 1, 0, this.menuItems.length);
      this.updateMenu();
    });

    this.input.keyboard.on('keydown-DOWN', () => {
      this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex + 1, 0, this.menuItems.length);
      this.updateMenu();
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      this.selectMenuItem();
    });
  }

  updateMenu() {
    this.menuTexts.forEach((text, index) => {
      if (index === this.selectedIndex) {
        text.setStyle({ fill: '#f39c12' });
      } else {
        text.setStyle({ fill: '#fff' });
      }
    });
  }

  selectMenuItem() {
    const selected = this.menuItems[this.selectedIndex];
    if (selected === 'Start Game') {
  this.scene.start('CutsceneScene');
} else if (selected === 'Options') {
  this.scene.start('OptionsScene');
}

  }
}
