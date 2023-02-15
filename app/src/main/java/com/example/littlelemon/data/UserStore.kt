package com.example.littlelemon.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class UserStore(private val context: Context) {
    companion object {
        private val Context.dataStore: DataStore<Preferences> by preferencesDataStore("userData")

        const val USER_TOKEN_KEY = "user_token"
        const val FIRST_NAME_KEY = "first_name"
        const val LAST_NAME_KEY = "last_name"
        const val EMAIL_KEY = "email"
    }

    fun getString(key: String): Flow<String> {
        return context.dataStore.data.map { preferences ->
            preferences[stringPreferencesKey(key)] ?: ""
        }
    }

    suspend fun saveString(key: String, value: String) {
        context.dataStore.edit { preferences ->
            preferences[stringPreferencesKey(key)] = value
        }
    }

    suspend fun clearData() {
        context.dataStore.edit {
            it.clear()
        }
    }
}