package com.carrito.cart_service.service;

import com.carrito.cart_service.model.Cart;
import com.carrito.cart_service.model.CartProduct;
import com.carrito.cart_service.model.Order;
import com.carrito.cart_service.repository.CartProductRepository;
import com.carrito.cart_service.repository.CartRepository;
import com.carrito.cart_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartProductRepository cartProductRepository;

    // carrito actual del usuario
    public Cart getOrCreateCart(Integer userId) {
        return cartRepository.findByIdUsuario(userId)
                .orElseGet(() -> cartRepository.save(Cart.builder()
                        .idUsuario(userId)
                        .build()));
    }

    // Obtener todos los productos del carrito
    public List<CartProduct> getCartProducts(Integer userId) {
        Cart cart = getOrCreateCart(userId);
        return cart.getProducts();
    }

    // Agregar
    public CartProduct addProductToCart(Integer userId, Integer productId, Integer quantity) {
        Cart cart = getOrCreateCart(userId);

        CartProduct cartProduct = new CartProduct();
        cartProduct.setCart(cart);
        cartProduct.setProductId(productId);
        cartProduct.setQuantity(quantity);

        return cartProductRepository.save(cartProduct);
    }

    // Eliminar
    @Transactional
    public void removeProductFromCart(Integer userId, Integer cartProductId) {
        cartProductRepository.deleteByIdAndUser(cartProductId, userId);
    }
    private final OrderRepository orderRepository;



    @Transactional
    public Integer checkoutCart(Integer userId) {
        // Obtener el carrito del usuario
        Cart cart = getOrCreateCart(userId);

        // Verificar si el carrito está vacío
        if (cart.getProducts() == null || cart.getProducts().isEmpty()) {
            throw new RuntimeException("El carrito está vacío");
        }

        // Crear nueva orden
        Order order = new Order();
        order.setIdUsuario(userId);
        order.setOrderDate(LocalDateTime.now());
        order.setIdCart(cart.getIdCart());

        // Guardar orden y obtener su ID
        order = orderRepository.save(order);

        // Eliminar productos del carrito
        cartProductRepository.deleteAllByCartId(cart.getIdCart());

        // Retornar el ID generado de la orden
        return order.getId();
    }


}
