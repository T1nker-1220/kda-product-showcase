# Backend Documentation

## Overview
The backend of the Kusina de Amadeo app is built using **Next.js 14+** (App Router) and integrates with **Supabase** for database, authentication, and realtime functionality. The backend handles product management, order processing, user authentication, and realtime updates.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma (for schema control and database queries)
- **Authentication**: Google OAuth via Supabase
- **Realtime Updates**: Supabase Realtime
- **Email/Notifications**: Resend
- **State Management**: Zustand (for global state on the frontend)

## Database Schema

### Prisma ORM Models
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  role      Role     @default(CUSTOMER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  orders    Order[]
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Float
  category    Category
  imageUrl    String
  isAvailable Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  orderItems  OrderItem[]
  variants    Variant[]
}

model Variant {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id])
  name      String
  price     Float
  imageUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Order {
  id              String      @id @default(cuid())
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  status          OrderStatus @default(PENDING)
  totalAmount     Float
  paymentMethod   PaymentMethod
  paymentProofUrl String?
  deliveryAddress String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  orderItems      OrderItem[]
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Float
  addons    Json?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  CUSTOMER
}

enum Category {
  BUDGET_MEALS
  SILOG_MEALS
  ALA_CARTE
  BEVERAGES
}

enum OrderStatus {
  PENDING
  CONFIRMED
  DELIVERED
}

enum PaymentMethod {
  CASH
  GCASH
}
```

## API Endpoints

### 1. Products
- **GET** `/api/products` - Fetch all products
- **GET** `/api/products/:id` - Fetch a single product by ID
- **POST** `/api/products` - Create a new product (admin only)
- **PUT** `/api/products/:id` - Update a product (admin only)
- **DELETE** `/api/products/:id` - Delete a product (admin only)

### 2. Orders
- **GET** `/api/orders` - Fetch all orders (admin) or orders for the current user (customer)
- **GET** `/api/orders/:id` - Fetch a single order by ID
- **POST** `/api/orders` - Create a new order
- **PUT** `/api/orders/:id` - Update an order status (admin only)

### 3. Users
- **GET** `/api/users` - Fetch all users (admin only)
- **GET** `/api/users/:id` - Fetch a single user by ID
- **PUT** `/api/users/:id` - Update user details (admin only)

### 4. Authentication
- **POST** `/api/auth/login` - Handle Google OAuth login
- **POST** `/api/auth/logout` - Handle user logout

## Realtime Functionality

### Supabase Realtime Features
- Order status changes (e.g., from "pending" to "confirmed")
- New orders (admin dashboard)
- Product availability updates

## Authentication System

### Google OAuth
- **Single Sign-In**: Users log in using Google OAuth
- **Role-Based Access**:
  - Admin: kusinadeamadeo@gmail.com has full access to product and order management
  - Customer: Any valid Google account can place orders and track their status

### User Profile
- **Google Avatar**: Display the user's Google profile picture
- **Dropdown Menu**: Role-specific menu items:
  - Admin:
    - Dashboard
    - Product Management
    - Order Management
  - Customer:
    - My Orders
    - Profile Settings
    - Help & Support

## Email/Notifications

### Resend Integration
Automated email notifications for:
- Order confirmation
- Order status updates (e.g., "Your order has been delivered")
- Payment reminders (for GCash payments)

## State Management

### Zustand Store
Global state management for:
- User authentication state
- Cart state (e.g., cartItems array)
- Order state (e.g., orders array)

## Testing

### jest End-to-End Testing
Test cases for critical user flows:
1. User Authentication
   - Login process
   - Profile management
2. Order Management
   - Product browsing
   - Cart operations
   - Checkout flow
3. Admin Operations
   - Order status updates
   - Product management

## Deployment

### Platform
- Deployed on **Vercel**

### Environment Variables
```env
DATABASE_URL=your_supabase_database_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_api_key
```

## Next Steps
1. Review and validate all API endpoints
2. Implement additional security measures
3. Add more comprehensive test coverage
4. Optimize database queries
5. Set up monitoring and logging
6. Implement caching strategies 