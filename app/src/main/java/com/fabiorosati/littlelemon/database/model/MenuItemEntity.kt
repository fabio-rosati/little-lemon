package com.fabiorosati.littlelemon.database.model

import androidx.room.Entity
import androidx.room.PrimaryKey

// TODO Database 1 (Room): Create the database entity

@Entity
data class MenuItemEntity(
    @PrimaryKey val id: Int,
    val title: String,
    val description: String,
    val price: Double,
    val image: String,
    val category: String,
)