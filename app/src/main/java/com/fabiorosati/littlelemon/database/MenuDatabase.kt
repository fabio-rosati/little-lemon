package com.fabiorosati.littlelemon.database

import androidx.room.Database
import androidx.room.RoomDatabase
import com.fabiorosati.littlelemon.database.model.MenuItemEntity

// TODO Database 4 (Room): Create the database

@Database(entities = [MenuItemEntity::class], version = 1)
abstract class MenuDatabase: RoomDatabase() {

    abstract fun menuItemDao(): MenuItemDao

    companion object{
        val DATABASE_NAME: String = "menu_db"
    }
}