package io.macina.exp_scann.exception;


import io.macina.exp_scann.payload.responses.ReturnResponse;
import org.springframework.http.ResponseEntity; // Change this import
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsEx.class)
    public ResponseEntity<ReturnResponse> handleUserAlreadyExistsException(UserAlreadyExistsEx e) {
        String code = e.getCode();
        String message = e.getMessage();
        ReturnResponse response = new ReturnResponse(code, message);
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

}
