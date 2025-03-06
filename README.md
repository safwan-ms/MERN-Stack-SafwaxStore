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

- React.js (with Next.js/Vite if applicable)
- Redux Toolkit for state management
- Tailwind CSS for styling
- Axios for API requests

### Backend:

- Node.js & Express.js
- MongoDB & Mongoose for database management
- JWT for authentication
- Cloudinary for image storage (if applicable)

## Installation & Setup

### Prerequisites:

- Node.js & npm installed
- MongoDB running locally or on a cloud provider

### Steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/ecommerce-store.git
   cd ecommerce-store
   ```

2. **Install dependencies for frontend and backend:**

   ```sh
   cd frontend  # Navigate to frontend folder
   npm install  # Install frontend dependencies
   cd ../backend  # Navigate to backend folder
   npm install  # Install backend dependencies
   ```

3. **Set up environment variables:**

   - Create a `.env` file in the `backend` directory and add the required configurations:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     STRIPE_SECRET_KEY=your_stripe_key (if using payments)
     ```

4. **Start the development servers:**

   ```sh
   cd backend
   npm run dev  # Start backend server
   cd ../frontend
   npm run dev  # Start frontend server
   ```

5. **Access the application:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser for the frontend.
   - Backend runs on `http://localhost:5000` (or specified port).

## API Endpoints (Backend)

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/products`     | Get all products   |
| GET    | `/api/products/:id` | Get product by ID  |
| POST   | `/api/users/signup` | Register new user  |
| POST   | `/api/users/login`  | Login user         |
| POST   | `/api/orders`       | Create a new order |

## Future Enhancements

- Wishlist functionality
- Review & rating system
- Real-time order tracking
- Multi-vendor support

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License.

---

**Developed by [Your Name]**
