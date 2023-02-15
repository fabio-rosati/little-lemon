package com.example.littlelemon.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.littlelemon.data.UserStore
import com.example.littlelemon.screens.HomeScreen
import com.example.littlelemon.screens.OnboardingScreen
import com.example.littlelemon.screens.ProfileScreen

@Composable
fun Navigation() {
    val navController = rememberNavController()
    val store = UserStore(LocalContext.current)
    val userToken = store.getString(UserStore.USER_TOKEN_KEY).collectAsState(initial = "")
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