import { LoginContext } from '../../../contexts/LoginContext'
import { useContext } from "react";
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import axios from 'axios';
const useChores = () => {
    const navigate = useNavigate();
    const {user, chores, setChores} = useContext(LoginContext);
    const houseId = user.Household.id;
    const getChore = async (id) => {
        const url = `/households/${houseId}/chores/${id}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch(error) {
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
        } catch(error) {
            console.log('error', error)
        }
        return [];
    }
    const deleteMockChore = (id) => {
        setChores(chores => { return chores.filter(chore => chore.choreid !== id) });
    };

    const deleteChore = (id) => {
        if (process.env.REACT_APP_MOCK) {
            deleteMockChore(id);
        }
        navigate('/dashboard/chores/ChoresHome');
    };


    return {getAllChores, deleteChore}
}
export default useChores