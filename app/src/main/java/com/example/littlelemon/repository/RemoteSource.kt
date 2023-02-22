package com.example.littlelemon.repository

import androidx.compose.ui.text.android.animation.SegmentType
import com.example.littlelemon.network.MenuItemNetwork
import com.example.littlelemon.network.MenuNetwork
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.android.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class RemoteSource {
    private val httpClient = HttpClient(Android) {
        install(ContentNegotiation) {
            json(contentType = ContentType("text", "plain"))
        }
    }

    // Using withContext to make sure your code runs in the background, not in the main thread.
    suspend fun fetchMenu(): List<MenuItemNetwork> = withContext(Dispatchers.IO) {
        httpClient
            .get("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu.json")
            .body<MenuNetwork>()
            .menu
    }
}