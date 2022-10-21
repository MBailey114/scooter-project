const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

let testApp = new ScooterApp();
let testUser1 = new User("Steve","123", 18);
let testUser2 = new User("Lucas","123", 16);
let testScooter = new Scooter("Manhattan", testUser1);

describe("Registering outcomes", () => {
    let log = jest.spyOn(console,"log");
    test("Already registered", () => { 
        testApp.registeredUsers["Steve"] = "ajhsga";
        testApp.register(testUser1);
        expect(log).toHaveBeenCalledWith("already registered!");
    })

    test("Too young",() => {
        testApp.register(testUser2);
        expect(log).toHaveBeenCalledWith("too young to register!");
    })

})



describe("Logging in outcomes", () => {
    let log = jest.spyOn(console,"log");
    test("Login with valid credentials", () => {
        testApp.registeredUsers={};
        testApp.register(testUser1);
        testApp.logIn("Steve","123");
        expect(log).toHaveBeenCalledWith("Log in successful");
    })

    test("Login with invalid credentials",() => {

        testApp.registeredUsers={};
        testApp.register(testUser1);
        function toThrowError(){
            testApp.logIn("Steve","124")
        }
        expect(toThrowError).toThrow("Username or password is incorrect.");

    })

})

describe("Adding scooter outcomes",() => {
    test("adding scooter", () => {
        testApp.addScooter("Brooklyn",testScooter);
        expect(testScooter.station).toEqual("Brooklyn");
        expect(testApp.stations["Brooklyn"]).toEqual([testScooter]);
    })

})

describe("Removing Scooter",() => {
    let log = jest.spyOn(console,"log");
    test("Remove Scooter that is in array", () => {
        testApp.stations.Brooklyn = [];
        testApp.addScooter("Brooklyn", testScooter);
        testApp.removeScooter(testScooter);
        expect(log).toHaveBeenCalledWith("Scooter successfully removed");
    })

    test("Remove Scooter that is not in array", () => {
        testApp.stations.Brooklyn = [];
        function toThrowError(){
            testApp.removeScooter(testScooter)
        }
        expect(toThrowError).toThrow("Scooter is not in array and has therefore not previously been added");
    })



})
