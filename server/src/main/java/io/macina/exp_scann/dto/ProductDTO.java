package io.macina.exp_scann.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Long id;

    @NotNull
    @Size(max = 55)
    @JsonProperty("pName")
    private String pName;

    private LocalDate buyDate;

    private Long boughtAgo;

    @NotNull
    private LocalDate expDate;

    private Long daysToExp;

    private boolean isExpired;



}
