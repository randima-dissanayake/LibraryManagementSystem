package com.randima.transactionservice.model;

public class Book {
    private Integer id;
    private String isbn;
    private String title;
    private String author;
    private String publisher;
    private String year_of_publication;
    private String location;
    private Integer num_of_copies;
    private byte[] book_image;

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public byte[] getBook_image() {
        return book_image;
    }

    public void setBook_image(byte[] book_image) {
        this.book_image = book_image;
    }
}
