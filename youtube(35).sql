-- MySQL Workbench Forward Engineering h

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`videos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`videos` (`id` INT NOT NULL AUTO_INCREMENT, `title` VARCHAR(100) NULL, `date` DATETIME NULL, PRIMARY KEY (`id`)) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`channels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`channels` (`id` INT NOT NULL, `channel_name` VARCHAR(45) NULL, PRIMARY KEY (`id`)) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Convert all title to lower case`
-- -----------------------------------------------------
DROP TRIGGER IF EXISTS lowerCaseOnInsert;
CREATE TRIGGER lowerCaseOnInsert BEFORE INSERT ON `mydb`.`videos` FOR EACH ROW SET NEW.title = LOWER(NEW.title);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
