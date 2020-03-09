package com.randima.bookservice.model;

import lombok.Data;

@Data
public class User {
    private Integer id;
    private Long studentId;
    private String useremail;
    private String password;
    private String role;
    private boolean enabled;

}
