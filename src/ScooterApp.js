const User = require('./User')
const Scooter = require('./Scooter')


let cheese = {}

class ScooterApp {

 

  constructor(){
    this.stations = {
      "Manhattan":[],
      "Brooklyn":[],
      "Queens":[],
      "Bronx":[],
      "StatenIsland":[]
    }
    this.registeredUsers = {}
    ScooterApp.scooterSessions.push(this);
  }

  static scooterSessions = [];

  register(user){
    if (user.userName in this.registeredUsers){

      console.log("already registered!");
      return

    } else if (user.age <= 17){

      console.log("too young to register!")
      return

    } else {

      this.registeredUsers[user.userName] = {"password":user.password,
                                             "age": user.age,
                                             "loggedIn":false,}
      console.log("user has been registered");

    }

  }

  logIn(username, password){
    if(username in this.registeredUsers){
      if(this.registeredUsers[username]["password"] === password){
        this.registeredUsers[username]["loggedIn"] = true;
        console.log("Log in successful");
      } else {

        throw new Error("Username or password is incorrect.");

      }

    } else {

      throw new Error("Username or password is incorrect.");

    }
  }

  addScooter(location, scooter){

    scooter.station = location;
    this.stations[location].push(scooter);
    console.log(this.stations[location][0]);
  }

  removeScooter(scooterToRemove){
    let serial = scooterToRemove.serial;
    let finished = false
    let self = this;

    for (let key in self.stations){
      console.log(key);

      if (key.length === 0){
        continue;
      }

      for (let i in self.stations[key]){
        console.log(self.stations[key][i]);

        if (self.stations[key][i].serial === serial){
          self.stations[key].splice(i,1);
          finished = true;
          break

        }

      }

      if( finished === true){
        break;

      }
    }
    if (finished === false){

      throw new Error("Scooter is not in array and has therefore not previously been added")

    } else{

      console.log("Scooter successfully removed");
      
    }

  }

}

let testApp = new ScooterApp();
let testUser1 = new User("Steve","123", 18);
let testScooter = new Scooter("Manhattan", testUser1);
console.log(testApp.stations["Manhattan"]);
testApp.addScooter("Brooklyn", testScooter);
testApp.removeScooter(testScooter);

module.exports = ScooterApp
