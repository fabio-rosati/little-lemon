package com.fabiorosati.littlelemon.utils
import com.fabiorosati.littlelemon.domain.model.MenuItem

fun List<MenuItem>.filterByCategory(selectedCategories: List<String>): List<MenuItem> {
    return if(selectedCategories.isEmpty()){this}
    else {
        this.filter { item ->
            selectedCategories.any {
                it.equals(item.category, ignoreCase = true)
            }
        }
    }
}

fun List<MenuItem>.filterBySearchPhrase(searchPhrase: String): List<MenuItem> {
    return if(searchPhrase.isEmpty()){this}
    else {
        this.filter { item ->
            item.title.contains(searchPhrase, ignoreCase = true)
        }
    }
}