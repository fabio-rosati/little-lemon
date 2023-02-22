package com.example.littlelemon.repository

import com.example.littlelemon.data.AppDatabase
import com.example.littlelemon.network.MenuItemNetwork

class LocalSource(database: AppDatabase) {

    private val dao = database.menuItemDao()

    fun saveMenuToDatabase(menuItemsNetwork: List<MenuItemNetwork>) {
        val menuItemsRoom = menuItemsNetwork.map { it.toMenuItemRoom() }
        dao.insertAll(*menuItemsRoom.toTypedArray())
    }

    fun all() = dao.getAll()

    fun isEmpty(): Boolean = dao.isEmpty()
}