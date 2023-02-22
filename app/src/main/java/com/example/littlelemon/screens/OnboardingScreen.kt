package com.example.littlelemon.screens
import android.widget.Toast
import com.example.littlelemon.R

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Button
import androidx.compose.material.ButtonDefaults
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
import com.example.littlelemon.data.DataStore
import com.example.littlelemon.data.DataStore.Companion.EMAIL_KEY
import com.example.littlelemon.data.DataStore.Companion.FIRST_NAME_KEY
import com.example.littlelemon.data.DataStore.Companion.LAST_NAME_KEY
import com.example.littlelemon.data.DataStore.Companion.USER_TOKEN_KEY
import com.example.littlelemon.navigation.Home
import com.example.littlelemon.ui.theme.LittleLemonColor
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Composable
fun OnboardingScreen(navController: NavHostController) {
    Column(modifier = Modifier
        .verticalScroll(rememberScrollState())
    ) {
        Header()
        Hero()
        Body(navController)
    }
}

@Preview(showBackground = true)
@Composable
fun OnboardingScreenPreview(){
    OnboardingScreen(rememberNavController())
}

@Composable
fun Header() {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
        modifier = Modifier.fillMaxWidth()
    ) {
        Image(
            painter = painterResource(
                id = R.drawable.littlelemonimgtxt_nobg
            ),
            contentDescription = "Logo Image",
            modifier = Modifier
                .padding(15.dp)
                .height(50.dp)
        )
    }
}

@Composable
fun Hero() {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
        modifier = Modifier
            .background(LittleLemonColor.green)
            .fillMaxWidth()
            .padding(vertical = 50.dp)
    ) {
        Text(
            text = "Let's get to know you",
            color = LittleLemonColor.cloud,
            fontSize = 28.sp,
//            fontWeight = FontWeight.Bold,
        )
    }
}

@Composable
fun Body(navController: NavHostController) {
    val context = LocalContext.current
    val store = DataStore(context)

    var firstName by remember {
        mutableStateOf(TextFieldValue(""))
    }
    var lastName by remember {
        mutableStateOf(TextFieldValue(""))
    }
    var email by remember {
        mutableStateOf(TextFieldValue(""))
    }

    val validValues =
        firstName.text.isNotBlank()
        && lastName.text.isNotBlank()
        && email.text.isNotBlank()

    Column(modifier = Modifier.padding(10.dp)) {
//        Text(
//            text = "Personal information",
//            color = Color(0xFF495E57),
//            fontSize = 18.sp,
//            fontWeight = FontWeight.SemiBold,
//            modifier = Modifier.padding(vertical = 50.dp),
//        )

        Text(
            text = "First name",
            color = Color(0xFF495E57)
        )
        TextField(
            value = firstName,
            onValueChange = {
                firstName = it
            },
            label = { Text(text = "Type your first name") },
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
            label = { Text(text = "Type your last name") },
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
            label = { Text(text = "Type your email") },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 20.dp)
        )
        Button(
            onClick = {
                if (validValues) {
                    CoroutineScope(Dispatchers.IO).launch {
                        store.saveString(FIRST_NAME_KEY, firstName.text)
                        store.saveString(LAST_NAME_KEY, lastName.text)
                        store.saveString(EMAIL_KEY, email.text)
                        store.saveString(USER_TOKEN_KEY, "dummy_user_token")
                    }
                    navController.navigate(Home.route)
                }
                else Toast.makeText(context,"Registration unsuccessful. Please enter all data", Toast.LENGTH_SHORT).show()
            },
            colors = ButtonDefaults.buttonColors(
                if (validValues) LittleLemonColor.yellow
                else LittleLemonColor.yellowInactive
            ),
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 30.dp)
        ) {
            Text(
                text = "Register",
                color = LittleLemonColor.green
            )
        }
    }
}