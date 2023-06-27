package com.fabiorosati.littlelemon.network.model

import com.fabiorosati.littlelemon.domain.model.DomainMapper
import com.fabiorosati.littlelemon.domain.model.MenuItem

// TODO Network 2 (Retrofit): Create the dto mapper and implement the domain one

class MenuDtoMapper: DomainMapper<MenuItemDto, MenuItem> {

    override fun mapToDomainModel(model: MenuItemDto): MenuItem {
        return MenuItem(
            id = model.id,
            title = model.title,
            description = model.description,
            price = model.price,
            image = model.image,
            category = model.category,
        )
    }

    override fun mapFromDomainModel(domainModel: MenuItem): MenuItemDto {
        return MenuItemDto(
            id = domainModel.id,
            title = domainModel.title,
            description = domainModel.description,
            price = domainModel.price,
            image = domainModel.image,
            category = domainModel.category,
        )
    }

    fun toDomainList(initial: List<MenuItemDto>): List<MenuItem>{
        return initial.map { mapToDomainModel(it) }
    }

    fun fromDomainList(initial: List<MenuItem>): List<MenuItemDto>{
        return initial.map { mapFromDomainModel(it) }
    }

}