# E-Commerce Backend

A Node.js-based e-commerce backend API built with Express and Sequelize, using PostgreSQL as the database. This project provides a robust foundation for managing users, products, orders, carts, categories, product images, and addresses, with full CRUD operations and real-world e-commerce workflows.

## Features
- **User Management**: Create, read, update, and delete users.
- **Product Management**: Manage products with categories and images.
- **Order Processing**: Create orders with multiple items, update stock quantities.
- **Cart Functionality**: Add, update, and remove items from user carts.
- **Address Management**: Store and manage user addresses.
- **RESTful API**: Well-structured endpoints with input validation and error handling.
- **Tested**: Thoroughly tested using Postman for CRUD operations and workflows.

## Project Structure
```
ecommerce-backend/
├── config/
│   └── config.js           # Database configuration (PostgreSQL)
├── models/
│   ├── index.js           # Sequelize model initialization
│   ├── user.js            # User model
│   ├── product.js         # Product model
│   ├── productImage.js    # ProductImage model
│   ├── order.js           # Order model
│   ├── orderItem.js       # OrderItem model
│   ├── category.js        # Category model
│   ├── cart.js            # Cart model
│   └── address.js         # Address model
├── routes/
│   ├── users.js           # User routes
│   ├── products.js        # Product routes
│   ├── productImages.js   # ProductImage routes
│   ├── orders.js          # Order routes
│   ├── orderItems.js      # OrderItem routes
│   ├── categories.js      # Category routes
│   ├── carts.js           # Cart routes
│   └── addresses.js       # Address routes
├── .env                   # Environment variables (not tracked)
├── .gitignore             # Git ignore file
├── app.js                 # Main Express application
├── package.json           # Dependencies and scripts
├── EcommerceBackendAPI.postman_collection.json  # Postman test collection
└── README.md              # This file
```

## Prerequisites
- **Node.js**: v22.14.0 or higher
- **PostgreSQL**: v13 or higher
- **Postman**: For testing API endpoints
- **Git**: For version control

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ecommerce-backend.git
   cd ecommerce-backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory with the following:
   ```plaintext
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_NAME=ecommerce_development
   DB_HOST=127.0.0.1
   DB_PORT=5432
   ```
   Replace `your_postgres_user` and `your_postgres_password` with your PostgreSQL credentials.

4. **Set Up the Database**:
   Ensure PostgreSQL is running and create the database:
   ```bash
   psql -U your_postgres_user -c "CREATE DATABASE ecommerce_development;"
   ```
   Run Sequelize migrations to create tables:
   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Run the Server**:
   Start the development server with nodemon:
   ```bash
   npm run dev
   ```
   The server will run at `http://localhost:3000`. You should see:
   ```
   Server running on port 3000
   Database connected
   ```

## API Endpoints
All endpoints are prefixed with `http://localhost:3000`.

