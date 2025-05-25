package com.carrito.cart_service.dto;

public class OrderResponse {

    private Integer orderId;
    private String message;

    public OrderResponse(Integer orderId, String message) {
        this.orderId = orderId;
        this.message = message;

    }


    public Integer getOrderId() {
        return orderId;
    }

    public String getMessage() {
        return message;
    }


}