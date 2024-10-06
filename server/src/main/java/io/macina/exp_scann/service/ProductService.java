package io.macina.exp_scann.service;

import io.macina.exp_scann.model.Product;
import io.macina.exp_scann.dto.ProductDTO;
import io.macina.exp_scann.repos.ProductRepository;
import io.macina.exp_scann.util.NotFoundException;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


@Service
public class ProductService implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        updateProductdata();
    }

    @Autowired
    ProductRepository productRepository;

    public ProductService(final ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Scheduled(cron = "0 0 * * * *")
    public void updateProductdata() {
        List<Product> products = productRepository.findAll();
        for(var p : products){
            p.setBoughtAgo( p.getBoughtAgo() != null ? ChronoUnit.DAYS.between(LocalDate.now(),p.getBuyDate()) * -1 : null );
            p.setDaysToExp(ChronoUnit.DAYS.between(LocalDate.now(), p.getExpDate()));
            productRepository.save(p);
        }
        System.out.println(products);
    }

    public List<ProductDTO> findAll() {
        final List<Product> products = productRepository.findAll(Sort.by(Sort.Direction.DESC,("id")));
        return products.stream()
                .map(this::mapToDTO)
                .toList();
    }

    public ProductDTO get(final Long id) {
        return productRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new NotFoundException(id));
    }

    public ProductDTO create(final ProductDTO ProductDTO) {
        final Product product = new Product(
                null,
                ProductDTO.getPName(),
                ProductDTO.getBuyDate(),
                ProductDTO.getExpDate()
        );
        productRepository.save(product);
        return mapToDTO(product);
    }

    public List<ProductDTO> addAll(final List<ProductDTO> ProductDTOS){
        List<Product> productDTOList = ProductDTOS.stream()
                .map(this::mapToEntity)
                .toList();
        productRepository.saveAll(productDTOList);
        return productRepository.findAll().stream().map(this::mapToDTO).toList();
    }

    public ProductDTO update(final Long id, final ProductDTO productDTO) {
        final Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(id));
        if (productDTO.getPName() != null) {
            product.setPName(productDTO.getPName());
        }
        if (productDTO.getBuyDate() != null) {
            product.setBuyDate(productDTO.getBuyDate());
            product.setBoughtAgo(ChronoUnit.DAYS.between(LocalDate.now(), product.getBuyDate()) * -1);
        }
        if (productDTO.getExpDate() != null) {
            product.setExpDate(productDTO.getExpDate());
            product.setDaysToExp(ChronoUnit.DAYS.between(LocalDate.now(),product.getExpDate()));
            product.setExpired(product.getDaysToExp() <= 0);
        }

        return mapToDTO(productRepository.save(product));
    }

    public void delete(List<ProductDTO> productDTOList) {
        List<Product> products = productDTOList.stream()
                        .map(this::mapToEntity)
                .collect(Collectors.toList());
        productRepository.deleteAll(products);
    }

    private ProductDTO mapToDTO(final Product product) {

        return ProductDTO.builder()
                .id(product.getId())
                .pName(product.getPName())
                .buyDate(product.getBuyDate() != null ? product.getBuyDate() : null)
                .expDate(product.getExpDate())
                .isExpired(product.isExpired())
                .daysToExp(product.getDaysToExp())
                .boughtAgo(product.getBoughtAgo())
                .build();
    }

    private Product mapToEntity(final ProductDTO productDTO) {
        return new Product(
                productDTO.getId(),
                productDTO.getPName(),
                productDTO.getBuyDate(),
                productDTO.getExpDate()
        );
    }


}
