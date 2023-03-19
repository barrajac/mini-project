//PSEUDO CODE / PLAN //
/**
 * 1. Create a object for the uss spaceship c properties: hull, firepower, accuracy,
 * create an attack method as a property to it.
 * 2. Create a class for AlienShip, and make properties equal to fxns that generate a random number between a given range.
 * create attack method specific to it
 * 3. Instantiate the USS Assembly spaceship with specified properties.
 * 4. Instantiate alien spaceships with random properties, and store all in array
 * Create a game loop:
 *    a. USS Assembly attacks the first alien spaceship.
 *    b. If the alien spaceship survives, it attacks the USS Assembly.
 *    c. Repeat until one of them is destroyed.
 *    d. If the USS Assembly destroys an alien spaceship, ask the player if they want to continue or retreat.
 *    e. If the player chooses to retreat, end the game.
 *    f. If the player chooses to continue, move on to the next alien spaceship and repeat the process.
 * Determine if the player has won or lost based on the outcome of the battles.
 */

//1. creating obj of ship
const ship = {
  name: "uss",
  hull: 20,
  firepower: 5,
  accuracy: 0.7,
  //create method for ship to attack alien
  attack: function (alienShipInBattle) {
    //if true, you get to hit the alien
    if (Math.random() < 0.7) {
      alienShipInBattle.hull -= this.firepower; //this. designates obj youre in
      if (alienShipInBattle.hull <= 0) {
        console.log(`${alienShipInBattle.name} destroyed.`);
        alienFleet.shift();
        // if ALL alienShips are destroyed, then user wins game
        if (alienFleet.length === 0) {
          console.log("All alien ships destroyed. You win!");
          return;
        }
        //if ship is destroyed, prompt user if retreat or attack desired
        let text = window.prompt(`Would like to retreat or attack?`);
        if (text === "retreat") {
          console.log("You retreated. The game is over.");
        } else if (text === "attack") {
          // now will ship would attack new alienship
          ship.attack(alienFleet[0]);
        }
      } else {
        // if after u attack, alienship still has hull, then alienship attacks U/humanShip
        alienShipInBattle.attack(this);
      }
    } else {
      console.log("USS missed. Aliens attack.");
      alienShipInBattle.attack(this);
    }
  },
};

//2. creating alien class to generate mult new aliens
class AlienShip {
  constructor(name) {
    this.name = name; //str: "alien1" "alien2" ...
    this.hull = Math.floor(Math.random() * 4) + 3; //random 3 - 6
    this.firepower = Math.floor(Math.random() * 3) + 2; //random 2 - 4
    this.accuracy = Math.random() * 0.2 + 0.6; //random .6 - .8
  }

  attack(humanShip) {
    //in this case humanShip is a param placeholder
    //if random num < random accuracy, then alien attack humanShip /ussr
    if (Math.random() < this.accuracy) {
      humanShip.hull -= this.firepower;
      //if after alien ship attack, if ship hull is 0, you lose
      if (humanShip.hull <= 0) {
        console.log(`USS has ${humanShip.hull} hull. You lose.`); //u lose
      } else {
        // if humanShip still has hull akak survived, then humanShip attacks alienShip
        humanShip.attack(this);
      }
    } else {
      //if aliens miss, then ship/uss attacks the aliens
      humanShip.attack(this);
    }
  }
}

//instantiate new alienShips, and add them to array
alienFleet = [];
for (let i = 1; i <= 6; i++) {
  const newAlien = new AlienShip("enemy");
  alienFleet.push(newAlien);
}

ship.attack(alienFleet[0]);

// Notes //

//how to shift math.random: mult by range (ex. range is 4, then, plus one resulting in * 5) (ex. if range must be b/t 4 and 8  then (8-4)+1 = *5), then mult by min num in array
//Math.random give rando num b/t 0 and 1, zero inclusive, one non-inclusive
