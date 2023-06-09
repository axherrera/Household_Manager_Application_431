import { useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';
import { LoginContext } from '../../../contexts/LoginContext'
import axios from "axios";

const useBills = () => {
    const { user, bills, setBills } = useContext(LoginContext);
    const houseId = user.Household.id;
    const navigate = useNavigate();
    const location = useLocation();
    const { getMockBill, getAllMockBills, addMockBill, editMockBill, payMockBill, deleteMockBill } = useMockBills({bills, houseId, setBills});

    const getBill = async (id) => {
        if (process.env.REACT_APP_MOCK) {
            return getMockBill(id)
        }

        const url = `/households/${houseId}/bills/${id}`;

        try {
            const response = await axios.get(url);

            return response.data;
        } catch(error) {
            console.log('error', error)
        }

        return null;
    }

    const getAllBills = async () => {
        if (process.env.REACT_APP_MOCK) {
            return getAllMockBills();
        }

        const url = `/households/${houseId}/bills`;

        try {
            const response = await axios.get(url);

            return response.data;
        } catch(error) {
            console.log('error', error)
        }

        return [];
    }

    const addBill = (newBill) => {
        if (process.env.REACT_APP_MOCK) {
            addMockBill(newBill);
            return;
        }

        const url = `/households/${houseId}/bills`;

        try {
            axios.post(url, newBill);
        } catch(error) {
            console.log('error adding bill', error)
        }
    }

    const editBill = (id, editedBill) => {
        if (process.env.REACT_APP_MOCK) {
            editMockBill(id, editedBill);
            return;
        }
        
        const url = `/households/${houseId}/bills/${id}`;

        try {
            axios
            .put(url, editedBill)
            .catch(function (error) {
                if (error.response?.data?.message?.includes('not found')) {
                    navigate('/dashboard/bills');
                } else {
                    console.log('bill error', error)
                }
            });
        } catch(error) {
            console.log('error editing bill', error)
        }
    }

    const payBill = async (billId, billPayer) => {
        if (process.env.REACT_APP_MOCK) {
            payMockBill(billId, billPayer.id);
            navigate(location.pathname, {replace: true});
            return;
        }

        const url = `/households/${houseId}/bills/${billId}`;

        try {
            await axios.patch(url, billPayer);
            navigate(location.pathname, {replace: true});
        } catch(error) {
            navigate('/dashboard/bills');
        }
        
    }

    const deleteBill = (id) => {
        if (process.env.REACT_APP_MOCK) {
            deleteMockBill(id);
            navigate('/dashboard/bills');
            return;
        }

        const url = `/households/${houseId}/bills/${id}`;

        try {
            axios.delete(url);
        } catch(error) {
            console.log('error editing bill', error)
        }
        navigate('/dashboard/bills', {replace: true});
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