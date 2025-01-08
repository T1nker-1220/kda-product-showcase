# Product Requirements Document (PRD)

## App Overview
- **Name**: Kusina de Amadeo
- **Description**: A full-stack Next.js 14+ application for managing a local food store with realtime ordering, admin management, and customer features. The app provides a seamless experience for customers to browse, pre-order, and track their orders, while enabling admins to manage products and orders efficiently.
- **Tagline**: "Authentic Filipino cuisine, delivered to your doorstep."

---

## Target Audience
### User Personas
1. **Customer**:
   - **Demographics**: Local residents in Amadeo, Cavite, aged 18–50.
   - **Goals**: Easily browse and order food online, track orders in realtime, and make payments via GCash or cash.
   - **Pain Points**: Limited online ordering options, lack of realtime updates, and difficulty in pre-ordering.

2. **Admin**:
   - **Demographics**: Restaurant staff or owners, aged 25–50.
   - **Goals**: Efficiently manage products, orders, and deliveries with minimal effort.
   - **Pain Points**: Manual order tracking, lack of centralized management tools, and difficulty in updating product availability.

---

## Key Features
### Admin Features
1. **Product Management**:
   - Add, edit, and delete products.
   - Manage product categories (Budget Meals, Silog Meals, Ala Carte, Beverages).
   - Set product availability and variants (e.g., addons like Siomai, Shanghai, Egg).
   - Upload product images with a maximum size of 5MB (JPEG, PNG, WebP).

2. **Order Management**:
   - View all orders with filters (e.g., pending, confirmed, delivered).
   - Update order status (e.g., mark as delivered).
   - View customer details (name, contact info, delivery address).

3. **User Management**:
   - View customer profiles (Google OAuth integration).
   - Manage admin accounts (restricted to authorized users).

4. **Realtime Notifications**:
   - Receive realtime updates for new orders and order status changes.

---

### Customer Features
1. **Browse Products**:
   - View products by category (Budget Meals, Silog Meals, Ala Carte, Beverages).
   - Filter products by availability and price.
   - View product details (name, description, price, variants, addons).

2. **Pre-order Functionality**:
   - Place pre-orders with a minimum lead time of 2 hours and a maximum advance booking of 7 days.
   - Select delivery or pickup options.

3. **Realtime Order Tracking**:
   - Track order status in realtime (e.g., pending, confirmed, delivered).
   - Receive realtime notifications for order updates.

4. **Payment Methods**:
   - **GCash**: Upload payment proof via Facebook Messenger.
   - **Cash**: Pay in-store during pickup or delivery.

5. **Order History**:
   - View past orders with details (products, total amount, status).
   - Reorder favorite items with a single click.

---

## Technical Requirements
### Frontend
- **Framework**: Next.js 14+ (App Router).
- **UI Library**: Shadcn UI + Radix UI.
- **Styling**: Tailwind CSS.
- **Animations**: Framer Motion.
- **Icons**: Lucide Icons.
- **Theme**: Dark theme only with gradient effects.
- **Responsiveness**: Mobile-first design, responsive to all devices.
- **Package Manager**: pnpm.

### Backend
- **Framework**: Next.js 14+ (Full Stack).
- **Database**: Supabase (PostgreSQL) with Prisma ORM for schema control.
- **Realtime Functionality**: Supabase Realtime for order updates and notifications.
- **Authentication**: Google OAuth for admin and customer login.
- **Email/Notifications**: Resend for email notifications (e.g., order confirmation, status updates).
- **State Management**: Zustand for global state management.

### Payment Integration
- **GCash**: Manual handling (customers upload payment proof via Facebook Messenger).
- **Cash**: In-store payment only.

### Deployment
- **Platform**: Vercel (frontend + backend).
- **Environment**: Development and production environments.
- **Publishing**: Deployment-ready but not published until project completion.

---

## Success Metrics
1. **User Acquisition**:
   - Number of registered customers within the first 3 months.
   - Number of active users per week.

2. **Engagement**:
   - Number of orders placed per week.
   - Average order value.

3. **Retention**:
   - Percentage of returning customers.
   - Customer satisfaction score (e.g., via feedback forms).

4. **Operational Efficiency**:
   - Time taken to process and deliver orders.
   - Reduction in manual errors (e.g., incorrect orders).

---

## Assumptions and Risks
### Assumptions
1. Customers will use Google OAuth for login.
2. GCash payments will be handled manually (customers upload payment proof).
3. Admins will manually mark orders as delivered.
4. Realtime functionality will be implemented using Supabase Realtime.

### Risks
1. **Scalability**: Realtime functionality may require optimization for high traffic.
2. **Payment Proof Verification**: Manual handling of GCash payments may lead to delays or errors.
3. **User Adoption**: Customers may prefer traditional ordering methods over the app.

---

## Timeline
1. **Week 1–2**: Database schema design and Supabase setup with Prisma ORM.
2. **Week 3–4**: Frontend development (UI components, navigation, dark theme).
3. **Week 5–6**: Backend development (API endpoints, authentication, realtime functionality).
4. **Week 7–8**: Integration (frontend + backend, payment handling, notifications).
5. **Week 9–10**: Testing (unit tests, integration tests, user testing with Cypress).
6. **Week 11–12**: Deployment preparation (Vercel + GitHub setup).

---

## Documentation
1. **Code Comments**: Inline comments for complex logic.
2. **API Documentation**: Swagger/OpenAPI for backend APIs.
3. **README**: Comprehensive setup instructions for developers.
4. **Architecture Diagrams**: Visual representation of the app’s structure and data flow.

---

## Third-Party Libraries
1. **Frontend**:
   - Shadcn UI + Radix UI for prebuilt components.
   - Tailwind CSS for styling.
   - Framer Motion for animations.
   - Lucide Icons for icons.

2. **Backend**:
   - Supabase for database, authentication, and realtime functionality.
   - Prisma ORM for database schema control.
   - Resend for email notifications.
   - Zustand for global state management.

3. **Testing**:
   - Cypress for end-to-end testing.

4. **Package Manager**:
   - pnpm for dependency management.

---

## Database Schema (Prisma ORM)
Here’s the proposed schema for your Supabase database using Prisma ORM:

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