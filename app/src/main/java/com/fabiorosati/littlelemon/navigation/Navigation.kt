package com.fabiorosati.littlelemon.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.fabiorosati.littlelemon.datastore.DataStore
import com.fabiorosati.littlelemon.presentation.ui.home.HomeScreen
import com.fabiorosati.littlelemon.presentation.ui.onboarding.OnboardingScreen
import com.fabiorosati.littlelemon.presentation.ui.profile.ProfileScreen

@Composable
fun Navigation() {
    val navController = rememberNavController()
    val store = DataStore(LocalContext.current)
    val userToken = store.getString(DataStore.USER_TOKEN_KEY).collectAsState(initial = "")
    val isLoggedIn = userToken.value.isNotBlank()

    NavHost(
        navController = navController,
        startDestination = if (isLoggedIn) Home.route else Onboarding.route
    ) {
        composable(Home.route){
            HomeScreen(navController)
        }
        composable(Onboarding.route) {
            OnboardingScreen(navController)
        }
        composable(Profile.route) {
            ProfileScreen(navController)
        }
    }
}