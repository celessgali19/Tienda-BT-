-- Crear esquema y establecer configuración inicial
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `carrito` DEFAULT CHARACTER SET utf8;
USE `carrito`;

-- Tabla Users
CREATE TABLE IF NOT EXISTS `Users` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `last_name` VARCHAR(200) NOT NULL,
  `shipping_address` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `birth_date` DATE NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB;

-- Tabla Product
CREATE TABLE IF NOT EXISTS `Product` (
  `idProduct` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `image_url` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idProduct`)
) ENGINE=InnoDB;

-- Tabla Cart
CREATE TABLE IF NOT EXISTS `Cart` (
  `idCart` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idCart`),
  CONSTRAINT `fk_Cart_User`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `Users` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Tabla Orders
CREATE TABLE IF NOT EXISTS `Orders` (
  `idOrders` INT NOT NULL AUTO_INCREMENT,
  `order_date` DATETIME NOT NULL,
  `idCart` INT NOT NULL,
  PRIMARY KEY (`idOrders`),
  CONSTRAINT `fk_Orders_Cart`
    FOREIGN KEY (`idCart`)
    REFERENCES `Cart` (`idCart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Tabla Cart_Product (tabla intermedia)
CREATE TABLE IF NOT EXISTS `Cart_Product` (
  `idCart` INT NOT NULL,
  `idProduct` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`idCart`, `idProduct`),
  CONSTRAINT `fk_Cart_Product_Cart`
    FOREIGN KEY (`idCart`)
    REFERENCES `Cart` (`idCart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cart_Product_Product`
    FOREIGN KEY (`idProduct`)
    REFERENCES `Product` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Restaurar configuración
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
