package com.cs431.household_manager_application.serviceImpl;

import com.cs431.household_manager_application.repository.ItemRepository;
import com.cs431.household_manager_application.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;


}
