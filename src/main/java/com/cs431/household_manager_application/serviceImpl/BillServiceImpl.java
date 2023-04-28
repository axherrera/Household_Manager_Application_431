package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.dto.BillDTO;
import com.cs431.household_manager_application.dto.BillHelperDTO;
import com.cs431.household_manager_application.dto.mapper.BillDTOMapper;
import com.cs431.household_manager_application.model.Bill;
import com.cs431.household_manager_application.model.BillHelper;
import com.cs431.household_manager_application.model.User;
import com.cs431.household_manager_application.repository.BillsRepository;
import com.cs431.household_manager_application.service.BillService;
import com.cs431.household_manager_application.service.HouseholdService;
import com.cs431.household_manager_application.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BillServiceImpl implements BillService {

    private final BillsRepository billRepo;
    private final HouseholdService householdService;
    private final UserService userService;
    private final BillDTOMapper billDTOMapper = new BillDTOMapper();

    private final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

    @SneakyThrows
    @Override
    public Bill saveBill(BillDTO billDTO) {
        ArrayList<BillHelper> billHelpers = new ArrayList<>();

        for(BillHelperDTO b : billDTO.BillHelpers()){
            BillHelper helper = new BillHelper(
                    userService.getByID(Long.valueOf(b.id())).orElseThrow(),
                    b.amountOwed(),
                    b.isPaid()
            );

            billHelpers.add(helper);
        }

        Bill bill = new Bill(
                householdService.getByID(Long.valueOf(billDTO.household())).get(),
                billDTO.name(),
                billDTO.type(),
                billDTO.total(),
                billDTO.notes(),
                billDTO.frequency(),
                formatter.parse(billDTO.date()),
                billHelpers
        );
        return billRepo.save(bill);
    }

    @Override
    public List<BillDTO> getAllHouseholdBills(Long id) {
        List<Bill> billList = billRepo.findBillByHousehold(householdService.getByID(id).orElseThrow());
        return billList.stream().map(billDTOMapper).collect(Collectors.toList());
    }

    @Override
    public BillDTO getBill(Long billId) {
        return billRepo.findById(billId).map(billDTOMapper).orElseThrow();
    }

    @Override
    public boolean deleteBill(Long billId) {
        if(!billRepo.existsById(billId))
            return false;
        billRepo.deleteById(billId);
        return true;
    }

    @SneakyThrows
    @Override
    public BillDTO editBill(Long billId, BillDTO billDTO) {
        if(!billRepo.existsById(billId))
            throw new RuntimeException("Bill " + billId + " not found");

        ArrayList<BillHelper> billHelpers = new ArrayList<>();

        for(BillHelperDTO b : billDTO.BillHelpers()){
            BillHelper helper = new BillHelper(
                    userService.getByID(Long.valueOf(b.id())).orElseThrow(),
                    b.amountOwed(),
                    b.isPaid()
            );

            billHelpers.add(helper);
        }

        billRepo.save(new Bill(
                billId,
                householdService.getByID(Long.valueOf(billDTO.household())).get(),
                billDTO.name(),
                billDTO.type(),
                billDTO.total(),
                billDTO.notes(),
                billDTO.frequency(),
                formatter.parse(billDTO.date()),
                billHelpers
        ));
        return billDTO;
    }


}
