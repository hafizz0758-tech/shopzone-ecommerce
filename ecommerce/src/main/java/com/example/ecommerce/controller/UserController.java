package com.example.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.dto.UserResponse;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    UserService us;


    // ================= REGISTER =================

    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody User user) {

        User savedUser = us.registerUser(user);

        return new UserResponse(
            savedUser.getId(),
            savedUser.getName(),
            savedUser.getEmail()
        );
    }


    // ================= LOGIN =================

    @PostMapping("/login")
    public UserResponse loginUser(@RequestBody User user) {

        User loggedInUser =
                us.loginUser(
                    user.getEmail(),
                    user.getPassword()
                );

        return new UserResponse(
            loggedInUser.getId(),
            loggedInUser.getName(),
            loggedInUser.getEmail()
        );
    }
}