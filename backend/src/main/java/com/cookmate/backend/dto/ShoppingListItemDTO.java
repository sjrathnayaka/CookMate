package com.cookmate.backend.dto;

public class ShoppingListItemDTO {
    private String name;
    private String unit;
    private double quantity;

    public ShoppingListItemDTO() {}

    public ShoppingListItemDTO(String name, String unit, double quantity) {
        this.name = name;
        this.unit = unit;
        this.quantity = quantity;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public double getQuantity() { return quantity; }
    public void setQuantity(double quantity) { this.quantity = quantity; }
}