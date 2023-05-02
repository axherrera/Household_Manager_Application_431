package com.cs431.household_manager_application.service;

import com.cs431.household_manager_application.dto.BillDTO;
import com.cs431.household_manager_application.dto.BillHelperDTO;
import com.cs431.household_manager_application.dto.mapper.BillDTOMapper;
import com.cs431.household_manager_application.model.Bill;
import com.cs431.household_manager_application.model.Household;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.repository.BillsRepository;
import com.cs431.household_manager_application.serviceImpl.BillServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class BillServiceTest {

    private AutoCloseable autoCloseable;

    @Mock
    private BillsRepository billRepo;

    @Mock
    private HouseholdService householdService;

    @Mock
    private UserService userService;

    @Mock
    BillDTOMapper billDTOMapper;

    @Mock
    BillService billService;

    private final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

    @BeforeEach
    public void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        billDTOMapper = new BillDTOMapper();
        billService = new BillServiceImpl(
                billRepo,
                householdService,
                userService
        );
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    public void canSaveBill() {
        BillDTO billDTO = new BillDTO(
                "1",
                "1",
                "Electricity",
                "utility",
                100.00,
                "",
                "Monthly",
                "2023-06-01",
                List.of(
                        new BillHelperDTO("1", 50.0, false),
                        new BillHelperDTO("2", 50.0, false)
                )
        );
        Household h = new Household();
        User user1 = new User(), user2 = new User();
        h.setHouseholdId(1L);
        user1.setUserId(1L);
        user2.setUserId(2L);
        when(userService.getByID(1L)).thenReturn(Optional.of(user1));
        when(userService.getByID(2L)).thenReturn(Optional.of(user2));
        when(householdService.getByID(1L)).thenReturn(Optional.of(h));
        when(billRepo.save(new Bill())).thenReturn(new Bill());

        Bill result = billService.saveBill(billDTO);

        verify(billRepo, times(1)).save(any(Bill.class));
    }

    @Test
    void canGetAllHouseholdBills() {
        // Create a household
        Household household = new Household();
        household.setHouseholdId(1L);

        // Create bills
        Bill bill1 = new Bill(1L, household, "Electricity", "Utility", 100.00, "", "Monthly", new Date(), new ArrayList<>());
        Bill bill2 = new Bill(2L, household, "Internet", "Utility", 50.00, "", "Monthly", new Date(), new ArrayList<>());
        when(householdService.getByID(1L)).thenReturn(Optional.of(household));
        when(billRepo.findBillByHousehold(household)).thenReturn(List.of(bill1,bill2));


        // Get bills for household
        List<BillDTO> billDTOList = billService.getAllHouseholdBills(household.getHouseholdId());

        // Check that the correct number of bills was returned
        assertEquals(2, billDTOList.size());

        // Check that the returned bills have the correct properties
        assertEquals("Electricity", billDTOList.get(0).name());
        assertEquals("Utility", billDTOList.get(0).type());
        assertEquals(100.00, billDTOList.get(0).total(), 0.001);
        assertEquals("", billDTOList.get(0).notes());
        assertEquals("Monthly", billDTOList.get(0).frequency());


        assertEquals("Internet", billDTOList.get(1).name());
        assertEquals("Utility", billDTOList.get(1).type());
        assertEquals(50.00, billDTOList.get(1).total(), 0.001);
        assertEquals("", billDTOList.get(1).notes());
        assertEquals("Monthly", billDTOList.get(1).frequency());

    }
    @Test
    public void canGetBill() throws ParseException {
        // Arrange
        Household household = new Household();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        household.setHouseholdId(1L);
        Bill bill = new Bill(
                1234L,
                household,
                "Electricity",
                "Utility",
                100.00,
                "",
                "Monthly",
                formatter.parse("2022-01-01"),
                new ArrayList<>()
        );
        BillDTO expectedBillDTO = new BillDTO(
                "1234",
                "1",
                "Electricity",
                "Utility",
                100.00,
                "",
                "Monthly",
                formatter.parse("2022-01-01").toString(),
                new ArrayList<>()
        );
        when(billRepo.findById(bill.getBillID())).thenReturn(Optional.of(bill));
//        when(billDTOMapper.apply(bill)).thenReturn(expectedBillDTO);

        // Act
        BillDTO actualBillDTO = billService.getBill(bill.getBillID());

        // Assert
        assertEquals(expectedBillDTO, actualBillDTO);
        verify(billRepo).findById(bill.getBillID());
    }

    @Test
    public void testDeleteBill() {
        // Arrange
        Long billId = 1L;
        when(billRepo.existsById(billId)).thenReturn(true);

        // Act
        boolean result = billService.deleteBill(billId);

        // Assert
        verify(billRepo).deleteById(billId);
        assertTrue(result);
    }

    @Test
    public void testEditBill() throws ParseException {
        Household h = new Household();
        h.setHouseholdId(1L);
        Bill bill1 = new Bill(
                1234L,
                h,
                "Electricity",
                "Utility",
                100.00,
                "",
                "Monthly",
                formatter.parse("2022-01-01"),
                new ArrayList<>()
        );
        Bill bill2 = new Bill(
                1234L,
                h,
                "Electricity",
                "Utility",
                100.00,
                "Updated notes",
                "Monthly",
                formatter.parse("2022-01-01"),
                new ArrayList<>()
        );

        // update the bill
        BillDTO editedBillDTO = new BillDTO(
                "1234",
                "1",
                "Electricity",
                "Utility",
                100.00,
                "Updated notes",
                "Monthly",
                "2022-01-01",
                new ArrayList<>()
        );
        when(billRepo.existsById(1234L)).thenReturn(true);
        when(householdService.getByID(1L)).thenReturn(Optional.of(h));
        when(billRepo.findById(1234L)).thenReturn(Optional.of(bill1));
        when(billRepo.save(bill2)).thenReturn(bill2);




        // get the updated bill and check if the notes are updated
        BillDTO updatedBill = billService.editBill(1234L, editedBillDTO);
        assertEquals("Updated notes", updatedBill.notes());

    }
}
