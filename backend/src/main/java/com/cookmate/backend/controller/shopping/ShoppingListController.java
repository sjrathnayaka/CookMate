package com.cookmate.backend.controller.shopping;

import com.cookmate.backend.dto.ShoppingListItemDTO;
import com.cookmate.backend.service.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shopping")
@CrossOrigin(origins = "http://localhost:3000")
public class ShoppingListController {

    @Autowired
    private ShoppingListService shoppingListService;

    @PostMapping("/generate")
    public List<ShoppingListItemDTO> generateShoppingList(@RequestBody List<String> recipeIds) {
        return shoppingListService.generateShoppingList(recipeIds);
    }
}
