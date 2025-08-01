import TitleScene from './scenes/TitleScene.js';
import MenuScene from './scenes/MenuScene.js';
import CutsceneScene from './scenes/CutsceneScene.js';
import GameScene from './scenes/GameScene.js';
import OptionsScene from './scenes/OptionsScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000',
  scene: [TitleScene, MenuScene, CutsceneScene, GameScene, OptionsScene]
};

new Phaser.Game(config);
