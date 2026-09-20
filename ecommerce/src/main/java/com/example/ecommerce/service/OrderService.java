package com.example.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ecommerce.entity.Cart;
import com.example.ecommerce.entity.Order;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;

@Service
public class OrderService {

    @Autowired
    OrderRepository or;

    @Autowired
    CartRepository cr;

    @Autowired
    ProductRepository pr;


    // Place Order
    @Transactional
    public Order saveOrder(Order o) {

        // Get user's cart
        List<Cart> carts =
                cr.findByUserId(o.getUserId());


        // Check cart
        if (carts.isEmpty()) {

            throw new RuntimeException(
                "Cart is empty"
            );

        }


        String productNames = "";

        int totalQuantity = 0;


        // Check every cart item
        for (Cart cart : carts) {

            Product product =
                    pr.findById(
                        cart.getProductId()
                    ).orElse(null);


            // Product check
            if (product == null) {

                throw new RuntimeException(
                    "Product not found: "
                    + cart.getName()
                );

            }


            // Stock check
            if (cart.getQuantity()
                    > product.getQuantity()) {

                throw new RuntimeException(
                    "Only "
                    + product.getQuantity()
                    + " items available for "
                    + product.getName()
                );

            }


            // Reduce product stock
            product.setQuantity(
                product.getQuantity()
                - cart.getQuantity()
            );


            // Save updated product
            pr.save(product);


            // Add product name
            if (!productNames.isEmpty()) {

                productNames += ", ";

            }

            productNames += product.getName();


            // Calculate total quantity
            totalQuantity += cart.getQuantity();

        }


        // Set product names in order
        o.setProductName(productNames);


        // Set total quantity
        o.setQuantity(totalQuantity);


        // Save order
        Order savedOrder =
                or.save(o);


        // Clear user's cart
        cr.deleteAll(carts);


        // Return saved order
        return savedOrder;

    }


    // Get all orders
    public List<Order> getAllOrders() {

        return or.findAll();

    }


    // Get orders of particular user
    public List<Order> getOrdersByUser(
            int userId) {

        return or.findByUserId(userId);

    }

}