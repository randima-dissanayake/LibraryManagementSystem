package com.randima.userservice.model;

import com.randima.userservice.service.JwtUserDetailsService;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private final User user = JwtUserDetailsService.user;

    public JwtResponse(String jwttoken) {
        this.jwttoken = jwttoken;

    }

    public User getUser() {
        return user;
    }

    public String getToken() {
        return this.jwttoken;
    }
}
