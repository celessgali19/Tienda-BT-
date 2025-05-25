-- Usuarios
INSERT INTO Users (name, last_name, shipping_address, email, birth_date, password) VALUES
('Juan', 'Pérez', 'Calle Falsa 123', 'juanperez@example.com', '1990-05-15', '1234secure'),
('Ana', 'Gómez', 'Av. Central 456', 'anagomez@example.com', '1985-10-22', 'mypassword');

-- Productos
INSERT INTO Product (name, description, price, image_url) VALUES
('Laptop', 'Laptop ultradelgada de 15 pulgadas', 799.99, 'https://example.com/laptop.jpg'),
('Mouse inalámbrico', 'Mouse ergonómico con Bluetooth', 29.99, 'https://example.com/mouse.jpg'),
('Teclado mecánico', 'Teclado con retroiluminación RGB', 59.99, 'https://example.com/teclado.jpg');

-- Carritos
INSERT INTO Cart (idUsuario) VALUES
(1),
(2);

-- Pedidos
INSERT INTO Orders (order_date, idCart) VALUES
(NOW(), 1),
(NOW(), 2);

-- Productos en los carritos
INSERT INTO Cart_Product (idCart, idProduct, quantity) VALUES
(1, 1, 1),  -- Juan compró 1 laptop
(1, 2, 2),  -- Juan compró 2 mouse
(2, 2, 1),  -- Ana compró 1 mouse
(2, 3, 1);  -- Ana compró 1 teclado
