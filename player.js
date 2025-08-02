export function createPlayer(scene) {
  const player = scene.add.sprite(400, 300, 'player');
  
   //const music = scene.sound.add('bgMusic', { loop: true, volume: 0.5 });
   //music.play();

  return player;
}
