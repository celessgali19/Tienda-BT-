package com.carrito.product_service.service;

import com.carrito.product_service.model.Product;
import com.carrito.product_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> updateProduct(Integer id, Product updatedProduct) {
        return productRepository.findById(id)
                .map(existing -> {
                    existing.setName(updatedProduct.getName());
                    existing.setDescription(updatedProduct.getDescription());
                    existing.setImageUrl(updatedProduct.getImageUrl());
                    existing.setPrice(updatedProduct.getPrice());
                    return productRepository.save(existing);
                });
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
}
