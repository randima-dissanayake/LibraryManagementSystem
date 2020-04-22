package com.randima.userservice.model;

import lombok.Data;
import lombok.extern.apachecommons.CommonsLog;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class User {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private Integer universityId;
    private String userEmail;
    private boolean isDelete = false;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval=true)
    private List<Telephone> telephones;
    @Transient
    private List<Book> currentBookList = new ArrayList<Book>();
//    private List<Book> waitingList = new ArrayList<Book>();

    public User(User user) {
        this.universityId = user.getUniversityId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.userEmail = user.getUserEmail();
        this.telephones = user.getTelephones();
    }
    public  User(){

    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUniversityId() {
        return universityId;
    }

    public void setUniversityId(Integer universityId) {
        this.universityId = universityId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public List<Book> getCurrentBookList() {
        return currentBookList;
    }

    public void setCurrentBookList(List<Book> currentBookList) {
        this.currentBookList = currentBookList;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<Telephone> getTelephones() {
        return telephones;
    }

    public void setTelephones(List<Telephone> telephones) {
        this.telephones = telephones;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }
}
