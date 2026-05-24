package com.example.repository;

import com.example.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Product Repository
 * Extends JpaRepository for CRUD operations
 * JpaRepository provides:
 * - findAll()
 * - findById()
 * - save()
 * - delete()
 * - deleteById()
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Custom query methods
    List<Product> findByNameContaining(String name);

    List<Product> findByPriceGreaterThan(Double price);

    List<Product> findByQuantityGreaterThan(Integer quantity);
}