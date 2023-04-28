import { useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';
import { LoginContext } from '../../../contexts/LoginContext'

const useBills = () => {
    const { user, bills, setBills } = useContext(LoginContext);
    const houseId = user.Household.id;
    const navigate = useNavigate();
    const location = useLocation();
    const { getMockBill, getAllMockBills, addMockBill, editMockBill, payMockBill, deleteMockBill } = useMockBills({bills, houseId, setBills});

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

    const addBill = (newBill) => {
        if (process.env.REACT_APP_MOCK) {
            addMockBill(newBill);
            return;
        }
    }

    const editBill = (id, editedBill) => {
        if (process.env.REACT_APP_MOCK) {
            editMockBill(id, editedBill);
            return;
        }
    }

    const payBill = (billId, userId) => {
        if (process.env.REACT_APP_MOCK) {
            payMockBill(billId, userId)
            navigate(location.pathname, {replace: true});
            return;
        }

        navigate(location.pathname, {replace: true});
    }

    const deleteBill = (id) => {
        if (process.env.REACT_APP_MOCK) {
            deleteMockBill(id);
            navigate('/dashboard/bills');
            return;
        }
        navigate('/dashboard/bills');
    }

    const navigateToAddBill = () => {
        navigate('/dashboard/bills/add');
    }
    
    const navigateToEditBill = (id) => {
        navigate(`/dashboard/bills/${id}/edit`);
    }

    return { getBill, getAllBills, addBill, editBill, navigateToAddBill, payBill, deleteBill, navigateToEditBill }
}

const useMockBills = ({bills, houseId, setBills}) => {
     const getMockBill = (id) => {
        return bills.find((bill) => bill.id === id && bill.houseId === houseId);
    }

    const getAllMockBills = () => {
        return bills.filter(bill => bill.houseId === houseId);
    }

    const addMockBill = (newBill) => {
        setBills(bills => {
            const newBillId = bills.reduce((acc, curr) => {
                const currId = parseInt(curr.id);
                if (currId > acc) {
                    return currId;
                } else {
                    return acc;
                }
            }, 0) + 1;

            return [...bills, { ...newBill, id: newBillId.toString(), houseId: houseId }]
        })
    }

    const editMockBill = (id, editedBill) => {
        setBills(bills => {
            return bills.map(bill => {
                if (bill.id === editedBill.id) {
                    return editedBill;
                }
                return bill;
            })
        })
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

    return { getMockBill, getAllMockBills, addMockBill, editMockBill, payMockBill, deleteMockBill}
}

export default useBills