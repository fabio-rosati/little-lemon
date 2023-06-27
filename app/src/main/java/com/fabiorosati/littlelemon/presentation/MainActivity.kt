package com.fabiorosati.littlelemon.presentation

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.ui.Modifier
import com.fabiorosati.littlelemon.navigation.Navigation
import com.fabiorosati.littlelemon.presentation.ui.home.MenuViewModel
import com.fabiorosati.littlelemon.presentation.ui.theme.LittleLemonTheme
import dagger.hilt.android.AndroidEntryPoint

// TODO Hilt 5: Set the entry point
@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    // ViewModel as single scope
    private val viewModel: MenuViewModel by viewModels()
    // ViewModel as global scope (shared ViewModel)
//    private val sharedViewModel: MenuViewModel by activityViewModels() // do this in fragment

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            LittleLemonTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    Navigation()
                }
            }
        }

    }
}