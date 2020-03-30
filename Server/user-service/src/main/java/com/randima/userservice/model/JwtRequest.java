package com.randima.userservice.model;

import java.io.Serializable;

public class JwtRequest implements Serializable {
    private static final long serialVersionUID = 5926468583005150707L;

    private String userEmail;
    private String password;

    //need default constructor for JSON Parsing
    public JwtRequest()
    {

    }

    public JwtRequest(String userEmail, String password) {
        this.setUserEmail(userEmail);
        this.setPassword(password);
        System.out.println("constructor "+userEmail);
    }

    public String getUserEmail() {
        return this.userEmail;
    }

    public void setUserEmail(String username) {
        this.userEmail = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
