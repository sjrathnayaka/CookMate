package com.cookmate.backend.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class MealPlanDTO {
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<DayPlanDTO> dayPlans;
}

@Data
class DayPlanDTO {
    private LocalDate date;
    private List<MealSlotDTO> mealSlots;
}

@Data
class MealSlotDTO {
    private String mealType;
    private String recipeId;
}