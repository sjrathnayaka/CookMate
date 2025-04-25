package com.cookmate.backend.model.Shoppingtemp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ingredient {
    @Field("name")
    private String name;

    @Field("quantity")
    private double quantity;

    @Field("unit")
    private String unit;
}
