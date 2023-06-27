package com.fabiorosati.littlelemon.presentation.ui.home

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavHostController
import com.fabiorosati.littlelemon.R
import com.fabiorosati.littlelemon.navigation.Profile
import androidx.hilt.navigation.compose.hiltViewModel
import com.bumptech.glide.integration.compose.ExperimentalGlideComposeApi
import com.fabiorosati.littlelemon.presentation.ui.theme.LittleLemonColor
import com.bumptech.glide.integration.compose.GlideImage
import androidx.compose.runtime.livedata.observeAsState
import com.fabiorosati.littlelemon.domain.model.MenuItem
import com.fabiorosati.littlelemon.utils.filterByCategory
import com.fabiorosati.littlelemon.utils.filterBySearchPhrase

@Composable
fun HomeScreen(navController: NavHostController, viewModel: MenuViewModel = hiltViewModel()) {

    val databaseMenuItems = viewModel.menu.observeAsState(emptyList()).value
    val filteredMenu = databaseMenuItems
        .filterByCategory(viewModel.selectedCategories)
        .filterBySearchPhrase(viewModel.searchPhrase.value.text)

    Column {
        HomeHeader(navController)
        LazyColumn(
            modifier = Modifier
                .fillMaxHeight()
        ) {
            item {
                HomeHero(viewModel)
                Filters(viewModel)
                Divider(
                    modifier = Modifier.padding(horizontal = 10.dp),
                    thickness = 1.dp,
                    color = LittleLemonColor.charcoal
                )
            }
            items(filteredMenu) {menuItem ->
                MenuItem(menuItem)
                Divider(
                    modifier = Modifier.padding(horizontal = 10.dp),
                    thickness = 1.dp,
                    color = LittleLemonColor.cloud
                )
            }
        }
    }
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

@Composable
fun HomeHero(viewModel: MenuViewModel) {
//    val viewModel: ViewModel = hiltViewModel()

    Column(modifier = Modifier
        .background(LittleLemonColor.green)
        .fillMaxWidth()
        .padding(horizontal = 10.dp, vertical = 20.dp)
    ) {
        Text(
            text = "Little Lemon",
            color = LittleLemonColor.yellow,
            fontSize = 40.sp,
            fontWeight = FontWeight.SemiBold,
        )
        Row() {
            Column(modifier = Modifier
                .weight(0.5f)
            ) {
                Text(
                    text = "Chicago",
                    color = LittleLemonColor.cloud,
                    fontSize = 30.sp,
                    fontWeight = FontWeight.SemiBold,
                )
                Text(
                    text = "We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.",
                    color = LittleLemonColor.cloud,
                    fontSize = 16.sp,
//                    fontWeight = FontWeight.Bold,
                )
            }
            Image(
                painter = painterResource(id = R.drawable.upperpanelimage),
                contentDescription = "Food image",
                modifier = Modifier
                    .weight(0.5f)
                    .align(alignment = Alignment.CenterVertically)
                    .padding(10.dp)
                    .clip(RoundedCornerShape(20.dp))
            )
        }
        TextField(
            value = viewModel.searchPhrase.value,
            colors = TextFieldDefaults.textFieldColors(
                backgroundColor = LittleLemonColor.cloud,
                textColor = LittleLemonColor.charcoal,
                cursorColor = LittleLemonColor.charcoal,
                focusedIndicatorColor = LittleLemonColor.charcoal,
            ),
            leadingIcon = { Icon(
                imageVector = Icons.Default.Search,
                contentDescription = "emailIcon"
            ) },
            onValueChange = {
                viewModel.searchPhrase.value = it
            },
            placeholder = { Text(text = "Enter search phrase") },
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(5.dp))
        )
    }
}

@Composable
fun Filters(viewModel: MenuViewModel) {
    val categories = listOf("Starters", "Mains", "Desserts", "Drinks")

    Column(modifier = Modifier
        .padding(horizontal = 10.dp, vertical = 20.dp)
    ) {
        Text(
            text = "ORDER FOR DELIVERY!",
            color = LittleLemonColor.charcoal,
            fontSize = 16.sp,
            fontWeight = FontWeight.SemiBold,
            modifier = Modifier.padding(bottom = 10.dp)
        )
        LazyRow {
            items(items = categories, itemContent = { category ->
                Button(
                    onClick = {
                        if(viewModel.selectedCategories.contains(category)){
                            viewModel.selectedCategories.remove(category)
                        } else {
                            viewModel.selectedCategories.add(category)
                        }
                    },
                    shape = RoundedCornerShape(23.dp),
                    colors = ButtonDefaults.buttonColors(
                        if(viewModel.selectedCategories.contains(category)){
                            LittleLemonColor.green
                        } else {
                            LittleLemonColor.cloud
                        }
                    ),
                    modifier = Modifier.width(120.dp)
                ) {
                    Text(
                        text = category,
                        color =
                            if(viewModel.selectedCategories.contains(category)){
                                LittleLemonColor.cloud
                            } else {
                                LittleLemonColor.charcoal
                            }
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
            })
        }
    }
}

@OptIn(ExperimentalGlideComposeApi::class)
@Composable
fun MenuItem(
//    navController: NavHostController? = null,
    menuItem: MenuItem
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 10.dp, vertical = 20.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column(modifier = Modifier
            .weight(0.6f)
        ) {
            Text(
                modifier = Modifier.padding(bottom = 10.dp),
                text = menuItem.title,
                style = MaterialTheme.typography.h5
            )
            Text(
                modifier = Modifier.padding(bottom = 10.dp),
                text = menuItem.description,
                style = MaterialTheme.typography.body2
            )
            Text(
                text = "$"+"%.2f".format(menuItem.price),
                style = MaterialTheme.typography.body1
            )
        }
        GlideImage(
            model = menuItem.image,
            contentDescription = "Food image",
            modifier = Modifier
                .weight(0.4f)
                .align(alignment = Alignment.CenterVertically)
                .padding(10.dp)
                .clip(RoundedCornerShape(5.dp))
        )
    }
}