package com.example.ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    List<Cart> findByUserId(int userId);

}