export default class CutsceneScene extends Phaser.Scene {
  constructor() {
    super('CutsceneScene');
    this.dialogueIndex = 0;
    this.dialogue = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    ];
  }

  preload() {
    this.load.image('player', 'assets/player.png');
  }

  create() {
    // Add player sprite center screen
    this.player = this.add.sprite(400, 300, 'player');

    // Draw a semi-transparent rectangle for text box
    const graphics = this.add.graphics();
    graphics.fillStyle(0xff0000, 0.7);
    graphics.fillRect(50, 400, 700, 150);

    // Add text object in the box
    this.textBox = this.add.text(60, 410, '', {
      font: '20px Arial',
      fill: '#ffffff',
      wordWrap: { width: 680 }
    });

    // Show first dialogue page
    this.showDialogue();

    // Listen for key press to advance dialogue
    this.input.keyboard.on('keydown-SPACE', () => {
      this.nextDialogue();
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      this.nextDialogue();
    });
  }

  showDialogue() {
    this.textBox.setText(this.dialogue[this.dialogueIndex]);
  }

  nextDialogue() {
    this.dialogueIndex++;
    if (this.dialogueIndex >= this.dialogue.length) {
      // Dialogue finished, start game scene
      this.scene.start('GameScene');
    } else {
      this.showDialogue();
    }
  }
}
