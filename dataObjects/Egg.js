class Egg {
  constructor(hatchTime, weight, value, color) {
    this.hatchTime = hatchTime; // in seconds
    this.weight = weight;       // in kg
    this.value = value;         // currency or score
    this.color = color;         // e.g. 'blue', 'green'
    this.hatched = false;
  }

  hatch() {
    if (!this.hatched) {
      this.hatched = true;
      console.log(`The ${this.color} egg hatched!`);
    }
  }

  getDescription() {
    return `A ${this.color} egg worth ${this.value} gold. Hatches in ${this.hatchTime} seconds.`;
  }
}
