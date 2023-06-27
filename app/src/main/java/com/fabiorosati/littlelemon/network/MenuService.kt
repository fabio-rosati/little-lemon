package com.fabiorosati.littlelemon.network

import com.fabiorosati.littlelemon.network.model.MenuDto
import retrofit2.http.GET

// TODO Network 3 (Retrofit): Create the network interface

interface MenuService {

    @GET("/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu.json")
    suspend fun getMenu(
    ): MenuDto

//    @GET("search")
//    suspend fun search(
//        @Header("Authorization") token: String,
//        @Query("page") page: Int,
//        @Query("query") query: String
//    ): RecipeSearchResponse

//    @GET("get")
//    suspend fun get(
//        @Header("Authorization") token: String,
//        @Query("id") id: Int
//    ): RecipeDto
}