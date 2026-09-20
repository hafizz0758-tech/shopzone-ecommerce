package com.example.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.entity.Cart;
import com.example.ecommerce.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    CartService cs;


    // ================= ADD TO CART =================

    @PostMapping
    public Cart addToCart(@RequestBody Cart c) {

        return cs.addToCart(c);
    }


    // ================= GET USER CART =================

    @GetMapping
    public List<Cart> getCartItems(
            @RequestParam int userId) {

        return cs.getCartItems(userId);
    }


    // ================= UPDATE QUANTITY =================

    @PutMapping("/{id}")
    public Cart updateCart(
            @PathVariable int id,
            @RequestBody Cart c) {

        return cs.updateCart(id, c);
    }


    // ================= REMOVE ONE ITEM =================

    @DeleteMapping("/{id}")
    public void deleteCart(
            @PathVariable int id) {

        cs.deleteCart(id);
    }


    // ================= CLEAR USER CART =================

    @DeleteMapping("/clear")
    public void clearCart(
            @RequestParam int userId) {

        cs.clearCart(userId);
    }
}