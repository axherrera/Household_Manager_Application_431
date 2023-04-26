import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';
import { LoginContext } from '../../../contexts/LoginContext'

const useBills = () => {
    const { user, bills, setBills } = useContext(LoginContext);
    const houseId = user.Household.id;
    const navigate = useNavigate();
    const location = useLocation();
    const { getMockBill, getAllMockBills, payMockBill, deleteMockBill } = useMockBills({bills, houseId, setBills});

    const getBill = (id) => {
        if (process.env.REACT_APP_MOCK) {
            return getMockBill(id)
        }

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

    const payBill = (billId, userId) => {
        if (process.env.REACT_APP_MOCK) {
            payMockBill(billId, userId)
        }

        navigate(location.pathname, {replace: true});
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

    return { getBill, getAllBills, addBill, payBill, deleteBill, editBill }
}

const useMockBills = ({bills, houseId, setBills}) => {
     const getMockBill = (id) => {
        return bills.find((bill) => bill.id === id && bill.houseId === houseId);
    }

    const getAllMockBills = () => {
        return bills.filter(bill => bill.houseId === houseId);
    }

    const deleteMockBill = (id) => {
        setBills(bills => { return bills.filter(bill => bill.id !== id) });
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

    return { getMockBill, getAllMockBills, payMockBill, deleteMockBill}
}

export default useBills