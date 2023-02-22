package com.example.littlelemon

import android.app.Application
import androidx.room.Room
import com.example.littlelemon.data.AppDatabase
import com.example.littlelemon.repository.Repository
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class LittleLemonApp : Application() {
    private val database by lazy {
        Room.databaseBuilder(applicationContext, AppDatabase::class.java, "database").build()
    }

    val repository by lazy {
        Repository(database)
    }
}