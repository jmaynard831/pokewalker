import { preloadAssets } from '../preload.js';
import { createPlayer } from '../player.js';
import { handleMovement } from '../movement.js';
//This is hte daycare hubworld. the player controls a menu clicker. 
export default class DayCareScene extends Phaser.Scene {
  constructor() {
    super('DayCareScene');
  }

  preload() {

    this.load.image('menuLeft', 'assets/UI/UI_daycare_menu.png');
    this.load.image('bg_daycareman', 'assets/UI/BG_Daycare_man.png');

    this.load.image('ui_dex', 'assets/UI/UI_menuitem_dex.png');
    this.load.image('ui_mart', 'assets/UI/UI_menuitem_shop.png');
    this.load.image('ui_walk', 'assets/UI/UI_menuitem_walk.png');
    this.load.image('ui_pointer', 'assets/UI/ui_pointer.png');
  }

   create() {
    const ui_daycare = this.add.image(0, 0, 'menuLeft').setOrigin(0, 0);
    const bg_daycareman = this.add.image(630, 0, 'bg_daycareman').setOrigin(0, 0);

    this.menuOptions = ['See Eggs','Check Dex', 'Visit Mart', 'Go Walking', 'Options'];
    this.currentIndex = 0;
    this.optionTexts = [];

    const startX = 100;
    const startY = 150;
    const spacing = 80;

    // add menu items 
    for (let i = 0; i < this.menuOptions.length; i++) {
      const option = this.add.text(startX, startY + i * spacing, this.menuOptions[i], {
        font: '72px "Comic Neue"',
        fill: '#df109aff'
      });
      this.optionTexts.push(option);
    }

    //highlight the menu 
    this.updateMenuHighlight();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.lastMoveTime = 0;
    this.moveCooldown = 150; 
  }

  update(time, delta) {
    // up/down
    if (time - this.lastMoveTime > this.moveCooldown) {
      if (this.cursors.down.isDown && this.currentIndex < this.menuOptions.length - 1) {
        this.currentIndex++;
        this.lastMoveTime = time;
        this.updateMenuHighlight();
      } else if (this.cursors.up.isDown && this.currentIndex > 0) {
        this.currentIndex--;
        this.lastMoveTime = time;
        this.updateMenuHighlight();
      }
    }

    // Enter selects 
    if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.selectOption(this.currentIndex);
    }
  }

  updateMenuHighlight() {
    this.optionTexts.forEach((text, index) => {
      if (index === this.currentIndex) {
        text.setStyle({ fill: '#ffff00' }); 
      } else {
        text.setStyle({ fill: '#df109aff' });
      }
    });
  }

  selectOption(index) {
    const selected = this.menuOptions[index];
    console.log(`Selected: ${selected}`);

    switch (selected) {
      case 'Check Dex':
        this.scene.start('DexScene');
        break;
      case 'Visit Mart':
        this.scene.start('MartScene');
        break;
      case 'Go Walking':
        this.scene.start('WalkScene');
        break;
      case 'Options':
        this.scene.start('OptionsScene');
        break;
    }
  }
}



