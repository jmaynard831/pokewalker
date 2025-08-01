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

    this.isTyping = false;
    this.fullText = '';
    this.charIndex = 0;
    this.typingSpeed = 50; // ms per letter
    this.typingEvent = null;
  }

  preload() {
    this.load.image('player', 'assets/player.png');
  }

  create() {
    this.player = this.add.sprite(400, 300, 'player');

    // Text box background
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.7);
    graphics.fillRect(50, 400, 700, 150);

    // Create container to hold letter texts
    this.textContainer = this.add.container(60, 410);

    // Text style for letters
    this.textStyle = {
      font: '20px Arial',
      fill: '#ffffff'
    };

    this.showDialogue();

    this.input.keyboard.on('keydown-SPACE', () => {
      if (this.isTyping) {
        this.finishTyping();
      } else {
        this.nextDialogue();
      }
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      if (this.isTyping) {
        this.finishTyping();
      } else {
        this.nextDialogue();
      }
    });
  }

  showDialogue() {
    this.fullText = this.dialogue[this.dialogueIndex];
    this.charIndex = 0;
    this.isTyping = true;

    // Clear previous letters
    this.textContainer.removeAll(true);

    // Current X position within container for letters
    this.currentX = 0;

    if (this.typingEvent) this.typingEvent.remove();

    this.typingEvent = this.time.addEvent({
      delay: this.typingSpeed,
      callback: this.typeLetter,
      callbackScope: this,
      loop: true
    });
  }

  typeLetter() {
    if (this.charIndex < this.fullText.length) {
      const letter = this.fullText.charAt(this.charIndex);

      // Create a Text object for the letter
      const letterText = this.add.text(this.currentX, 0, letter, this.textStyle);

      // Add letter to container
      this.textContainer.add(letterText);

      // Animate the letter wiggle
      this.animateLetter(letterText);

      // Update currentX by measuring letter width for spacing
      this.currentX += letterText.width;

      this.charIndex++;
    } else {
      this.isTyping = false;
      if (this.typingEvent) this.typingEvent.remove();
    }
  }

 animateLetter(letterText) {
  letterText.y = 10; // start 10px below

  this.tweens.chain({
    tweens: [
      {
        targets: letterText,
        y: 0,
        duration: 30,
        ease: 'Sine.easeInOut'
      }
    ]
  });
}




  finishTyping() {
    this.isTyping = false;

    // Remove typing event if any
    if (this.typingEvent) this.typingEvent.remove();

    // Clear container and add full text as single text (no wiggle on full text)
    this.textContainer.removeAll(true);
    const fullTextObj = this.add.text(0, 0, this.fullText, this.textStyle);
    this.textContainer.add(fullTextObj);
  }

  nextDialogue() {
    this.dialogueIndex++;
    if (this.dialogueIndex >= this.dialogue.length) {
      this.scene.start('GameScene');
    } else {
      this.showDialogue();
    }
  }
}
