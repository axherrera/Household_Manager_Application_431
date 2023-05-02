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
    },
    {
        id: "4",
        username: "user4",
        firstName: "Dylan",
        lastName: "Brady",
        password: "password4",
        Household: {
            id: "2",
            name: "House 2"
        }
    },
    {
        id: "5",
        username: "user5",
        firstName: "Emma",
        lastName: "Baaz",
        password: "password5",
        Household: {
            id: "2",
            name: "House 2"
        }
    },
    {
        id: "6",
        username: "user6",
        firstName: "Finn",
        lastName: "Time",
        password: "password6",
        Household: {
            id: "2",
            name: "House 2"
        }
    }
]

export const mockChores = [
    {
        id: "1",
        choreName: "clean dog",
        dueDate: '2023-05-02',
        assignedID: "1",
        isComplete: false,
        houseID: "1"
    },
    {
        id: "2",
        choreName: "clean cat",
        dueDate: '2023-05-02',
        assignedID: "2",
        isComplete: true,
        houseID: "1"
    },
    {
        id: "4",
        choreName: "clean kitchen",
        dueDate: '2023-05-02',
        assignedID: "1",
        isComplete: false,
        houseID: "1"
    },
    {
        id: "3",
        choreName: "vacuum",
        dueDate: '2023-05-02',
        assignedID: "4",
        isComplete: false,
        houseID:"2"
    },

]

export const mockBills = [
    {
        id: "1",
        houseId: "1",
        name: 'Netflix Subscription',
        type: 'shows',
        total: 15.99,
        notes: 'New movie coming up.',
        frequency: 'monthly',
        date: '2023-07-10',
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
        houseId: "1",
        name: 'Mechanic',
        type: 'utilities',
        total: 300.33,
        notes: 'mechanic is down the road near the theatre',
        frequency: 'single',
        date: '2023-08-25',
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
    {
        id: "3",
        houseId: "2",
        name: 'Cell Phone',
        type: 'utilities',
        total: 100,
        notes: 'Best cell phone plan',
        frequency: 'monthly',
        date: '2023-10-09',
        BillHelpers: [
            {
                id: "4",
                amountOwed: 50,
                isPaid: true,
            },
            {
                id: "5",
                amountOwed: 50,
                isPaid: false,
            },
        ]
    },
]

export const newEmptyBill = {
    name: '',
    type: '',
    total: 0,
    notes: '',
    frequency: 'single',
    date: new Date(),
    BillHelpers: []
}