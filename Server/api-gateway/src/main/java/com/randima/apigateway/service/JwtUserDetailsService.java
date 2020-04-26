package com.randima.apigateway.service;

import com.randima.apigateway.config.JwtTokenUtil;
import com.randima.apigateway.model.*;
import com.randima.apigateway.repository.RoleRepository;
import com.randima.apigateway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    public static LibUser libUser;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        libUser = userRepository.findByUsername(username);
        if (libUser == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(libUser.getUsername(), libUser.getPassword(),
                new ArrayList<>());
//        return user;
    }

    public LibUser save(LibUser libUser) throws Exception {
//        LibUser user = userRepository.findByUsername(libUser.getUsername());
//        if (user == null) {
            for (Role r : libUser.getRoles()) {
                r.setUser(libUser);
            }
            return userRepository.save(libUser);
//        } else {
//            return null;
//        }

    }

    public String createAuthenticationToken(String username, String password) throws Exception {
        authenticate(username, password);
        final UserDetails userDetails = loadUserByUsername(username);
        System.out.println("create Authentication token method    " + userDetails);
        return jwtTokenUtil.generateToken(userDetails);
    }

    private void authenticate(String userEmail, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userEmail, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    public List<LibUser> getAll() {
        return userRepository.findAll();
    }

    public LibUser deleteUser(Integer uid) {
        User user = userService.deleteUser(uid);
        if (user!=null){
            LibUser libUser = userRepository.findByUniversityId(uid);
            libUser.setDelete(true);
            return userRepository.save(libUser);
        }
        return null;
    }

    public void delete(Integer uid){
        System.out.println("is delete   "+uid);
        userRepository.deleteById(userRepository.findByUniversityId(uid).getId());
    }
}
