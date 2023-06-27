package com.fabiorosati.littlelemon.repository

import com.fabiorosati.littlelemon.database.MenuItemDao
import com.fabiorosati.littlelemon.database.model.MenuEntityMapper
import com.fabiorosati.littlelemon.domain.model.MenuItem
import com.fabiorosati.littlelemon.network.MenuService
import com.fabiorosati.littlelemon.network.model.MenuDtoMapper

// TODO Repository 2: Implement the repository interface

class MenuRepositoryImpl(
    // Retrofit service (inject through NetworkModule)
    private val menuService: MenuService,
    private val dtoMapper: MenuDtoMapper,
    // Room database (inject through RoomModule)
    private val menuItemDao: MenuItemDao,
    private val entityMapper: MenuEntityMapper,
): MenuRepository {

    override suspend fun getMenu(): List<MenuItem>
    {
        if(menuItemDao.isEmpty()){
            // TODO Network 3 (Retrofit): Add the network call to the repository
            val menu = dtoMapper.toDomainList(menuService.getMenu().menu)
            // TODO Database 5 (Room): Add the database call to the repository
            menuItemDao.insertAll(*entityMapper.fromDomainList(menu).toTypedArray())
        }

        return entityMapper.toDomainList(menuItemDao.getAll())
    }
}