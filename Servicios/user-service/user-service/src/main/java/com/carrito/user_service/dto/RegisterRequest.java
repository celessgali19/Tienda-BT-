package com.carrito.user_service.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    private String name;
    private String lastName;
    private String shippingAddress;
    private String email;
    private LocalDate birthDate;
    private String password;
}
