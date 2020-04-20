package com.randima.userservice.model;

import lombok.Data;

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
    private String studentId;
    private String username;
    private String password;
    private String role;
    private boolean enabled;
    private boolean isDelete = false;
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval=true)
//    private List<Telephone> telephones;
    private String telephone;
    @Transient
    private List<Book> currentBookList = new ArrayList<Book>();
//    private List<Book> waitingList = new ArrayList<Book>();

    public User(User user) {
        this.studentId = user.getStudentId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.role = user.getRole();
        this.isDelete = user.isDelete();
        this.telephone = user.getTelephone();
        this.enabled = user.isEnabled();
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

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

//    public List<Telephone> getTelephones() {
//        return telephones;
//    }
//
//    public void setTelephones(List<Telephone> telephones) {
//        this.telephones = telephones;
//    }


    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
