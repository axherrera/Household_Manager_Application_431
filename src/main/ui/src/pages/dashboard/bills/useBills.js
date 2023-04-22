import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';
import { LoginContext } from '../../../contexts/LoginContext'

const useBills = () => {
    const { bills, setBills } = useContext(LoginContext);
    const navigate = useNavigate();
    const location = useLocation();

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

        navigate(location.pathname);
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

    return { addBill, payBill, deleteBill, editBill }
}

export default useBills