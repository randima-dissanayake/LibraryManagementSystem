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
    private String file_name;
    private boolean enabled;
    private boolean isDelete;
    @Lob
    private byte[] book_image;
    private String last_available_date;
    @Transient
    List<Transaction> currentUsers = new ArrayList<Transaction>();

//    @Transient
//    private List<User> waitUsers = new LinkedList<User>();

    public Book(String author, String title, String publisher, String year_of_publication, String location, int num_of_copies, boolean enabled, boolean isDelete, String last_available_date, byte[] book_image) {
        this.author = author;
        this.title = title;
        this.publisher = publisher;
        this.year_of_publication = year_of_publication;
        this.location = location;
        this.num_of_copies = num_of_copies;
        this.last_available_date = last_available_date;
        this.enabled = enabled;
        this.isDelete = isDelete;
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

    public String getFile_name() {
        return file_name;
    }

    public void setFile_name(String file_name) {
        this.file_name = file_name;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public String getLast_available_date() {
        return last_available_date;
    }

    public void setLast_available_date(String last_available_date) {
        this.last_available_date = last_available_date;
    }
}
