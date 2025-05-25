package com.carrito.cart_service.repository;

import com.carrito.cart_service.model.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartProductRepository extends JpaRepository<CartProduct, Integer> {

    // Obtener todos los productos de un carrito específico
    List<CartProduct> findByCart_IdCart(Integer idCart);

    @Modifying
    @Transactional
    @Query("DELETE FROM CartProduct cp WHERE cp.cart.idCart = :cartId")
    void deleteAllByCartId(@Param("cartId") Integer cartId);
    @Modifying
    @Transactional
    @Query("DELETE FROM CartProduct cp WHERE cp.id = :id AND cp.cart.idUsuario = :userId")
    void deleteByIdAndUser(@Param("id") Integer id, @Param("userId") Integer userId);
}
