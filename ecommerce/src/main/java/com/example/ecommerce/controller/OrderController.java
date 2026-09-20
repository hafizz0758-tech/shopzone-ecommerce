package com.example.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.entity.Order;
import com.example.ecommerce.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    OrderService os;


    // Save Order
    @PostMapping
    public Order saveOrder(@RequestBody Order o) {

        return os.saveOrder(o);

    }


    // Get current user's orders
    @GetMapping
    public List<Order> getOrders(
            @RequestParam int userId) {

        return os.getOrdersByUser(userId);

    }

    @GetMapping("/all")
    public List<Order> getAllOrders() {

        return os.getAllOrders();

    }
}