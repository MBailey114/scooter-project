const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object


let user1 = ("Steve","123","16");
let scooter1 = new Scooter("Manhattan", user1);

describe('scooter object', () => {
  test('does something', () => {
    expect(typeof(scooter1)).toEqual("object");
  }
)
})


//Method tests
describe('renting checks', () => {
  let log = jest.spyOn(console,"log");
  test("Renting (full charge not broken)", () => {
    scooter1.charge = 100
    scooter1.isBroken = false;
    scooter1.rent();
    expect(log).toHaveBeenCalledWith("Enjoy the ride!");
  })

  test("Renting (low charge not broken)", () => {
    scooter1.charge = 0
    scooter1.isBroken = false;
    scooter1.rent();
    expect(log).toHaveBeenCalledWith("Scooter low on battery, please charge.");
  })

  test("Renting (full charge broken)", () => {
    scooter1.charge = 100
    scooter1.isBroken = true;
    scooter1.rent();
    expect(log).toHaveBeenCalledWith("Scooter is broken, please send a repair request.");
  })
})

describe("docking checks", () => {
  test("values changed", () => {
    scooter1.dock("Brooklyn");
    expect(scooter1.station).toEqual("Brooklyn");
    expect(scooter1.docked).toEqual(true);
    expect(scooter1.user).toEqual("");
  })
})

describe("Recharge", () => {
  test("Values change", async() =>{
    scooter1.charge = 0;
    await scooter1.recharge();
    expect(scooter1.charge).toEqual(100);
  })
})

describe("Repair",() => {
  test("Values change", async() => {
    scooter1.isBroken = true;
    await scooter1.requestRepair();
    expect(scooter1.isBroken).toEqual(false);
  })
})

