# Frontend Documentation

## Overview
The frontend of the Kusina de Amadeo app is built using **Next.js 14+** with a focus on **performance**, **responsiveness**, and **user experience**. The design system is based on a **dark theme** with **gradient effects**, **smooth animations**, and **minimalist functionality**. The frontend integrates with the backend via **Supabase** for realtime updates and **Google OAuth** for authentication.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **State Management**: Zustand
- **Package Manager**: pnpm

## Project Structure

### Folder Structure
```plaintext
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx          # Login page (Google OAuth)
│   ├── (admin)/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Admin dashboard
│   │   ├── products/
│   │   │   └── page.tsx          # Product management
│   │   └── orders/
│   │       └── page.tsx          # Order management
│   ├── (customer)/
│   │   ├── menu/
│   │   │   └── page.tsx          # Customer menu (browse products)
│   │   ├── cart/
│   │   │   └── page.tsx          # Customer cart
│   │   └── orders/
│   │       └── page.tsx          # Customer order history
│   ├── layout.tsx                # Main layout (dark theme)
│   └── page.tsx                  # Home page
├── components/
│   ├── ui/                       # Shadcn UI components
│   ├── ProductCard.tsx           # Product card component
│   ├── OrderCard.tsx             # Order card component
│   └── Navbar.tsx                # Navigation bar
├── lib/
│   ├── auth.ts                   # Authentication utilities
│   ├── supabase.ts              # Supabase client
│   └── store.ts                 # Zustand store
├── styles/
│   └── globals.css              # Global styles (Tailwind CSS)
└── public/                      # Static assets (e.g., images)
```

## Components

### 1. Product Card
```tsx
import { Button } from "@/components/ui/button";

export default function ProductCard({ product }) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg shadow-lg">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg" />
      <h3 className="text-xl font-bold mt-4">{product.name}</h3>
      <p className="text-gray-400">{product.description}</p>
      <p className="text-lg font-semibold mt-2">₱{product.price}</p>
      <Button className="w-full mt-4">Add to Cart</Button>
    </div>
  );
}
```

### 2. Order Card
```tsx
export default function OrderCard({ order }) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold">Order #{order.id}</h3>
      <p className="text-gray-400">Status: {order.status}</p>
      <p className="text-lg font-semibold mt-2">Total: ₱{order.totalAmount}</p>
      <Button className="w-full mt-4">Track Order</Button>
    </div>
  );
}
```

### 3. Navigation Bar
```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar({ role }) {
  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Kusina de Amadeo
        </Link>
        {role === "admin" ? (
          <div className="flex gap-4">
            <Link href="/admin/dashboard">Dashboard</Link>
            <Link href="/admin/products">Products</Link>
            <Link href="/admin/orders">Orders</Link>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/customer/menu">Menu</Link>
            <Link href="/customer/cart">Cart</Link>
            <Link href="/customer/orders">Orders</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
```

## Navigation Routes

### Admin Routes
- Dashboard: `/admin/dashboard`
- Products: `/admin/products`
- Orders: `/admin/orders`

### Customer Routes
- Menu: `/customer/menu`
- Cart: `/customer/cart`
- Orders: `/customer/orders`
- Login: `/login` (Google OAuth)

## Styling

### Theme Configuration
- **Framework**: Tailwind CSS (utility-first CSS)
- **Theme**: Dark theme with gradient backgrounds
- **Gradients**: `from-gray-800 to-gray-900`
- **Text**: Light colors for contrast

### Animations
```tsx
import { motion } from "framer-motion";

export default function AnimatedButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      Click Me
    </motion.button>
  );
}
```

## State Management

### Zustand Store Configuration
```tsx
import { create } from "zustand";

interface StoreState {
  user: User | null;
  cartItems: Product[];
  orders: Order[];
  setUser: (user: User) => void;
  addToCart: (product: Product) => void;
  setOrders: (orders: Order[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  cartItems: [],
  orders: [],
  setUser: (user) => set({ user }),
  addToCart: (product) => set((state) => ({ cartItems: [...state.cartItems, product] })),
  setOrders: (orders) => set({ orders }),
}));
```

