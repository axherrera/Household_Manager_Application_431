import { useState, useEffect, useContext } from "react"
import { LoginContext } from "../../contexts/LoginContext";
import { getHouseholdMembers } from "./Utils";

const useHousehold = () => {
    const { user } = useContext(LoginContext)
    const houseId = user.Household.id;

    const [householdMembers, setHouseholdMembers] = useState([]);

    useEffect(() => {
        const fetchHouseholdMembers = async () => {
            const members = await getHouseholdMembers(houseId);

            setHouseholdMembers(members);
        };

        fetchHouseholdMembers();
    }, []);

    return { householdMembers }
}

export default useHousehold