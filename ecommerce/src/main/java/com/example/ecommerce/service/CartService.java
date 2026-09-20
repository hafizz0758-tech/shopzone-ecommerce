package com.example.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.entity.Cart;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.ProductRepository;

@Service
public class CartService {

    @Autowired
    CartRepository cr;

    @Autowired
    ProductRepository pr;


    // ================= ADD TO CART =================

    public Cart addToCart(Cart c) {

        Product product =
                pr.findById(c.getProductId()).orElse(null);

        if (product == null) {
            throw new RuntimeException("Product not found");
        }


        // Same user + same product
        Cart existing = cr.findByUserId(c.getUserId())
                .stream()
                .filter(item ->
                    item.getProductId() == c.getProductId()
                )
                .findFirst()
                .orElse(null);


        if (existing != null) {

            int newQuantity =
                    existing.getQuantity() + c.getQuantity();


            if (newQuantity > product.getQuantity()) {

                throw new RuntimeException(
                    "Only " + product.getQuantity()
                    + " items available"
                );
            }


            existing.setQuantity(newQuantity);

            return cr.save(existing);
        }


        if (c.getQuantity() > product.getQuantity()) {

            throw new RuntimeException(
                "Only " + product.getQuantity()
                + " items available"
            );
        }


        return cr.save(c);
    }


    // ================= GET USER CART =================

    public List<Cart> getCartItems(int userId) {

        return cr.findByUserId(userId);
    }


    // ================= UPDATE CART =================

    public Cart updateCart(int id, Cart c) {

        Cart existing =
                cr.findById(id).orElse(null);


        if (existing != null) {

            Product product =
                    pr.findById(c.getProductId()).orElse(null);


            if (product != null) {

                if (c.getQuantity() >
                        product.getQuantity()) {

                    throw new RuntimeException(
                        "Only " + product.getQuantity()
                        + " items available"
                    );
                }
            }


            existing.setProductId(c.getProductId());
            existing.setName(c.getName());
            existing.setPrice(c.getPrice());
            existing.setQuantity(c.getQuantity());
            existing.setImage(c.getImage());


            return cr.save(existing);
        }


        return null;
    }


    // ================= DELETE ONE ITEM =================

    public void deleteCart(int id) {

        cr.deleteById(id);
    }


    // ================= CLEAR USER CART =================

    public void clearCart(int userId) {

        List<Cart> carts =
                cr.findByUserId(userId);

        cr.deleteAll(carts);
    }
}