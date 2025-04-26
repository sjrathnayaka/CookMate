package com.cookmate.backend.service.impl;

import com.cookmate.backend.dto.ShoppingListItemDTO;
import com.cookmate.backend.model.Recipe;
import com.cookmate.backend.repository.RecipeRepository;
import com.cookmate.backend.service.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ShoppingListServiceImpl implements ShoppingListService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public List<ShoppingListItemDTO> generateShoppingList(List<String> recipeIds) {
        Map<String, ShoppingListItemDTO> aggregatedItems = new HashMap<>();

        List<Recipe> recipes = recipeRepository.findAllById(recipeIds);
        for (Recipe recipe : recipes) {
            for (String ingredientStr : recipe.getIngredients()) {
                String[] parts = ingredientStr.split(" ");
                if (parts.length < 3) continue; // Invalid format

                try {
                    double quantity = Double.parseDouble(parts[0]);
                    String unit = parts[1];
                    String name = String.join(" ", Arrays.copyOfRange(parts, 2, parts.length));
                    String key = name.toLowerCase() + "-" + unit.toLowerCase();

                    aggregatedItems.compute(key, (k, v) -> {
                        if (v == null) {
                            return new ShoppingListItemDTO(name, unit, quantity);
                        } else {
                            v.setQuantity(v.getQuantity() + quantity);
                            return v;
                        }
                    });
                } catch (NumberFormatException e) {
                    // Skip if not parsable
                    continue;
                }
            }
        }

        return new ArrayList<>(aggregatedItems.values());
    }
}
