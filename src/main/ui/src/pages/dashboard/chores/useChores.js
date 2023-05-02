import { LoginContext } from '../../../contexts/LoginContext'
import { useContext } from "react";
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const useChores = () => {
    const {user, chores, setChores} = useContext(LoginContext);
    const houseId = user.Household.id;
    const getAllMockChores = () => {
       return chores.filter(chore => chore.houseId=== houseId)
    };
    const getAllChores = () => {
        if (process.env.REACT_APP_MOCK) {
            return getAllMockChores();
        }
        return [];
    };


    return {getAllChores}
}
export default useChores