package com.randima.bookservice.model;

import lombok.Data;

@Data
public class User {
    private Integer id;
    private Integer universityId;
    private String userEmail;
    private boolean enabled;
    private String firstName;
    private String lastName;
    private boolean isDelete;

}
