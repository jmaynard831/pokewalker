import TitleScene from './scenes/TitleScene.js';
import MenuScene from './scenes/MenuScene.js';
import CutsceneScene from './scenes/CutsceneScene.js';
import DayCareScene from './scenes/DayCareScene.js';
import OptionsScene from './scenes/OptionsScene.js';
import DexScene from './scenes/DexScene.js';
import MartScene from './scenes/MartScene.js';
import WalkScene from './scenes/WalkScene.js';
import WalkingScene from './scenes/WalkingScene.js';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#0fff0f',
  scene: [DayCareScene, TitleScene, CutsceneScene, OptionsScene,DexScene,MartScene, WalkScene,WalkingScene],
  scale: {
    mode: Phaser.Scale.RESIZE, //think about mobile gaming i dunno
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};


new Phaser.Game(config);
