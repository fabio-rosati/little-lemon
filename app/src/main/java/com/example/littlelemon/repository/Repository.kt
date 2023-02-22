package com.example.littlelemon.repository

import com.example.littlelemon.data.AppDatabase

class Repository (
    private val remoteSource: RemoteSource,
    private val localSource: LocalSource,
) {
    constructor(database: AppDatabase) : this(
        remoteSource = RemoteSource(),
        localSource = LocalSource(database),
    )

    suspend fun getMenu() = localSource.ensureIsNotEmpty().all()

    private suspend fun LocalSource.ensureIsNotEmpty() = apply {
        if(isEmpty()) {
            val words = remoteSource.fetchMenu()
            saveMenuToDatabase(words)
        }
    }
}