package com.cookmate.backend.model.Shoppingtemp;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "recipes")
public class Recipe {
    @Id
    private String id;

    private String title;

    private List<Ingredient> ingredients;
}
