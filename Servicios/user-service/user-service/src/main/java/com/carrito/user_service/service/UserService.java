package com.carrito.user_service.service;

import com.carrito.user_service.dto.JwtResponse;
import com.carrito.user_service.dto.LoginRequest;
import com.carrito.user_service.dto.RegisterRequest;
import com.carrito.user_service.model.User;
import com.carrito.user_service.repository.UserRepository;
import com.carrito.user_service.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return "El correo ya está registrado";
        }

        User user = User.builder()
                .name(request.getName())
                .lastName(request.getLastName())
                .shippingAddress(request.getShippingAddress())
                .email(request.getEmail())
                .birthDate(request.getBirthDate())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);
        return "Usuario registrado exitosamente";
    }

    public JwtResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // usar jwtService
        String token = jwtService.generateToken(user);
        return new JwtResponse(token);
    }
}
