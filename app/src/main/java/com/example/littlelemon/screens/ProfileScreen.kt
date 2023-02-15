package com.example.littlelemon.screens

import android.service.autofill.UserData
import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
import androidx.compose.material.MaterialTheme.colors
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.littlelemon.R
import com.example.littlelemon.data.UserStore
import com.example.littlelemon.navigation.Home
import com.example.littlelemon.navigation.Onboarding
import com.example.littlelemon.ui.theme.LittleLemonColor
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Composable
fun ProfileScreen(navController: NavHostController) {
    Column {
        Header()
        UserData(navController)
    }
}

@Preview(showBackground = true)
@Composable
fun ProfilePreview(){
    ProfileScreen(rememberNavController())
}

@Composable
fun UserData(navController: NavHostController) {
    val context = LocalContext.current
    val store = UserStore(context)

    var firstName by remember {
        mutableStateOf(TextFieldValue(""))
    }
    var lastName by remember {
        mutableStateOf(TextFieldValue(""))
    }
    var email by remember {
        mutableStateOf(TextFieldValue(""))
    }

    firstName = TextFieldValue(store.getString(UserStore.FIRST_NAME_KEY).collectAsState(initial = "").value)
    lastName = TextFieldValue(store.getString(UserStore.LAST_NAME_KEY).collectAsState(initial = "").value)
    email = TextFieldValue(store.getString(UserStore.EMAIL_KEY).collectAsState(initial = "").value)

    Column(modifier = Modifier.padding(10.dp)) {
        Text(
            text = "Personal information",
            color = Color(0xFF495E57),
            fontSize = 18.sp,
            fontWeight = FontWeight.SemiBold,
            modifier = Modifier.padding(vertical = 50.dp),
        )

        Text(
            text = "First name",
            color = Color(0xFF495E57)
        )
        TextField(
            value = firstName,
            onValueChange = {
                firstName = it
            },
            label = { Text(text = "") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 20.dp)
        )

        Text(
            text = "Last name",
            color = Color(0xFF495E57)
        )
        TextField(
            value = lastName,
            onValueChange = {
                lastName = it
            },
            label = { Text(text = "") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 20.dp)
        )

        Text(
            text = "Email",
            color = Color(0xFF495E57)
        )
        TextField(
            value = email,
            onValueChange = {
                email = it
            },
            label = { Text(text = "") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 20.dp)
        )
        Button(
            onClick = {
                CoroutineScope(Dispatchers.IO).launch {
                    store.clearData()
                }
                navController.navigate(Onboarding.route)
            },
            colors = ButtonDefaults.buttonColors(
                LittleLemonColor.yellow
            ),
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 30.dp)
        ) {
            Text(
                text = "Log out",
                color = LittleLemonColor.green
            )
        }
    }
}