package com.example.littlelemon.network

import com.example.littlelemon.data.MenuItemRoom
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

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

@Serializable
data class MenuNetwork(
    @SerialName("menu")
    val menu: List<MenuItemNetwork>
)

@Serializable
data class MenuItemNetwork(
    @SerialName("id")
    val id: Int,
    @SerialName("title")
    val title: String,
    @SerialName("description")
    val description: String,
    @SerialName("price")
    val price: Double,
    @SerialName("image")
    val image: String,
    @SerialName("category")
    val category: String,
) {
    fun toMenuItemRoom() = MenuItemRoom(id, title, description, price, image, category)
}