| Endpoint | Method | Description | Sample Request Body |
|----------|--------|-------------|---------------------|
| `/users` | POST | Create a user | `{"first_name": "John", "last_name": "Doe", "phone_number": "1234567890"}` |
| `/users` | GET | Get all users | - |
| `/users/:id` | GET | Get user by ID | - |
| `/users/:id` | PUT | Update user | `{"first_name": "Jane", "last_name": "Doe", "phone_number": "0987654321"}` |
| `/users/:id` | DELETE | Delete user | - |
| `/categories` | POST | Create category | `{"name": "Electronics"}` |
| `/categories` | GET | Get all categories | - |
| `/categories/:id` | GET | Get category by ID | - |
| `/categories/:id` | PUT | Update category | `{"name": "Gadgets"}` |
| `/categories/:id` | DELETE | Delete category | - |
| `/products` | POST | Create product | `{"name": "Smartphone", "description": "Latest model", "price": 699, "category_id": 1, "quantity": 50}` |
| `/products` | GET | Get all products (with images, category) | - |
| `/products/:id` | GET | Get product by ID | - |
| `/products/:id` | PUT | Update product | `{"name": "Smartphone Pro", "price": 799, "quantity": 40}` |
| `/products/:id` | DELETE | Delete product | - |
| `/productImages` | POST | Create product image | `{"image": "http://example.com/smartphone.jpg", "product_id": 1}` |
| `/productImages` | GET | Get all images (optional `?product_id=1`) | - |
| `/productImages/:id` | GET | Get image by ID | - |
| `/productImages/:id` | PUT | Update image | `{"image": "http://example.com/new.jpg"}` |
| `/productImages/:id` | DELETE | Delete image | - |
| `/carts` | POST | Add to cart | `{"user_id": 1, "product_id": 1, "quantity": 2}` |
| `/carts/user/:user_id` | GET | Get user’s cart | - |
| `/carts/:id` | PUT | Update cart item | `{"quantity": 3}` |
| `/carts/:id` | DELETE | Delete cart item | - |
| `/orders` | POST | Create order | `{"user_id": 1, "items": [{"product_id": 1, "quantity": 2}]}` |
| `/orders` | GET | Get all orders (with items, user) | - |
| `/orders/:id` | GET | Get order by ID | - |
| `/orders/:id` | PUT | Update order | `{"status": "shipped"}` |
| `/orders/:id` | DELETE | Delete order | - |
| `/orderItems` | POST | Create order item | `{"order_id": 1, "product_id": 1, "quantity": 2}` |
| `/orderItems` | GET | Get all order items (optional `?order_id=1`) | - |
| `/orderItems/:id` | GET | Get order item by ID | - |
| `/orderItems/:id` | PUT | Update order item | `{"quantity": 3}` |
| `/orderItems/:id` | DELETE | Delete order item | - |
| `/addresses` | POST | Create address | `{"name": "123 Main St", "user_id": 1}` |
| `/addresses` | GET | Get all addresses (optional `?user_id=1`) | - |
| `/addresses/:id` | GET | Get address by ID | - |
| `/addresses/:id` | PUT | Update address | `{"name": "456 Oak St"}` |
| `/addresses/:id` | DELETE | Delete address | - |

## Testing
- **Tool**: Postman
- **Collection**: `EcommerceBackendAPI.postman_collection.json` (included in the repository)
- **Test Cases**:
  - **Server Health**: GET `/` → `200 OK`, `"E-Commerce Backend is running!"`
  - **CRUD Operations**: Tested for all endpoints (create, read, update, delete).
  - **Workflows**: Tested e-commerce scenarios (e.g., create user, add to cart, create order with items, verify stock updates).
  - **Error Handling**: Validated error cases (e.g., invalid IDs, insufficient stock, missing fields).
- **Run Tests**:
  1. Import `EcommerceBackendAPI.postman_collection.json` into Postman.
  2. Set environment variable `baseUrl` to `http://localhost:3000`.
  3. Run requests in sequence, saving IDs (e.g., `userId`, `productId`) for dependent tests.

## Dependencies
- **express**: Web framework for Node.js
- **sequelize**: ORM for PostgreSQL
- **pg**, **pg-hstore**: PostgreSQL driver
- **dotenv**: Environment variable management
- **nodemon**: Development server with auto-restart

Install with:
```bash
npm install express sequelize pg pg-hstore dotenv nodemon
```

## Development Workflow
- **Version Control**: Git with GitHub
- **Commits**: Descriptive messages for each phase (e.g., "Fix Address model", "Test with Postman").
- **Testing**: Manual testing with Postman, covering all endpoints and workflows.
- **Database**: PostgreSQL with Sequelize migrations for schema setup.

## Running Migrations
To create or update database tables:
```bash
npx sequelize-cli db:migrate
```

To revert migrations (if needed):
```bash
npx sequelize-cli db:migrate:undo
```

## Troubleshooting
- **Server Fails to Start**:
  - Check PostgreSQL is running and `.env` credentials are correct.
  - Verify migrations are applied (`npx sequelize-cli db:migrate:status`).
- **Postman Errors**:
  - Ensure server is running at `http://localhost:3000`.
  - Check environment variables in Postman (e.g., `userId`, `productId`).
- **Git Issues**:
  - Authentication: Use a personal access token for GitHub.
  - Conflicts: Run `git pull origin main --rebase` to resolve.

## Future Improvements
- Add authentication (e.g., JWT) for secure endpoints.
- Implement payment integration (e.g., Stripe).
- Add pagination and filtering for GET requests.
- Set up GitHub Actions for automated CI/CD testing.

## License
MIT License