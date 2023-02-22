package com.example.littlelemon.utils
import com.example.littlelemon.data.MenuItemRoom

fun List<MenuItemRoom>.filterByCategory(selectedCategories: List<String>): List<MenuItemRoom> {
    return if(selectedCategories.isEmpty()){this}
    else {
        this.filter { item ->
            selectedCategories.any {
                it.equals(item.category, ignoreCase = true)
            }
        }
    }
}

fun List<MenuItemRoom>.filterBySearchPhrase(searchPhrase: String): List<MenuItemRoom> {
    return if(searchPhrase.isEmpty()){this}
    else {
        this.filter { item ->
            item.title.contains(searchPhrase, ignoreCase = true)
        }
    }
}