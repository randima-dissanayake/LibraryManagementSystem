package com.randima.userservice.model;

import lombok.Data;

@Data
public class Book {
    private Integer id;
    private String title;
    private String author;
    private String publisher;
    private String year_of_publication;
    private String location;
    private Integer num_of_copies;
}
