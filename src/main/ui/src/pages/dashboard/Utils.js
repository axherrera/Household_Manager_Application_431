import { mockUsers } from "../../data";
import axios from "axios";

const getMockHouseholdMembers = (householdId) => {
    return mockUsers.filter((user) => user.Household.id === householdId)
}

// returns a list of household members given the householdId
export const getHouseholdMembers = async (householdId) => {
    if (process.env.REACT_APP_MOCK) {
        return getMockHouseholdMembers(householdId);
    }

    const url = `/households/${householdId}/members`

    try {
        const response = await axios.get(url);

        return response.data;
        
    } catch (error) {
        console.log(error);
    }


    return []
}