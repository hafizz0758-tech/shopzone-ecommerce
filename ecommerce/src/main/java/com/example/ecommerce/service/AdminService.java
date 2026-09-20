package com.example.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.entity.Admin;
import com.example.ecommerce.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    AdminRepository ar;

    public Admin loginAdmin(String email, String password) {

        Admin admin = ar.findByEmail(email);

        if (admin == null) {
            throw new RuntimeException(
                "Admin email not found"
            );
        }

        if (!admin.getPassword().equals(password)) {
            throw new RuntimeException(
                "Invalid admin password"
            );
        }

        return admin;
    }
}