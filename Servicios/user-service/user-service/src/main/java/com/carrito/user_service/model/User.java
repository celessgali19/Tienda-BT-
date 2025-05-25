package com.carrito.user_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_usuario;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(name = "last_name", nullable = false, length = 200)
    private String lastName;

    @Column(name = "shipping_address", nullable = false, length = 200)
    private String shippingAddress;

    @Column(nullable = false, unique = true, length = 200)
    private String email;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false, length = 200)
    private String password;
}
