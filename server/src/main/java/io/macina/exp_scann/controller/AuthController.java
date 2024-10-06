package io.macina.exp_scann.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.macina.exp_scann.enums.CodesEnum;
import io.macina.exp_scann.model.AppUser;
import io.macina.exp_scann.payload.requests.SigninRequest;
import io.macina.exp_scann.payload.requests.SignupRequest;
import io.macina.exp_scann.payload.responses.ReturnResponse;
import io.macina.exp_scann.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="*")
public class AuthController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ReturnResponse> addUser(
            @RequestBody @Valid SignupRequest signupRequest
    ){
        userService.register(signupRequest);
        return new ResponseEntity<>(new ReturnResponse(CodesEnum.REGISTRATION_SUCCESSFUL.getValue(),"success"), HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<ReturnResponse> login(@RequestBody @Valid SigninRequest request) {
        String token = userService.verify(request);
        return new ResponseEntity<>(new ReturnResponse(CodesEnum.LOGIN_SUCCESSFUL.getValue(), token),HttpStatus.OK);
    }

    //ENDOINT MOMENTANEI
    @GetMapping("/users")
    public List<AppUser> getAllUsers(){
        return userService.getAll();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Integer id){
        return new ResponseEntity<>(userService.delete(id), HttpStatus.OK);
    }

}
