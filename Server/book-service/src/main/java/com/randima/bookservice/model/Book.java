package com.randima.bookservice.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Book {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    private String isbn;
    private String title;
    private String author;
    private String publisher;
    private String year_of_publication;
    private String location;
    private Integer num_of_copies;
    @Lob
    private byte[] book_image;
//    private String last_available_date;
    @Transient
    List<Transaction> currentUsers = new ArrayList<Transaction>();

//    @Transient
//    private List<User> waitUsers = new LinkedList<User>();

    public Book(String author, String title, String publisher, String year_of_publication, String location, int num_of_copies, byte[] book_image) {
        this.author = author;
        this.title = title;
        this.publisher = publisher;
        this.year_of_publication = year_of_publication;
        this.location = location;
        this.num_of_copies = num_of_copies;
//        this.last_available_date = null;

    }

    public Book() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getYear_of_publication() {
        return year_of_publication;
    }

    public void setYear_of_publication(String year_of_publication) {
        this.year_of_publication = year_of_publication;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getNum_of_copies() {
        return num_of_copies;
    }

    public void setNum_of_copies(Integer num_of_copies) {
        this.num_of_copies = num_of_copies;
    }

    public List<Transaction> getCurrentUsers() {
        return currentUsers;
    }

    public void setCurrentUsers(List<Transaction> currentUsers) {
        this.currentUsers = currentUsers;
    }

    public byte[] getBook_image() {
        return book_image;
    }

    public void setBook_image(byte[] book_image) {
        this.book_image = book_image;
    }
}
