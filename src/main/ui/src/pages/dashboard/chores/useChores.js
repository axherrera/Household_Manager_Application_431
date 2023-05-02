import { LoginContext } from '../../../contexts/LoginContext'
import { useContext } from "react";
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import axios from 'axios';
const useChores = () => {
    const {user, chores, setChores} = useContext(LoginContext);
    const houseId = user.Household.id;
    const getChore = async (id) => {
        const url = `/households/${houseId}/chores/${id}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.log('error', error)
        }
        return null;
    }

    const getAllChores = async () => {
        const url = `/households/${houseId}/chores`;
        try {
            const response = await axios.get(url);
            //console.log(response.data)
            return response.data;
        } catch (error) {
            console.log('error', error)
        }
        return [];

        return {getAllChores}
    }
}
export default useChores