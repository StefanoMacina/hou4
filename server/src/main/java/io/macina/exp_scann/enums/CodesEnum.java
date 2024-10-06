package io.macina.exp_scann.enums;

public enum CodesEnum {
    EMAIL_ALREADY_EXISTS("EMAIL_ALREADY_EXISTS"),
    USERNAME_ALREADY_EXISTS("USERNAME_ALREADY_EXISTS"),
    REGISTRATION_SUCCESSFUL("REGISTRATION_SUCCESSFUL"),
    LOGIN_FAILED("LOGIN_FAILED"),
    USER_NOT_FOUND("USER_NOT_FOUND"),
    INCORRECT_PASSWORD("INCORRECT_PASSWORD"),
    PRODUCT_NOT_FOUND("PRODUCT_NOT_FOUND"),
    LOGIN_SUCCESSFUL("LOGIN_SUCCESSFUL");

    private final String value;

    CodesEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }


}
