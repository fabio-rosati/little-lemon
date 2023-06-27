package com.fabiorosati.littlelemon.presentation.ui.home

import androidx.compose.runtime.*
import androidx.compose.ui.text.input.TextFieldValue
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.fabiorosati.littlelemon.domain.model.MenuItem
import com.fabiorosati.littlelemon.repository.MenuRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

// TODO Hilt 4: Inject dependency
@HiltViewModel
class MenuViewModel
@Inject constructor(
    private val repository: MenuRepository
) : ViewModel() {

    private var _menu = MutableLiveData<List<MenuItem>>()
    var menu: LiveData<List<MenuItem>> = _menu

    val selectedCategories = mutableStateListOf<String>()
    var searchPhrase = mutableStateOf(TextFieldValue(""))

    init {
        getMenu()
    }

    fun getMenu() {
        // Dispatchers.IO needed for database operations
        viewModelScope.launch(Dispatchers.IO) {
            _menu.postValue(repository.getMenu())
        }
    }
}