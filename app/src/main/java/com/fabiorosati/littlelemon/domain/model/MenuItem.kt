package com.fabiorosati.littlelemon.domain.model

data class MenuItem (
    val id: Int,
    val title: String,
    val description: String,
    val price: Double,
    val image: String,
    val category: String,
)