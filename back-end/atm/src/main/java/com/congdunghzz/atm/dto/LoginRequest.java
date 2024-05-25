package com.congdunghzz.atm.dto;

public record LoginRequest(
        String accountNumber,
        String password
) {
}

