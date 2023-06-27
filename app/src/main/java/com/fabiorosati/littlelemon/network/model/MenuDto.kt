package com.fabiorosati.littlelemon.network.model

import com.google.gson.annotations.SerializedName

//https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu.json
//"menu": [
//    {
//        "id": 1,
//        "title": "Greek Salad",
//        "description": "The famous greek salad of crispy lettuce, peppers, olives, our Chicago.",
//        "price": "10",
//        "image": "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/greekSalad.jpg?raw=true",
//        "category": "starters"
//    },

// TODO Network 1: Create the network Data Transfer Object

data class MenuDto(
    @SerializedName("menu")
    val menu: List<MenuItemDto>
)

data class MenuItemDto(
    @SerializedName("id")
    val id: Int,
    @SerializedName("title")
    val title: String,
    @SerializedName("description")
    val description: String,
    @SerializedName("price")
    val price: Double,
    @SerializedName("image")
    val image: String,
    @SerializedName("category")
    val category: String,
)