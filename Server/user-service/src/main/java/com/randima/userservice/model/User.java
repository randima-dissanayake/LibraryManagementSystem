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
    private String studentId;
    private String userEmail;
    private String password;
    private String role;
    private boolean enabled;
    @Transient
    private List<Transaction> currentBookList = new ArrayList<Transaction>();
//    private List<Book> waitingList = new ArrayList<Book>();

    public User(User user) {
        this.studentId = user.getStudentId();
        this.userEmail = user.getUseremail();
        this.password = user.getPassword();
        this.role = user.getRole();
        this.enabled = user.isEnabled();
    }
    public  User(){

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

    public String getUseremail() {
        return userEmail;
    }

    public void setUseremail(String useremail) {
        this.userEmail = useremail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public List<Transaction> getCurrentBookList() {
        return currentBookList;
    }

    public void setCurrentBookList(List<Transaction> currentBookList) {
        this.currentBookList = currentBookList;
    }

}
