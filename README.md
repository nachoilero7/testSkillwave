# BANK PAYMENTS TRANSACTION TEST - SKILLWAVE
============================================

# BACKEND
API REST to process bank's transactions usgin Spring Boot, JPA and Hibernate to 
persist in memory using database H2

## Specifications
- Java 1.8
- Spring boot 2.4.1
- Maven 4.0
- H2 database
- JPA y Hibernate

## Setup:
-  Build project with maven:
	**mvn clean package**

-  Lunch project with embedded Tomcat from Sring Boot
	**mvn spring-boot:run**

- The application would be available at: **http://localhost:8080**

## Description
Endpoints:

# BANK ACCOUNTS
- **GET: /api/bankAccount**, return a list of bank accounts
- **POST: /api/bankAccount**, persist a bank account and return the object
- **GET: /api/bankAccount/{id}**, gets an id to get specific bank account
- **PUT: /api/bankAccount/{id}**, gets an id to update a specific bank account
- **DELETE: /api/bankAccount/{id}**, gets an id to delete a bank account

# TRANSACTIONS
- **GET: /api/transaction**, return a list of transactions
- **GET: /api/transaction/bankAccount/{id}**, gets an id to get specific bank account and return its transactions
- **POST: /api/transaction/bankAccount/{id}**, gets an id to get specific bank account and create a new transaction for each bank account

============================================

# FRONTEND
Frontend project to run the application

## Specifications
- React

## Setup:
-  In the project directory, you can run this command to download/update packages:
	**npm install**

-  Then you can run this command to start the frontend
	**npm start**

- The application would be available at: **http://localhost:3000**
