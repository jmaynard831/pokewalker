export function handleMovement(player, cursors, delta) {
  const speed = 100;
  const distance = speed * (delta / 1000);

  let moving = false;

  if (cursors.left.isDown) {
    player.x -= distance;
    player.anims.play('walk-left', true);
    moving = true;
  } else if (cursors.right.isDown) {
    player.x += distance;
    player.anims.play('walk-right', true);
    moving = true;
  } else if (cursors.up.isDown) {
    player.y -= distance;
    player.anims.play('walk-up', true);
    moving = true;
  } else if (cursors.down.isDown) {
    player.y += distance;
    player.anims.play('walk-down', true);
    moving = true;
  }

  if (!moving) {
    player.anims.stop();
  }
}
