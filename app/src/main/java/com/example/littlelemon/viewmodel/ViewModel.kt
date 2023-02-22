package com.example.littlelemon.viewmodel

import android.app.Application
import android.util.Log
import androidx.compose.runtime.*
import androidx.compose.ui.text.input.TextFieldValue
import androidx.lifecycle.*
import com.example.littlelemon.LittleLemonApp
import com.example.littlelemon.data.MenuItemRoom
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ViewModel @Inject constructor(
    application: Application
) : AndroidViewModel(application) {

    private val repository = getApplication<LittleLemonApp>().repository

//    val menu = MutableStateFlow<List<MenuItemRoom>>(emptyList())
//    var menu: LiveData<List<MenuItemRoom>> = MutableLiveData()
    private var _menu = MutableLiveData<List<MenuItemRoom>>()
    var menu: LiveData<List<MenuItemRoom>> = _menu

    val selectedCategories = mutableStateListOf<String>()
    var searchPhrase = mutableStateOf(TextFieldValue(""))

    init {
        loadMenu()
    }

    fun loadMenu() = effect {
//        menu = repository.getMenu() // var menu: LiveData<List<MenuItemRoom>> = MutableLiveData()
        _menu.postValue(repository.getMenu())
    }

    private fun effect(block: suspend () -> Unit) {
        viewModelScope.launch(Dispatchers.IO) { block() }
    }
}