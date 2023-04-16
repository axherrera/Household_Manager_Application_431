// mock data for demo

export const mockUsers = [
    {
        id: 1,
        username: "mock1",
        firstName: "Foo",
        lastName: "Bar",
        password: "password1",
        Household: {
            id: 1,
            name: "House 1"
        }
    },
    {
        id: 2,
        username: "mock2",
        firstName: "Foo",
        lastName: "Baaz",
        password: "password2",
        Household: {
            id: 1,
            name: "House 1"
        }
    },
    {
        id: 3,
        username: "mock3",
        firstName: "Lorem",
        lastName: "Ipsum",
        password: "password3",
        Household: {
            id: 1,
            name: "House 1"
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

export const mockBills = [
    {
        billId: 1,
        billName: 'Netflix Subscription',
        billType: 'shows',
        total: 15.99,
        notes: 'New movie coming up.',
        frequency: 'monthly',
        date: new Date('2023-04-20'),
        BillHelpers: [
            {
                id: 1,
                amountOwed: 6.00,
                isPaid: false,
            },
            {
                id: 2,
                amountOwed: 9.99,
                isPaid: true,
            }
        ]
    },
    {
        billId: 2,
        billName: 'Mechanic',
        billType: 'utilities',
        total: 300.33,
        notes: 'mechanic is down the road near the theatre',
        frequency: 'single',
        date: new Date('2023-05-25'),
        BillHelpers: [
            {
                id: 1,
                amountOwed: 100.11,
                isPaid: true,
            },
            {
                id: 2,
                amountOwed: 100.11,
                isPaid: true,
            },
            {
                id: 3,
                amountOwed: 100.11,
                isPaid: false,
            }
        ]
    },
]