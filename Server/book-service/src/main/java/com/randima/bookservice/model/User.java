package com.randima.bookservice.model;

import lombok.Data;

@Data
public class User {
    private Integer id;
    private String studentId;
    private String userEmail;
    private String password;
    private String role;
    private boolean enabled;

}
