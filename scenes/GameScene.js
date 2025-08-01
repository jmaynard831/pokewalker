import { preloadAssets } from '../preload.js';
import { createPlayer } from '../player.js';
import { handleMovement } from '../movement.js';

let player;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    preloadAssets(this);
  }

  create() {
    player = createPlayer(this);
  }

  update() {
    handleMovement(this, player);
  }
}
