package com.randima.apigateway.service;

import com.randima.apigateway.model.Role;
import com.randima.apigateway.model.User;
import com.randima.apigateway.repository.RoleRepository;
import com.randima.apigateway.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    public static User user;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
//        return user;
    }

    public User save(User user) {
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        for (Role r : user.getRoles()) {
            r.setUsers(user);
        }
//        roleRepository.saveAll(user.getRoles());
        return userRepository.save(user);
    }
}
