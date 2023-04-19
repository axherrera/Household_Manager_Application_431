// mock data for demo

export const mockUsers = [
    {
        id: "1",
        username: "user1",
        firstName: "Alice",
        lastName: "Bar",
        password: "password1",
        Household: {
            id: "1",
            name: "House 1"
        }
    },
    {
        id: "2",
        username: "user2",
        firstName: "Bob",
        lastName: "Baaz",
        password: "password2",
        Household: {
            id: "1",
            name: "House 1"
        }
    },
    {
        id: "3",
        username: "user3",
        firstName: "Carol",
        lastName: "Ipsum",
        password: "password3",
        Household: {
            id: "1",
            name: "House 1"
        }
    }
]

export const mockChores = [
    {
        choreid: "1",
        choreName: "clean dog",
        dueDate: new Date(),
        assignedID: "1",
    },
    {
        choreid: "2",
        choreName: "clean cat",
        dueDate: new Date(),
        assignedID: "2",
    },
    {
        choreid: "3",
        choreName: "vacuum",
        dueDate: new Date(),
        assignedID: "3",
    },

]

export const mockBills = [
    {
        id: "1",
        name: 'Netflix Subscription',
        type: 'shows',
        total: 15.99,
        notes: 'New movie coming up.',
        frequency: 'monthly',
        date: new Date('2023-04-20'),
        BillHelpers: [
            {
                id: "1",
                amountOwed: 6.00,
                isPaid: false,
            },
            {
                id: "2",
                amountOwed: 9.99,
                isPaid: true,
            }
        ]
    },
    {
        id: "2",
        name: 'Mechanic',
        type: 'utilities',
        total: 300.33,
        notes: 'mechanic is down the road near the theatre',
        frequency: 'single',
        date: new Date('2023-05-25'),
        BillHelpers: [
            {
                id: "1",
                amountOwed: 100.11,
                isPaid: true,
            },
            {
                id: "2",
                amountOwed: 100.11,
                isPaid: true,
            },
            {
                id: "3",
                amountOwed: 100.11,
                isPaid: false,
            }
        ]
    },
]