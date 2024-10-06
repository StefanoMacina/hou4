package io.macina.exp_scann.service;

import io.macina.exp_scann.enums.CodesEnum;
import io.macina.exp_scann.exception.UserAlreadyExistsEx;
import io.macina.exp_scann.model.AppUser;
import io.macina.exp_scann.payload.requests.SigninRequest;
import io.macina.exp_scann.payload.requests.SignupRequest;
import io.macina.exp_scann.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JWTService jwtService;

    public void register(SignupRequest signupRequest){

        if(userRepository.existsByEmail(signupRequest.getEmail())){
            throw new UserAlreadyExistsEx(CodesEnum.EMAIL_ALREADY_EXISTS.getValue(), "email %s already exists".formatted(signupRequest.getEmail()), null);
        }

        if(userRepository.existsByUsername(signupRequest.getUsername())){
            throw new UserAlreadyExistsEx(CodesEnum.USERNAME_ALREADY_EXISTS.getValue(), "Username %s already exists".formatted(signupRequest.getUsername()), null);
        }

        AppUser newUser = AppUser.builder()
                .username(signupRequest.getUsername())
                .email(signupRequest.getEmail())
                .firstname(signupRequest.getFirstname())
                .lastname(signupRequest.getLastname())
                .birthdate(signupRequest.getBirthdate())
                .password(new BCryptPasswordEncoder().encode(signupRequest.getPassword()))
                .role("USER")
                .build();
        userRepository.save(newUser);

    }

    public String verify(SigninRequest request){
            AppUser user = getByUsername(request.getUsername());
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),request.getPassword()
            ));
            return jwtService.generateToken(request.getUsername());
    }

    public AppUser getByUsername(String username){
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User %s not found".formatted(username)));
    }

    public List<AppUser> getAll(){
        return userRepository.findAll();
    }

    public String delete(Integer id){
        boolean isExisting = userRepository.existsById(id);
        if(isExisting) {
            userRepository.deleteById(id);
            return "user %d deleted".formatted(id);
        }
        return "user %d does not exist".formatted(id);
    }
}
