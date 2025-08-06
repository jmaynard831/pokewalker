import { mons } from "./Pokemon.js";
export class Egg {
  //uhh egg probably needs an ID, the species of it, it needs to track steps taken, but species knows how mnay it requires. 
  //ishatched? i guess we can then not display it 
  constructor(speciesID=1, color="white",stepsTaken=0, ) {
    this.speciesID = speciesID
    this.stepsTaken = stepsTaken;     
    this.color = color;         
    this.isHatched = false;
  }


  //add stepcount to steps taken. like if i input 1 itll add 1. 
  takeStep(stepcount){
    this.stepsTaken+=stepcount;
  }

  //method to check if an egg is gonna hatch
  hatchCheck(){
    //we have the species id, so find the pokemon in the list. 
    species = mons.find(mon => mon.number === this.speciesID)
    let hatchNumber = species.stepcount;
    if (this.stepsTaken>=hatchNumber){
      //uhh then hatch it i guess. not sure where to plug this in yet. 
      this.isHatched = true;
    }
  }
  
  //thinking: what if when the ishatched is true, we display a button on the screen, and you keep walking, but the player can make the 
  //hatching scene run at hteir leisure. 
}
