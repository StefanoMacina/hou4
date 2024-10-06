package io.macina.exp_scann.controller;

import io.macina.exp_scann.dto.ProductDTO;
import io.macina.exp_scann.service.ProductService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api/products", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(final ProductService productService) {
        this.productService = productService;
    }


    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(productService.get(id));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody @Valid final ProductDTO ProductDTO) {
        final ProductDTO createdProd = productService.create(ProductDTO);
        return new ResponseEntity<>(createdProd, HttpStatus.CREATED);

    }

    @PostMapping("addAll")
    public ResponseEntity<List<ProductDTO>> createProduct(@RequestBody @Valid final List<ProductDTO> ProductDTO) {
        final List<ProductDTO> createdProd = productService.addAll(ProductDTO);
        return new ResponseEntity<>(createdProd, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable(name = "id") final Long id,
                                                    @RequestBody @Valid final ProductDTO ProductDTO) {
        return ResponseEntity.ok(productService.update(id, ProductDTO));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteProduct(
            @RequestBody List<ProductDTO> productDTOList) {
        productService.delete(productDTOList);
        return ResponseEntity.noContent().build();
    }

}
