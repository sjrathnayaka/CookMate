package com.cookmate.backend.model;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class DayPlan {
    private LocalDate date;
    private List<MealSlot> mealSlots;
}