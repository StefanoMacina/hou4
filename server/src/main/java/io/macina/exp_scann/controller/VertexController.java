package io.macina.exp_scann.controller;

import io.macina.exp_scann.dto.ProductDTO;
import io.macina.exp_scann.dto.RecipeResponse;
import io.macina.exp_scann.service.VertexService;
import org.springframework.ai.vertexai.gemini.VertexAiGeminiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ai/")
@CrossOrigin(origins = "*")
public class VertexController {

    @Autowired
    VertexService vertexService;

    @Autowired
    VertexAiGeminiChatModel chatModel;

    @PostMapping("generate")
    public ResponseEntity<RecipeResponse> generate(
            @RequestBody List<ProductDTO> productDTOs
            )
    {
        RecipeResponse r = vertexService.generateResponse(productDTOs);
        return new ResponseEntity<>(r,HttpStatus.OK);
    }

}
