package com.example.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.entity.User;
import com.example.ecommerce.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository ur;

    public User registerUser(User user) {

        User existingUser =
                ur.findByEmail(user.getEmail());

        if (existingUser != null) {
            throw new RuntimeException(
                "Email already registered"
            );
        }

        return ur.save(user);
    }


    public User loginUser(String email, String password) {

        User user = ur.findByEmail(email);

        if (user == null) {
            throw new RuntimeException(
                "Email not registered"
            );
        }

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException(
                "Invalid password"
            );
        }

        return user;
    }
}