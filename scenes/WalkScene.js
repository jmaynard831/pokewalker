import { GameData } from '../GameData.js';
import { routes } from '../dataObjects/Route.js';

export default class WalkScene extends Phaser.Scene {
    constructor() {
        super('WalkScene');
        this.menuState = 'main';
        this.currentIndex = 0;
    }

    preload() {
        this.load.image('menuLeft', 'assets/UI/UI_daycare_menu.png');
        this.load.image('bg_walk', 'assets/UI/bg_walk.png');
    }

    create() {
        //these are the bg images 
        this.add.image(0, 0, 'menuLeft').setOrigin(0, 0);
        this.add.image(630, 0, 'bg_walk').setOrigin(0, 0);

        //keyboard control init
        this.cursors = this.input.keyboard.createCursorKeys();
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // ok so this is hte top level menu
        this.menuOptions = ['Pick Egg', 'Pick Walking Mon', 'Pick Route', 'GO!', 'Back'];
        this.optionTexts = [];
        this.drawMenu();

        //these dudes are for fiddling with the menu feel
        this.lastMoveTime = 0;
        this.moveCooldown = 150;
    }

    drawMenu() {
        // Clear old menu text
        this.optionTexts.forEach(t => t.destroy());
        this.optionTexts = [];

        const startX = 100;
        const startY = 150;
        const spacing = 80;

        for (let i = 0; i < this.menuOptions.length; i++) {
            const option = this.add.text(startX, startY + i * spacing, this.menuOptions[i], {
                font: '48px "Comic Sans MS"',
                fill: '#df109aff'
            });
            this.optionTexts.push(option);
        }

        this.updateMenuHighlight();
    }

    update(time) {
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

        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.selectOption(this.currentIndex);
        }
    }

    updateMenuHighlight() {
        this.optionTexts.forEach((text, index) => {
            // If we're in pickEgg and this is the selectedEgg, keep it highlighted green
            //bro condense this 
            if (
                this.menuState === 'pickEgg' &&
                GameData.selectedEgg &&
                text.text === GameData.selectedEgg.getDescription()
            ) {
                text.setStyle({ fill: '#00ff00' }); // chosen egg
            }
            else if (
                this.menuState === 'pickwalkingmon' &&
                GameData.selectedMon &&
                text.text === GameData.selectedMon.name
            ) {
                text.setStyle({ fill: '#00ff00' }); // chosen mon
            }
            else if (
                this.menuState === 'pickRoute' &&
                GameData.selectedRoute &&
                text.text === GameData.selectedRoute.name
            ) {
                text.setStyle({ fill: '#00ff00' }); // chosen route
            }
            else {
                text.setStyle({
                    fill: index === this.currentIndex ? '#ffff00' : '#df109aff'
                });
            }
        });
    }

    selectOption(index) {
        const selected = this.menuOptions[index];
        console.log(`Selected: ${selected}`);

        if (this.menuState === 'main') {
            switch (selected) {
                case 'Pick Egg':
                    this.menuState = 'pickEgg';
                    //this draws all the eggs in the list
                    this.menuOptions = GameData.eggList.map(
                        egg => egg.getDescription()
                    );
                    this.menuOptions.push('Back');
                    this.currentIndex = 0;
                    this.drawMenu();
                    break;
                case 'Pick Walking Mon':
                    this.menuState = 'pickwalkingmon';
                    //this draws all the mons in the list
                    this.menuOptions = GameData.pokemonList.map(
                        mon => mon.name
                    );
                    this.menuOptions.push('Back');
                    this.currentIndex = 0;
                    this.drawMenu();
                    break;
                case 'Pick Route':
                    console.log(GameData)
                    this.menuState = 'pickRoute';
                    //this draws all the routes in the list
                    this.menuOptions = routes.map(
                        route => route.name
                    );
                    this.menuOptions.push('Back');
                    this.currentIndex = 0;
                    this.drawMenu();
                    break;
                case 'GO!':
                    //if the three selecteds are selected, then shift scene to 
                    //well its obviously a walking scene but i used that name 
                    if(GameData.selectedRoute && GameData.selectedMon && GameData.selectedEgg ){
                        //console.log("shift to new scene")
                        this.scene.start('WalkingScene');
                    }

                    break;
                case 'Back':
                    //reset the picked things here!
                    GameData.selectedRoute = {};
                    GameData.selectedMon = {};
                    GameData.selectedEgg = {};
                    this.scene.start('DayCareScene');
                    break;
            }
        }
        else if (this.menuState === 'pickEgg') {
            //this is all the logic for selecting an egg. match the chosen with the object
            if (selected === 'Back') {
                this.returnToMainMenu();
            } else {
                // Find the egg object that matches the description
                const chosenEgg = GameData.eggList.find(
                    egg => egg.getDescription() === selected
                );

                if (chosenEgg) {
                    GameData.selectedEgg = chosenEgg;
                    console.log(`Egg chosen: ${chosenEgg.getDescription()}`);
                }

                // Return to main menu
                this.returnToMainMenu();
            }
        }
        else if (this.menuState === 'pickwalkingmon') {
            //this is all the logic for selecting an walking mon. match the chosen with the object
            if (selected === 'Back') {
                this.returnToMainMenu();
            } else {
                // Find the mon object that matches the description
                const chosenMon = GameData.pokemonList.find(
                    mon => mon.name === selected
                );

                if (chosenMon) {
                    GameData.selectedMon = chosenMon;
                    console.log(`Egg chosen: ${chosenMon.name}`);
                }

                // Return to main menu
                this.returnToMainMenu();
            }
        }
        else if (this.menuState === 'pickRoute') {
            //this is all the logic for selecting a route. match the chosen with the object
            if (selected === 'Back') {
                this.returnToMainMenu();
            } else {
                // Find the route object that matches the description
                const chosenRoute = routes.find(
                    route => route.name === selected
                );

                if (chosenRoute) {
                    GameData.selectedRoute = chosenRoute;
                    console.log(`Route chosen: ${chosenRoute.name}`);
                }

                // Return to main menu
                this.returnToMainMenu();
            }
        }
    }

    returnToMainMenu() {
        this.menuState = 'main';
        this.menuOptions = ['Pick Egg', 'Pick Walking Mon', 'Pick Route','GO!', 'Back'];
        this.currentIndex = 0;
        this.drawMenu();
    }
}
