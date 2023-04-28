package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.dto.BillDTO;
import com.cs431.household_manager_application.dto.mapper.BillDTOMapper;
import com.cs431.household_manager_application.model.Bill;
import com.cs431.household_manager_application.model.BillHelper;
import com.cs431.household_manager_application.repository.BillsRepository;
import com.cs431.household_manager_application.service.BillService;
import com.cs431.household_manager_application.service.HouseholdService;
import com.cs431.household_manager_application.service.UserService;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class BillServiceImpl implements BillService {

    private final BillsRepository billRepo;
    private final HouseholdService householdService;
    private final UserService userService;
    private final BillDTOMapper billDTOMapper = new BillDTOMapper();

    private final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

    public BillServiceImpl(BillsRepository billRepo, HouseholdService householdService, UserService userService) {
        this.billRepo = billRepo;
        this.householdService = householdService;
        this.userService = userService;
    }

    @SneakyThrows
    @Override
    public Bill saveBill(BillDTO billDTO) {
        ArrayList<BillHelper> billHelpers = new ArrayList<>();

        for(BillHelper b : billDTO.BillHelpers()){
            b.setUser(
                    userService.getByID(b.getUser().getUserId()).orElseThrow()
            );
            billHelpers.add(b);
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
}
