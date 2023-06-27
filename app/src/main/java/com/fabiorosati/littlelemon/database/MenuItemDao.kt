package com.fabiorosati.littlelemon.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.fabiorosati.littlelemon.database.model.MenuItemEntity

// TODO Database 3 (Room): Create the Data Access Object

@Dao
interface MenuItemDao {
    @Query("SELECT * FROM MenuItemEntity")
    fun getAll(): List<MenuItemEntity>
//    fun getAll(): LiveData<List<MenuItemRoom>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(vararg menuItems: MenuItemEntity)

    @Query("SELECT (SELECT COUNT(*) FROM MenuItemEntity) == 0")
    fun isEmpty(): Boolean
}