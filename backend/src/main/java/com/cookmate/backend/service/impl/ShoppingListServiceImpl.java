package com.cookmate.backend.service.impl;

import com.cookmate.backend.dto.ShoppingListItemDTO;
import com.cookmate.backend.model.Shoppingtemp.Recipe;
import com.cookmate.backend.model.Shoppingtemp.Ingredient;
import com.cookmate.backend.repository.shoppingtem.RecipeRepository;
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
        Map<String, ShoppingListItemDTO> itemMap = new HashMap<>();

        for (String id : recipeIds) {
            Optional<Recipe> recipeOpt = recipeRepository.findById(id);
            if (recipeOpt.isPresent()) {
                for (Ingredient ing : recipeOpt.get().getIngredients()) {
                    String key = ing.getName() + "_" + ing.getUnit();
                    itemMap.putIfAbsent(key, new ShoppingListItemDTO(ing.getName(), ing.getUnit(), 0));
                    ShoppingListItemDTO item = itemMap.get(key);
                    item.setQuantity(item.getQuantity() + ing.getQuantity());
                }
            }
        }

        return new ArrayList<>(itemMap.values());
    }
}