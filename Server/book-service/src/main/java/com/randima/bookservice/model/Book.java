package com.randima.bookservice.model;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
@Data
public class Book {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    private String title;
    private String author;
    private String publisher;
    private String yearOfPublication;
    private String locationInTheLibrary;
    private Integer numberOfCopies;
//    private byte[] coverageImage;
    @OneToMany(mappedBy = "book", cascade = {CascadeType.REMOVE})
    List<Book_User> currentUsers = new ArrayList<Book_User>();

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable
            (
                    joinColumns = {@JoinColumn(name = "book_id", referencedColumnName = "id")},
                    inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)}
            )
    private List<User> waitUsers = new LinkedList<User>();
}
