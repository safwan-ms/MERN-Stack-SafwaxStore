# E-Commerce Store

## Overview

This is a full-stack eCommerce store built using modern web technologies. It allows users to browse products, filter them by categories and brands, and make purchases. The store features authentication, a shopping cart, and an admin panel for managing products and orders.

## Features

- User authentication (Sign up, Login, Logout)
- Product listing with category and brand filters
- Shopping cart functionality
- Search and sorting options
- Checkout process with payment integration
- Admin panel for product and order management
- Responsive design for mobile and desktop

## Tech Stack

### Frontend:

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## Installation & Setup

### Prerequisites:

- Node.js & npm installed
- MongoDB running locally or on a cloud provider

### Steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/safwan-ms/MERN-Stack-SafwaxStore.git
   cd MERN-Stack-SafwaxStore
   ```

2. **Install dependencies for frontend and backend:**

   ```sh
   cd frontend  # Navigate to frontend folder
   npm install or npm i # Install frontend dependencies
   cd ../backend  # Navigate to backend folder
   npm install or npm i # Install backend dependencies
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the `backend` directory and add the required configurations:

     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

4. **Start the development servers:**

   ```sh
   npm run backend # Start backend server
   npm run frontend # Start frontend server
   ```

5. **Access the application:**
   - Open [http://localhost:5173](http://localhost:5173) in your browser for the frontend.
   - Backend runs on `http://localhost:5000` (or specified port).

# API Routes Documentation (Backend)

## User Routes

### Base URL: `/api/users`

| Method | Endpoint   | Description                       |
| ------ | ---------- | --------------------------------- |
| POST   | `/`        | Create a new user                 |
| GET    | `/`        | Get all users (Admin only)        |
| POST   | `/auth`    | Login a user                      |
| POST   | `/logout`  | Logout the current user           |
| GET    | `/profile` | Get the current user's profile    |
| PUT    | `/profile` | Update the current user's profile |
| DELETE | `/:_id`    | Delete a user by ID (Admin only)  |
| GET    | `/:_id`    | Get a user by ID (Admin only)     |
| PUT    | `/:_id`    | Update a user by ID (Admin only)  |

### Middleware Used:

- `authenticate`: Ensures only authenticated users can access certain routes.
- `authorizedAdmin`: Restricts access to admin users only.

## Product Routes

### Base URL: `/api/products`

| Method | Endpoint             | Description                                                             |
| ------ | -------------------- | ----------------------------------------------------------------------- |
| GET    | `/`                  | Fetch paginated products                                                |
| POST   | `/`                  | Add a new product (Admin only, uses `formidable` for file uploads)      |
| GET    | `/allproducts`       | Fetch all products without pagination                                   |
| POST   | `/:id/reviews`       | Add a review to a product (Authenticated users only)                    |
| GET    | `/top`               | Fetch top-rated products                                                |
| GET    | `/new`               | Fetch newly added products                                              |
| GET    | `/:id`               | Fetch a product by ID                                                   |
| PUT    | `/:id`               | Update product details (Admin only, uses `formidable` for file uploads) |
| DELETE | `/:id`               | Delete a product by ID (Admin only)                                     |
| POST   | `/filtered-products` | Filter products based on criteria                                       |

### Middleware Used:

- `authenticate`: Ensures only authenticated users can access certain routes.
- `authorizedAdmin`: Restricts access to admin users only.
- `checkId`: Validates product ID before performing actions.
- `formidable()`: Handles file uploads for product images.

## Category Routes

### Base URL: `/api/categories`

| Method | Endpoint       | Description                        |
| ------ | -------------- | ---------------------------------- |
| POST   | `/`            | Create a new category (Admin only) |
| PUT    | `/:categoryId` | Update a category (Admin only)     |
| DELETE | `/:categoryId` | Remove a category (Admin only)     |
| GET    | `/categories`  | List all categories                |
| GET    | `/:id`         | Read a category by ID              |

### Middleware Used:

- `authenticate`: Ensures only authenticated users can access certain routes.
- `authorizedAdmin`: Restricts access to admin users only.

## Notes

- All admin routes require authentication and admin authorization.
- Users can only modify their own profiles unless they have admin access.
- Product and category-related operations (add, update, delete) are restricted to admins.

### Example API Requests

#### Login a User

```http
POST /api/users/auth
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Fetch All Products

```http
GET /api/products/allproducts
```

#### Add a New Product (Admin Only)

```http
POST /api/products
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data
{
  "name": "New Product",
  "price": 100,
  "image": <file>
}
```

#### Create a New Category (Admin Only)

```http
POST /api/categories
Authorization: Bearer <admin-token>
Content-Type: application/json
{
  "name": "Electronics"
}
```

## Future Enhancements

- Wishlist functionality
- Review & rating system
- Real-time order tracking
- Multi-vendor support

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

**Developed by Safwax**
