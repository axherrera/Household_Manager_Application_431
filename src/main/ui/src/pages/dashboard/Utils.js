import { mockUsers } from "../../data";

const getMockHouseholdMembers = (householdId) => {
    return mockUsers.filter((user) => user.Household.id === householdId)
}

// returns a list of household members given the householdId
export const getHouseholdMembers = (householdId) => {
    if (process.env.REACT_APP_MOCK) {
        return getMockHouseholdMembers(householdId);
    }

    // TODO: get users from real endpoint
    return []
}