## Authentication System

### Google OAuth Integration
- **Single Sign-In Method**: Google OAuth only
- **Supported for**: Both admin and customer login

### User Profile Features
- Google Avatar integration
- Google photo synchronization
- Role-based dropdown menu

### Access Levels

#### 1. Admin Access
- **Email**: kusinadeamadeo@gmail.com
- **Features**:
  - Product management (add/edit/delete)
  - Order management (view/update)
  - Admin dashboard access
  - System settings

#### 2. Customer Access
- **Requirements**: Any valid Google account
- **Features**:
  - Order placement and tracking
  - Profile management
  - Cart management

## Asset Management

### Root Images
- Logo: `/images/logo.png`
- Hero Image: `/images/hero.jpg`
- Menu Hero: `/images/menu-hero.jpg`
- Login Background: `/images/login.jpg`
- About Hero: `/images/about-hero.jpg`
- Location QR: `/images/location-qr.png`
- Chaofans: `/images/chaofans.png`
- Google Sign In: `/images/google.svg`
- Pattern: `/images/pattern.svg`
- Placeholders:
  - SVG: `/images/placeholder.svg`
  - JPG: `/images/placeholder.jpg`

### Product Images

#### Silog Meals
- `/images/products/bangsilog.jpg`
- `/images/products/chicksilog.jpg`
- `/images/products/hamsilog.jpg`
- `/images/products/hotsilog.jpg`
- `/images/products/porksilog.jpg`
- `/images/products/sisigsilog.jpg`
- `/images/products/tapsilog.jpg`
- `/images/products/tocilog.jpg`

#### Budget Meals
- `/images/products/beef-chaofan.jpg`
- `/images/products/pork-chaofan.jpg`
- `/images/products/shanghai-rice.jpg`
- `/images/products/siomai-rice.jpg`
- `/images/products/skinless-rice.jpg`

#### Ala Carte
- `/images/products/beef-mami.jpg`
- `/images/products/cheese-stick.jpg`
- `/images/products/egg.jpg`
- `/images/products/fries.jpg`
- `/images/products/goto.jpg`
- `/images/products/graham-bar.jpg`
- `/images/products/lugaw.jpg`
- `/images/products/pares.jpg`
- `/images/products/pastil.jpg`
- `/images/products/rice.jpg`
- `/images/products/silog.jpg`
- `/images/products/waffle.jpg`

#### Beverages
- `/images/products/22ozfruitsoda.jpg`
- `/images/products/coke-float.jpg`
- `/images/products/fruit-soda.jpg`
- `/images/products/hot-coffee.jpg`
- `/images/products/iced-coffee.jpg`

### Variant Images

#### Fruit Soda Sizes
##### 22oz
- `/images/variants/blueberry-22oz.jpg`
- `/images/variants/greenapple-22oz.jpg`
- `/images/variants/lemon-22oz.jpg`
- `/images/variants/strawberry-22oz.jpg`

##### 16oz
- `/images/variants/blueberry-16oz.jpg`
- `/images/variants/greenapple-16oz.jpg`

### Category Images
- `/images/categories/ala-carte.jpg`
- `/images/categories/beverages.jpg`
- `/images/categories/budget-meals.jpg`
- `/images/categories/silog-meals.jpg`

### Payment Images
- `/images/payment/gcash-logo.png`

### Feature Images
- `/images/features/fresh.jpg`

### About Images
- `/images/about/2022.jpg`
- `/images/about/2023.jpg`
- `/images/about/2024.jpg`

## Testing

### Cypress Integration
- End-to-end testing for critical user flows

### Test Cases
1. User Authentication Flow
   - Login with Google
   - Profile management
2. Product Interaction Flow
   - Browse products
   - Add to cart
   - Checkout process
3. Admin Management Flow
   - Product management
   - Order status updates
   - Dashboard interactions

## Next Steps
1. Review and validate the documentation
2. Implement missing components
3. Add more test cases
4. Enhance animations and transitions
5. Optimize image loading and caching

---

Let me know if you need any clarification or have additional requirements! 🚀