package com.fabiorosati.littlelemon.database.model

import com.fabiorosati.littlelemon.domain.model.DomainMapper
import com.fabiorosati.littlelemon.domain.model.MenuItem

// TODO Database 2 (Room): Create the entity mapper and implement the domain one

class MenuEntityMapper : DomainMapper<MenuItemEntity, MenuItem> {

    override fun mapToDomainModel(model: MenuItemEntity): MenuItem {
        return MenuItem(
            id = model.id,
            title = model.title,
            description = model.description,
            price = model.price,
            image = model.image,
            category = model.category,
        )
    }

    override fun mapFromDomainModel(domainModel: MenuItem): MenuItemEntity {
        return MenuItemEntity(
            id = domainModel.id,
            title = domainModel.title,
            description = domainModel.description,
            price = domainModel.price,
            image = domainModel.image,
            category = domainModel.category,
        )
    }

    fun toDomainList(initial: List<MenuItemEntity>): List<MenuItem>{
        return initial.map { mapToDomainModel(it) }
    }

    fun fromDomainList(initial: List<MenuItem>): List<MenuItemEntity>{
        return initial.map { mapFromDomainModel(it) }
    }

}