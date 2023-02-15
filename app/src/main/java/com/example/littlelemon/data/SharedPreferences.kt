package com.example.littlelemon.data

import androidx.activity.ComponentActivity


class SharedPreferences : ComponentActivity() {
    private val sharedPreferences by lazy {
        getSharedPreferences("LittleLemon", MODE_PRIVATE)
    }
}