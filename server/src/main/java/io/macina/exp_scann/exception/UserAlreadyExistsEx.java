package io.macina.exp_scann.exception;

import lombok.Getter;

@Getter
public class UserAlreadyExistsEx extends RuntimeException {
    private final String code;

    public UserAlreadyExistsEx(String code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }

}
