package io.macina.exp_scann.service;

import io.macina.exp_scann.dto.Ingredient;
import io.macina.exp_scann.dto.ProductDTO;
import io.macina.exp_scann.dto.RecipeResponse;
import io.macina.exp_scann.dto.Steps;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VertexService {

    @Autowired
    VertexAiGeminiChatModel chatModel;

    public RecipeResponse generateResponse(List<ProductDTO> productDTOList){
        List<String> productNames = productDTOList.stream()
                .map(ProductDTO::getPName)
                .toList();
        String prompt = "create recipe with: " + productNames + ". List ingredients with grams first, then steps, comma separated use '-' instead of '*'";
        String aiResponse = chatModel.call(prompt);
        return RecipeResponse.builder()
                .title(extractTitle(aiResponse))
                .ingredientsList(extractIngredients(aiResponse))
                .stepsList(extractSteps(aiResponse))
                .text(aiResponse)
                .build();
    }

    public static String extractTitle(String text) {
        int start = text.indexOf("## ");
        int end = text.indexOf("**Ingredients:**", start);
        if (start != -1 && end != -1) {
            return text.substring(start + 3, end).trim();
        }
        return "";
    }

    public static List<Ingredient> extractIngredients(String text) {
        List<Ingredient> ingredientsList = new ArrayList<>();

        int start = text.indexOf("**Ingredients:**");
        int end = text.indexOf("**Steps:**");

        if (start != -1 && end != -1) {
            String ingredientsSection = text.substring(start + "**Ingredients:**".length(), end).trim();
            String[] arr = ingredientsSection.split("\n- "); // Split lines that start with '- '

            for (String ingredient : arr) {
                ingredient = ingredient.trim();
                if (!ingredient.isEmpty()) {
                    ingredientsList.add(new Ingredient(ingredient));
                }
            }
        }
        return ingredientsList;
    }


    public List<Steps> extractSteps(String text) {
        List<Steps> stepsList = new ArrayList<>();

        int start = text.indexOf("**Steps:**");
        if (start != -1) {
            String stepsSection = text.substring(start + "**Steps:**".length()).trim();
            String[] arr = stepsSection.split("\n- "); // Split lines that start with '- '

            for (String step : arr) {
                step = step.trim();
                if (!step.isEmpty()) {
                    stepsList.add(new Steps(step));
                }
            }
        }
        return stepsList;
    }


}
