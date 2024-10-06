package io.macina.exp_scann.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class RecipeResponse {

    private String title;
    private List<Ingredient> ingredientsList;
    private List<Steps> stepsList;
    private String text;

}
