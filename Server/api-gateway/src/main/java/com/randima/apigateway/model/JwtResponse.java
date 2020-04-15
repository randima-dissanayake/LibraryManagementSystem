package com.randima.apigateway.model;

import com.randima.apigateway.service.JwtUserDetailsService;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private final LibUser libUser = JwtUserDetailsService.libUser;

    public JwtResponse(String jwttoken) {
        this.jwttoken = jwttoken;

    }

    public LibUser getLibUser() {
        return libUser;
    }

    public String getToken() {
        return this.jwttoken;
    }
}
