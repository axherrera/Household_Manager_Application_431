import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';
import { LoginContext } from '../../../contexts/LoginContext'

const useBills = () => {
    const { user, bills, setBills } = useContext(LoginContext);
    const houseId = user.Household.id;
    const navigate = useNavigate();
    const location = useLocation();

    const getBill = (id) => {
        if (process.env.REACT_APP_MOCK) {
            return getMockBill(id)
        }

    const getAllMockBills = () => {
        return bills.filter(bill => bill.houseId === houseId);
        return null;
    }

    const getAllBills = () => {
        if (process.env.REACT_APP_MOCK) {
            return getAllMockBills();
        }

        return [];
    }

    const addBill = () => {
        navigate('/dashboard/bills/add');
    }

    const payMockBill = (billId, userId) => {
        setBills(bills => {
            return bills.map(bill => {
                if (bill.id !== billId) {
                    return bill
                }

                const updatedBillHelpers = bill.BillHelpers.map(member => {
                    if (member.id === userId) {
                        return {
                            ...member,
                            isPaid: !member.isPaid
                        };
                    }
                    return member;
                });

                // return the updated JSON object with the modified list
                return {
                    ...bill,
                    BillHelpers: updatedBillHelpers
                };
            })
        })
    }

    const payBill = (billId, userId) => {
        if (process.env.REACT_APP_MOCK) {
            payMockBill(billId, userId)
        }

        navigate(location.pathname, {replace: true});
    }

    const deleteMockBill = (id) => {
        setBills(bills => { return bills.filter(bill => bill.id !== id) });
    }

    const deleteBill = (id) => {
        if (process.env.REACT_APP_MOCK) {
            deleteMockBill(id);
        }
        navigate('/dashboard/bills');
    }

    const editBill = (id) => {
        navigate(`/dashboard/bills/${id}/edit`);
    }

    return { getAllBills, addBill, payBill, deleteBill, editBill }
}

export default useBills