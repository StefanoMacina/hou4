package io.macina.exp_scann.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Entity
@Table(name = "Products")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @Column(nullable = false, updatable = false)
    @SequenceGenerator(
            name = "primary_sequence",
            sequenceName = "primary_sequence",
            allocationSize = 1,
            initialValue = 10000
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "primary_sequence"
    )
    private Long id;

    @Column(nullable = false, length = 55)
    private String pName;

    @Column
    private LocalDate buyDate;

    @Column
    private Long boughtAgo;

    @Column(nullable = false)
    private LocalDate expDate;

    @Column(name = "remaining_days")
    private Long daysToExp;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = false)
    private OffsetDateTime lastUpdated;

    private boolean isExpired;

    public Product(Long id,String pName, LocalDate buyDate,
                   LocalDate expDate
    ) {
        this.id = id;
        this.pName = pName;
        this.buyDate = buyDate;
        this.expDate = expDate;
        this.daysToExp = ChronoUnit.DAYS.between(LocalDate.now(),expDate);
        this.isExpired = this.daysToExp <= 0;
        this.boughtAgo = buyDate != null ? ChronoUnit.DAYS.between(LocalDate.now(), buyDate) * -1 : null ;
    }


}
