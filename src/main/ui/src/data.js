// mock data for demo

export const mockUsers = [
    {
        id: 1,
        username: "mock1",
        firstName: "Foo",
        lastName: "Bar",
        password: "password1",
        household: {
            householdId: 1,
            householdName: "House 1"
        }
    },
    {
        id: 2,
        username: "mock2",
        firstName: "Foo",
        lastName: "Baaz",
        password: "password2",
        household: {
            householdId: 1,
            householdName: "House 1"
        }
    },
    {
        id: 3,
        username: "mock3",
        firstName: "Lorem",
        lastName: "Ipsum",
        password: "password3",
        household: {
            householdId: 1,
            householdName: "House 1"
        }
    }
]

export const mockChores = [
    {
        name: "chore 1",
        dueDate: new Date(),
        assignedID: 1,
    },

]