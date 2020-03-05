package com.randima.bookservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class User {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    private String useremail;
    private String password;
    private String role;
    private boolean enabled;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE})
    List<Book_User> currentBooks = new ArrayList<Book_User>();

    @ManyToMany(mappedBy = "waitUsers", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Book> waitingBooks = new ArrayList<Book>();

    public User(String useremail, String password, String role, boolean enabled) {
        this.useremail = useremail;
        this.password = password;
        this.role = role;
        this.enabled = enabled;
    }

    public User(){
        this.enabled = false;
    }



}
