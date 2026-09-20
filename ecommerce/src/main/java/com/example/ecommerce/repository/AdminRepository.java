package com.example.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Admin findByEmail(String email);

}