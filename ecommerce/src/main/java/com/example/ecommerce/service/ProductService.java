package com.example.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    ProductRepository pr;


    // Add Product
    public Product addProduct(Product p) {

        return pr.save(p);

    }


    // Get All Products
    public List<Product> getProducts() {

        return pr.findAll();

    }


    // Delete Product
    public void deleteProduct(int id) {

        pr.deleteById(id);

    }

}