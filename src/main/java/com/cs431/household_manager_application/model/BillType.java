package com.cs431.household_manager_application.model;

import lombok.ToString;

@ToString
public enum BillType {
    SUBSCRIPTION("Subscription"),
    GROCERY("Grocery"),
    UTILITY("Utility"),
    OTHER("Other");

    private final String name;

    BillType(String name) {
        this.name = name;
    }
}
