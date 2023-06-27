package com.fabiorosati.littlelemon.domain.model

// Generic mapper to convert Entity and Dto from/to domain model
interface DomainMapper <T, DomainModel>{

    fun mapToDomainModel(model: T): DomainModel

    fun mapFromDomainModel(domainModel: DomainModel): T
}