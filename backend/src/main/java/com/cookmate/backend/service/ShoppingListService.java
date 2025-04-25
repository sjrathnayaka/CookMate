package com.cookmate.backend.service;

import com.cookmate.backend.dto.ShoppingListItemDTO;
import java.util.List;

public interface ShoppingListService {
    List<ShoppingListItemDTO> generateShoppingList(List<String> recipeIds);
}