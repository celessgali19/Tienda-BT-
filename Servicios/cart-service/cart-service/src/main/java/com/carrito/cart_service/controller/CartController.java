package com.carrito.cart_service.controller;

import com.carrito.cart_service.dto.OrderResponse;
import com.carrito.cart_service.model.CartProduct;
import com.carrito.cart_service.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartProduct>> getCart(@RequestHeader("X-User-Id") Integer userId) {
        return ResponseEntity.ok(cartService.getCartProducts(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<CartProduct> addProduct(
            @RequestHeader("X-User-Id") Integer userId,
            @RequestParam Integer productId,
            @RequestParam Integer quantity
    ) {
        return ResponseEntity.ok(cartService.addProductToCart(userId, productId, quantity));
    }

    @DeleteMapping("/product/{cartProductId}")
    public ResponseEntity<Void> removeProduct(
            @RequestHeader("X-User-Id") Integer userId,
            @PathVariable Integer cartProductId
    ) {
        cartService.removeProductFromCart(userId, cartProductId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout(@RequestHeader("X-User-Id") Integer userId) {
        Integer orderId = cartService.checkoutCart(userId);
        OrderResponse response = new OrderResponse(
                orderId,
                "Compra generada con éxito"
        );

        return ResponseEntity.ok(response);
    }
}