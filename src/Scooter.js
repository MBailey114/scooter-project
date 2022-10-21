const User = require("./User")

class Scooter{

  #serial
  #station
  #charge
  #isBroken
  #docked

  constructor(Station, User){
    this.#station = Station;
    this.user = User;
    this.#serial = Math.floor(Math.random() * 1000);
    this.#charge = Math.floor(Math.random() * 100);
    this.#isBroken = true;
    this.#docked = true;

  }

  get station(){
    return this.#station;
  }

  set station(location){
    this.#station = location;
  }

  get charge(){
    return this.#charge;
  }

  set charge(amount){
    this.#charge = amount;
  }

  get isBroken(){
    return this.#isBroken;
  }

  set isBroken(bool){
    this.#isBroken = bool;
  }
  

  get serial(){
    return this.#serial;
  }


  rent(){
    if (this.isBroken == false && this.charge > 20){
      this.docked = false;
      console.log("Enjoy the ride!");
    } else if ( this.charge <= 20) {
      console.log("Scooter low on battery, please charge.");
    } else {
      console.log("Scooter is broken, please send a repair request.");
    }
  }

  dock(Station){
    if (Station === undefined){
      throw new Error("Docking station required!");
    }
    this.station = Station;
    this.docked = true;
    this.user = ""
  }

  async recharge(){
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.charge = 100;

    console.log("Scooter charged");
  }

  async requestRepair(){
    let self = this;
    console.log("Repair starting... Please wait.")
    let progress = 0;
    let interval = await setInterval(function(){

      console.log(progress);
      if (progress === 100){
        clearInterval(interval);
        self.isBroken = false;
        console.log("Scooter is fixed");
      }
      progress += 10;
    }, 500);

  }


}

let testUser = new User("Steve","123",18)
let test = new Scooter("Brooklyn", testUser);
test.requestRepair();



module.exports = Scooter
