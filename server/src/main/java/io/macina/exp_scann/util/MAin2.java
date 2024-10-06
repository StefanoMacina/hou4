package io.macina.exp_scann.util;

import io.macina.exp_scann.dto.Ingredient;

import java.util.ArrayList;
import java.util.List;

public class MAin2 {
    public static void main(String[] args) {
        String text = """
                ## Simple Tomato Pasta\\n\\n**Ingredients:**\\n\\n- 250g Penne pasta\\n- 2 tbsp olive oil\\n- 1 clove garlic, minced\\n- 400g canned chopped tomatoes\\n- 1/2 tsp dried oregano\\n- Salt and pepper to taste\\n- Fresh basil leaves, for garnish (optional)\\n\\n**Steps:**\\n\\n- Cook pasta according to package directions.\\n- While pasta is cooking, heat olive oil in a saucepan over medium heat.\\n- Add garlic and cook for 1 minute, until fragrant.\\n- Add chopped tomatoes, oregano, salt, and pepper.\\n- Bring to a simmer and cook for 10 minutes, stirring occasionally.\\n- Drain pasta and add to the tomato sauce.\\n- Toss to combine.\\n- Serve immediately, garnished with fresh basil leaves if desired. \\n"
                """;
        System.out.println(MAin2.extractIngredients(text));
    }

    public static String extractTitle(String text) {
        int start = text.indexOf("## ");
        int end = text.indexOf("**", start);
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
            String[] arr = ingredientsSection.split("-");
            for(int i = 0; i<arr.length;i++){
               Ingredient ing = new Ingredient(arr[i]);
               ingredientsList.add(ing);
            }
        }
        return ingredientsList;
    }
}
