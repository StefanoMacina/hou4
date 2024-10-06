package io.macina.exp_scann.repos;

import io.macina.exp_scann.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, Long> {
}
