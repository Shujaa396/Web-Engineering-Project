# Black X Original - E-Commerce Store

Black X Original is a high-performance, full-stack e-commerce platform designed for a modern fashion brand. It features a dynamic storefront, a robust administrative dashboard, and a persistent MySQL database backend.

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)
![LocalStorage](https://img.shields.io/badge/LocalStorage-FFA500?style=for-the-badge&logo=javascript&logoColor=white)

---

## Screenshots

| Screenshot | Preview |
| --- | --- |
| Screenshot 2026-05-02 212016 | <img src="./Clips/Screenshot%202026-05-02%20212016.png" alt="Screenshot 2026-05-02 212016" width="420"> |
| Screenshot 2026-05-02 212026 | <img src="./Clips/Screenshot%202026-05-02%20212026.png" alt="Screenshot 2026-05-02 212026" width="420"> |
| Screenshot 2026-05-02 212104 | <img src="./Clips/Screenshot%202026-05-02%20212104.png" alt="Screenshot 2026-05-02 212104" width="420"> |
| Screenshot 2026-05-02 212126 | <img src="./Clips/Screenshot%202026-05-02%20212126.png" alt="Screenshot 2026-05-02 212126" width="420"> |
| Screenshot 2026-05-02 212221 | <img src="./Clips/Screenshot%202026-05-02%20212221.png" alt="Screenshot 2026-05-02 212221" width="420"> |
| Screenshot 2-5-2026 21235 127.0.0.1 | <img src="./Clips/Screenshot_2-5-2026_21235_127.0.0.1.jpeg" alt="Screenshot 2-5-2026 21235 127.0.0.1" width="420"> |
| Screenshot 2-5-2026 212051 127.0.0.1 | <img src="./Clips/Screenshot_2-5-2026_212051_127.0.0.1.jpeg" alt="Screenshot 2-5-2026 212051 127.0.0.1" width="420"> |
| Screenshot 2-5-2026 212115 127.0.0.1 | <img src="./Clips/Screenshot_2-5-2026_212115_127.0.0.1.jpeg" alt="Screenshot 2-5-2026 212115 127.0.0.1" width="420"> |
| Screenshot 2-5-2026 212139 127.0.0.1 | <img src="./Clips/Screenshot_2-5-2026_212139_127.0.0.1.jpeg" alt="Screenshot 2-5-2026 212139 127.0.0.1" width="420"> |
| Screenshot 2-5-2026 212152 127.0.0.1 | <img src="./Clips/Screenshot_2-5-2026_212152_127.0.0.1.jpeg" alt="Screenshot 2-5-2026 212152 127.0.0.1" width="420"> |
| Screenshot 2-5-2026 212232 127.0.0.1 | <img src="./Clips/Screenshot_2-5-2026_212232_127.0.0.1.jpeg" alt="Screenshot 2-5-2026 212232 127.0.0.1" width="420"> |
| Screenshot 2-5-2026 212322 127.0.0.1 | <img src="./Clips/Screenshot_2-5-2026_212322_127.0.0.1.jpeg" alt="Screenshot 2-5-2026 212322 127.0.0.1" width="420"> |

## Project Demo Video

Watch the full project walkthrough here:

[![Watch Demo](https://img.youtube.com/vi/xv5Rbd1A-LM/0.jpg)](https://youtu.be/xv5Rbd1A-LM)

---

## 📂 Project Structure

```bash
blxck-clone/
├── backend/
│   ├── controllers/    # Request handlers (API logic)
│   ├── models/         # Database schemas and MySQL queries
│   ├── routes/         # API endpoint definitions
│   ├── db.js           # MySQL connection pool configuration
│   └── server.js       # Entry point; starts the Express server
├── database/
│   └── schema.sql      # Database initialization script
├── frontend/
│   ├── js/app.js       # Main frontend engine
│   ├── index.html      # Homepage / Storefront
│   ├── product-detail.html # Dynamic Product Detail Page (PDP)
│   ├── profile.html    # User account and order history
│   ├── admin.html      # Admin dashboard
│   └── admin-login.html# Admin authentication
└── README.md
```

## Where the APIs Are

All backend APIs are inside the `backend` folder.

Main API-related files:

- [`backend/server.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/server.js:1)
  - starts the Express server
  - enables CORS and JSON parsing
  - connects all API route groups
- [`backend/routes/productRoutes.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/routes/productRoutes.js:1)
  - defines all product endpoints
- [`backend/routes/userRoutes.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/routes/userRoutes.js:1)
  - defines all user and admin login endpoints
- [`backend/routes/orderRoutes.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/routes/orderRoutes.js:1)
  - defines all order endpoints
- [`backend/controllers/`](/c:/Users/DELL/Desktop/blxck-clone/backend/controllers)
  - contains the request-handling logic for each route
- [`backend/models/`](/c:/Users/DELL/Desktop/blxck-clone/backend/models)
  - contains database queries and MySQL logic
- [`backend/db.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/db.js:1)
  - creates the MySQL connection pool

## Backend API Flow

This project follows this backend flow:

```text
Route -> Controller -> Model -> MySQL Database
```

Example:

```text
/orders -> orderController -> orderModel -> orders/order_items tables
```

## APIs You Made and Their Work

### 1. Product APIs

Files used:

- [`backend/routes/productRoutes.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/routes/productRoutes.js:1)
- [`backend/controllers/productController.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/controllers/productController.js:1)
- [`backend/models/productModel.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/models/productModel.js:1)

Purpose:

- add products
- get all products
- update products
- delete products

Endpoints:

- `GET /products`
  - fetches all products from MySQL
  - used on the home page and product listings
- `POST /products`
  - creates a new product
  - used in the admin dashboard
- `PUT /products/:id`
  - updates an existing product
- `DELETE /products/:id`
  - deletes a product
  - used in the admin dashboard

### 2. User APIs

Files used:

- [`backend/routes/userRoutes.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/routes/userRoutes.js:1)
- [`backend/controllers/userController.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/controllers/userController.js:1)
- [`backend/models/userModel.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/models/userModel.js:1)

Purpose:

- create users
- fetch users
- update users
- delete users
- admin login

Endpoints:

- `POST /users`
  - saves a new customer profile in MySQL
- `GET /users`
  - fetches all registered users
  - used in admin dashboard
- `GET /users/:email`
  - fetches one user by email
  - used to check whether a profile already exists
- `PUT /users/:email`
  - updates an existing user profile
  - used from the account/profile page
- `DELETE /users/:email`
  - deletes a user
  - used in admin dashboard
- `POST /users/auth/login`
  - logs in the admin user
  - used by `admin-login.html`

### 3. Order APIs

Files used:

- [`backend/routes/orderRoutes.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/routes/orderRoutes.js:1)
- [`backend/controllers/orderController.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/controllers/orderController.js:1)
- [`backend/models/orderModel.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/models/orderModel.js:1)

Purpose:

- create orders from checkout
- save order items in MySQL
- fetch all orders for admin
- fetch filtered orders for a specific user email

Endpoints:

- `POST /orders`
  - called when user clicks `Proceed to Checkout`
  - saves the main order in `orders`
  - saves each cart item in `order_items`
- `GET /orders`
  - fetches all orders
  - used in admin dashboard
- `GET /orders?email=user@example.com`
  - fetches only orders for one customer email
  - used in `profile.html` for recent orders

### 4. Root API

File used:

- [`backend/server.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/server.js:1)

Endpoint:

- `GET /`
  - checks whether backend is running
  - returns a simple status message

## Which Frontend Pages Use Which APIs

### `frontend/index.html`

Uses:

- `GET /products`
  - to load products from MySQL
- `POST /orders`
  - through checkout logic in [`frontend/js/app.js`](/c:/Users/DELL/Desktop/blxck-clone/frontend/js/app.js:1)

### `frontend/profile.html`

Uses:

- `GET /users/:email`
  - to check if profile already exists
- `POST /users`
  - to create a profile
- `PUT /users/:email`
  - to update a profile
- `GET /orders?email=...`
  - to show the user’s recent orders

### `frontend/admin-login.html`

Uses:

- `POST /users/auth/login`
  - to log into admin dashboard

### `frontend/admin.html`

Uses:

- `GET /products`
- `POST /products`
- `DELETE /products/:id`
- `GET /users`
- `DELETE /users/:email`
- `GET /orders`

This page manages all admin-side data.

## Requirements

- Node.js 18+ recommended
- MySQL installed and running
- npm

## Database Setup

Run the schema from [`database/schema.sql`](/c:/Users/DELL/Desktop/blxck-clone/database/schema.sql:1) in MySQL.

Example:

```sql
SOURCE c:/Users/DELL/Desktop/blxck-clone/database/schema.sql;
```

Or copy-paste the SQL into MySQL Workbench / phpMyAdmin / CLI.

The schema creates:

- `users`
- `products`
- `orders`
- `order_items`

## Backend Configuration

The backend MySQL connection is currently configured in [`backend/db.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/db.js:1):

```js
host: 'localhost',
user: 'root',
password: 'Root#123',
database: 'blxck_clone'
```

Update these values if your local MySQL username or password is different.

## Install Backend Dependencies

From the `backend` folder:

```bash
npm install
```

## Run the Backend

Development:

```bash
cd backend
npm run dev
```

Production/simple local run:

```bash
cd backend
node server.js
```

When the backend starts successfully, it runs on:

```text
http://localhost:3000
```

## Run the Frontend

The frontend is a static site inside the `frontend` folder.

You can open:

- `frontend/index.html`
- `frontend/profile.html`
- `frontend/admin-login.html`
- `frontend/admin.html`

You can open them directly in the browser, or serve the `frontend` folder using any simple local server.

## Admin Login

Current hardcoded admin credentials from [`backend/models/userModel.js`](/c:/Users/DELL/Desktop/blxck-clone/backend/models/userModel.js:1):

```text
Username: admin
Password: admin123
```

## Main User Flow

1. Open `frontend/index.html`
2. Add items to cart
3. Open profile/account page and save:
   - name
   - email
   - phone
   - address
   - city
   - postal code
4. Go back to cart and click `Proceed to Checkout`
5. The order is saved in MySQL
6. Open `profile.html` to view recent orders
7. Open `admin.html` to view all orders in the admin dashboard

## Admin Dashboard

The admin panel includes:

- `Products` tab
  - add new products
  - view products
  - delete products
- `Users` tab
  - view registered users
  - delete users
- `Orders` tab
  - view order ID
  - view customer name, email, phone, and address
  - view order status
  - view total amount
  - view ordered items and quantities

The admin page also automatically logs out after `30 seconds` of inactivity.

## Account Page

The account page includes:

- profile form
- save and update profile
- logout
- recent orders section

Recent orders are fetched from the backend using the saved profile email, so the same email used during checkout should be saved in the profile.

## API Endpoints

### Root

- `GET /`

### Products

- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`

### Users

- `POST /users`
- `GET /users`
- `GET /users/:email`
- `PUT /users/:email`
- `DELETE /users/:email`
- `POST /users/auth/login`

### Orders

- `POST /orders`
- `GET /orders`
- `GET /orders?email=user@example.com`

## Example Order Queries in MySQL

See all orders:

```sql
USE blxck_clone;
SELECT * FROM orders ORDER BY id DESC;
```

See all order items:

```sql
USE blxck_clone;
SELECT * FROM order_items ORDER BY id DESC;
```

See joined order details:

```sql
USE blxck_clone;

SELECT 
  o.id AS order_id,
  o.customer_name,
  o.customer_email,
  o.total_amount,
  o.status,
  o.created_at,
  oi.product_name,
  oi.product_price,
  oi.quantity,
  oi.product_size
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
ORDER BY o.id DESC, oi.id DESC;
```

## Common Issues

### 1. `Failed to fetch` on checkout

Usually means the backend is not running.

Start it with:

```bash
cd backend
node server.js
```

### 2. Orders are not saving

Make sure:

- MySQL is running
- `orders` and `order_items` tables exist
- the DB credentials in `backend/db.js` are correct

### 3. Recent orders are not showing in account page

Make sure:

- the profile email is saved
- the same email is used during checkout
- the backend is running
- the order exists in the database

### 4. Admin page shows no orders

Make sure at least one order has been placed successfully and saved in MySQL.

## Notes

- The frontend is plain HTML/JS without a framework.
- Admin authentication is currently hardcoded and intended for demo use only.
- There is no payment gateway integration; checkout simply saves the order in MySQL.
- CORS is enabled on the backend.

## Future Improvements

- Add product image uploads
- Add edit product support in admin
- Add order status update actions in admin
- Add proper user authentication
- Add search and filtering
- Add dedicated cart and checkout pages
- Add environment variables for DB credentials
- Add deployment configuration

## License

This project is for learning/demo purposes.
