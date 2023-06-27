package com.fabiorosati.littlelemon.di

import android.content.Context
import androidx.room.Room
import com.fabiorosati.littlelemon.database.MenuDatabase
import com.fabiorosati.littlelemon.database.MenuItemDao
import com.fabiorosati.littlelemon.database.model.MenuEntityMapper
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

// TODO Hilt 6b: Create the database module
// Create one function for each parameter to be injected in the MenuRepository
// (the function name doesn't matter as long as it returns the proper type)

@InstallIn(SingletonComponent::class)
@Module
object DatabaseModule {

    @Singleton
    @Provides
    fun provideMenuDAO(@ApplicationContext context: Context): MenuItemDao {

        // TODO Database 5 (Room): Init the database and get the DAO
        return Room
            .databaseBuilder(
                context,
                MenuDatabase::class.java,
                MenuDatabase.DATABASE_NAME)
            .fallbackToDestructiveMigration()
            .build()
            .menuItemDao()
    }

    @Singleton
    @Provides
    fun provideMenuEntityMapper(): MenuEntityMapper {
        return MenuEntityMapper()
    }

//    @Singleton
//    @Provides
//    fun provideMenuDb(@ApplicationContext context: Context): MenuDatabase {
//        return Room
//            .databaseBuilder(
//                context,
//                MenuDatabase::class.java,
//                MenuDatabase.DATABASE_NAME)
//            .fallbackToDestructiveMigration()
//            .build()
//    }

//    @Singleton
//    @Provides
//    fun provideMenuDAO(menuDatabase: MenuDatabase): MenuItemDao {
//        return menuDatabase.menuItemDao()
//    }
}