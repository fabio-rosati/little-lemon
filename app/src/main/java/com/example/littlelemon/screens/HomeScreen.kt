package com.example.littlelemon.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.littlelemon.R
import com.example.littlelemon.navigation.Profile

@Composable
fun HomeScreen(navController: NavHostController) {
    Column{
        HomeHeader(navController)
        Image(
            painter = painterResource(id = R.drawable.upperpanelimage),
            contentDescription = "",
            modifier = Modifier
                .padding(15.dp)
                .fillMaxHeight()
        )
    }
}

@Preview(showBackground = true)
@Composable
fun HomeScreenPreview(){
    HomeScreen(rememberNavController())
}

@Composable
fun HomeHeader(navController: NavHostController) {
    Box(modifier = Modifier
        .fillMaxWidth(),
    ) {
        Image(
            painter = painterResource(id = R.drawable.littlelemonimgtxt_nobg),
            contentDescription = "Logo Image",
            modifier = Modifier
                .padding(15.dp)
                .height(50.dp)
                .align(Alignment.Center)
        )
        Image(
            painter = painterResource(id = R.drawable.profile),
            contentDescription = "Profile Image",
            modifier = Modifier
                .padding(15.dp)
                .height(50.dp)
                .align(Alignment.TopEnd)
                .clickable { navController.navigate(Profile.route) }
        )
    }
}