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