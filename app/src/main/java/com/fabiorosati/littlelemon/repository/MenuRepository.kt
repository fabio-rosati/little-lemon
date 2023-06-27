package com.fabiorosati.littlelemon.repository

import com.fabiorosati.littlelemon.domain.model.MenuItem

// When one section of code needs to interact with another
// section of code, it does it through an interface

// TODO Repository 1: Create the repository interface

interface MenuRepository {
    suspend fun getMenu(): List<MenuItem>
}