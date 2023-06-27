package com.fabiorosati.littlelemon.di

import com.fabiorosati.littlelemon.network.MenuService
import com.fabiorosati.littlelemon.network.model.MenuDtoMapper
import com.google.gson.GsonBuilder
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

// TODO Hilt 6: Create the network module
// Create one function for each parameter to be injected in the MenuRepository
// (the function name doesn't matter as long as it returns the proper type)

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    @Singleton
    @Provides
    fun provideRecipeService(): MenuService {

        // TODO Network 4 (Retrofit): Init the network service
        return Retrofit.Builder()
            .baseUrl("https://raw.githubusercontent.com")
            .addConverterFactory(GsonConverterFactory.create(GsonBuilder().create()))
            .build()
            .create(MenuService::class.java)
    }

    @Singleton
    @Provides
    fun provideMenuMapper(): MenuDtoMapper {
        return MenuDtoMapper()
    }
}