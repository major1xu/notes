package com.okta.developer.notes

import org.springframework.boot.ApplicationRunner
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.SpringApplication
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.stereotype.Component

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@SpringBootApplication
class NotesApplication

fun main(args: Array<String>) {
	SpringApplication.run(NotesApplication::class.java, *args)
}

@Entity
data class Note(@Id @GeneratedValue var id: Long? = null,
				var text: String? = null, var user: String? = null)

@RepositoryRestResource
interface NotesRepository : JpaRepository<Note, Long>

@Component
class DataInitializer(val repository: NotesRepository) : ApplicationRunner {

	@Throws(Exception::class)
	override fun run(args: ApplicationArguments) {
		listOf("Note 1", "Note 2", "Note 3").forEach {
			repository.save(Note(text = it, user = "user"))
		}
		repository.findAll().forEach { println(it) }
	}
}