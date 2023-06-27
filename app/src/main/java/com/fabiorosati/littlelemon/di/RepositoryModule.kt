package com.fabiorosati.littlelemon.di

import com.fabiorosati.littlelemon.database.MenuDatabase
import com.fabiorosati.littlelemon.database.MenuItemDao
import com.fabiorosati.littlelemon.database.model.MenuEntityMapper
import com.fabiorosati.littlelemon.network.MenuService
import com.fabiorosati.littlelemon.network.model.MenuDtoMapper
import com.fabiorosati.littlelemon.repository.MenuRepository
import com.fabiorosati.littlelemon.repository.MenuRepositoryImpl
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

// TODO Hilt 7: Create the repository module
@Module
@InstallIn(SingletonComponent::class)
object RepositoryModule {

    @Singleton
    @Provides
    fun provideRecipeRepository(
        menuService: MenuService,
        menuMapper: MenuDtoMapper,
        menuItemDao: MenuItemDao,
        entityMapper: MenuEntityMapper,
    ): MenuRepository {
        return MenuRepositoryImpl(
            menuService = menuService,
            dtoMapper = menuMapper,
            menuItemDao = menuItemDao,
            entityMapper = entityMapper,
        )
    }
}