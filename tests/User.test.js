const User = require('../src/User')


let testUser = new User("Steve","123",18)

describe("Test user attributes",() => {
    test("Username correct",() => {
        expect(testUser.userName).toEqual("Steve");
    })

    test("Password correct",() => {
        expect(testUser.password).toEqual("123");
    })

    test("Age correct",() => {
        expect(testUser.age).toEqual(18);
    })
})

