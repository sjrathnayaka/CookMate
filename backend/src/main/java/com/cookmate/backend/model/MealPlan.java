package com.cookmate.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "meal_plans")
@Data
public class MealPlan {
    @Id
    private String id;
    private String userId;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<DayPlan> dayPlans;
}

@Data
class DayPlan {
    private LocalDate date;
    private List<MealSlot> mealSlots;
}

@Data
class MealSlot {
    private String mealType; // e.g., "Breakfast", "Lunch", "Dinner"
    private String recipeId;
    private boolean tried;
    private String feedback;
}