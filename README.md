# Onlineshop Management API Server

This project is a Node.js Express API server designed for managing products, users and orders.

## Prerequisites

Before running this server, ensure you have the following installed:

- [nodejs](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yongqi8899/Be_PrintMyStride
   cd BE_PrintMyStride
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Server

To start the server, run the following command:

```bash
npm run dev
```

The server will start running at [http://localhost:8080](http://localhost:8080)

## API Endpoints

The following endpoints are available:

### Auth

- **POST /auth/signup** Create a new user.
- **POST /auth/signin** Authenticates the user.
- **GET /auth/signout** logout.
- **GET /auth/me** Get the logged-in user.

### products

- **POST /products** Create a new product.
- **GET /products** Get all products.
- **GET /products/:id** Get a single product by ID.
- **PUT /products/:id** Update an existing product.
- **DELETE /products/:id** Delete an product by ID.

### users

- **POST /users** Create a new user.
- **GET /users** Get all users.
- **GET /users/:id** Get a single user by ID.
- **PUT /users/:id** Update an existing user.
- **DELETE /users/:id** Delete an user by ID.

### orders

- **POST /orders** Create a new order.
- **GET /orders** Get all orders.
- **GET /orders/:id** Get a single order by ID.
- **PUT /orders/:id** Update an existing order.
- **DELETE /orders/:id** Delete an order by ID.


### reviews

- **POST /reviews** Create a new review.
- **GET /reviews** Get all reviews.
- **GET /reviews/:id** Get a single review by ID.
- **PUT /reviews/:id** Update an existing review.
- **DELETE /reviews/:id** Delete an user by ID.

## Configuration

Create a new `.env` file and then copy the contents of `example.env` into it, you may change the `JWT_SECRET` and `PORT` values.
