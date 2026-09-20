package com.example.ecommerce.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.service.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    ProductService ps;

    @PostMapping
    public Product addProduct(
            @RequestParam("name") String name,
            @RequestParam("price") double price,
            @RequestParam("quantity") int quantity,
            @RequestParam("category") String category,
            @RequestParam("image") MultipartFile image)
            throws IOException {

        Product p = new Product();

        p.setName(name);
        p.setPrice(price);
        p.setQuantity(quantity);
        p.setCategory(category);

        // Image folder
        String uploadFolder =
                "src/main/resources/static/images/";

        // Folder doesn't exist -> create it
        Path folderPath =
                Paths.get(uploadFolder);

        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }

        // Get image name
        String fileName =
                image.getOriginalFilename();

        // Save image
        Path imagePath =
                folderPath.resolve(fileName);

        Files.write(
                imagePath,
                image.getBytes()
        );

        // Save image name in database
        p.setImage(fileName);

        return ps.addProduct(p);
    }

    @GetMapping
    public List<Product> getProducts() {
        return ps.getProducts();
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(
            @PathVariable int id) {

        ps.deleteProduct(id);
    }
}