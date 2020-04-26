package com.randima.apigateway.controller;

import com.randima.apigateway.config.JwtTokenUtil;
import com.randima.apigateway.model.*;
import com.randima.apigateway.service.JwtUserDetailsService;
import com.randima.apigateway.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class JwtAuthenticationController {

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

//    @Autowired
//    UserService userService;
//
//    @RequestMapping(value = "/user",method = RequestMethod.GET)
//    public List<User> getAll(@RequestHeader HttpHeaders headers){
//        System.out.println("tttttttttt "+headers.getContentType());
//        return userService.getAll();
//    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        String token = userDetailsService.createAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword());
//        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
//
//        final UserDetails userDetails = userDetailsService
//                .loadUserByUsername(authenticationRequest.getUsername());
//
//        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody UserModel userModel) throws Exception {
        LibUser libUser = new LibUser();
        libUser.setUsername(userModel.getUsername());
        libUser.setPassword(bcryptEncoder.encode(userModel.getPassword()));
        libUser.setDelete(false);
        libUser.setRoles(userModel.getRoles());
        libUser.setUniversityId(userModel.getUniversityId());
        LibUser savedLibUser = userDetailsService.save(libUser);
        if (savedLibUser == null){
            return null;

        } else {
            User user=new User();
            user.setFirstName(userModel.getFirstName());
            user.setLastName(userModel.getLastName());
            user.setUniversityId(userModel.getUniversityId());
            user.setUsername(userModel.getUsername());
            user.setTelephones(userModel.getTelephones());
            String token = userDetailsService.createAuthenticationToken(userModel.getUsername(),userModel.getPassword());
            System.out.println("token    " +token);
            User user_submitted = userService.saveInUserService(user,token);
            System.out.println("user saved   "+user_submitted);
            if (user_submitted==null){
                userDetailsService.delete(userModel.getUniversityId());
                return null;
            } else {
                return ResponseEntity.ok(user_submitted);
            }
        }

    }

//    @PreAuthorize("hasRole('LIBRARIAN')")
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<LibUser> getAll() {
        return userDetailsService.getAll();
    }

    @RequestMapping(value = "/delete/{uid}", method = RequestMethod.DELETE)
    public LibUser deleteUser(@PathVariable Integer uid) {
        return userDetailsService.deleteUser(uid);
    }



}
