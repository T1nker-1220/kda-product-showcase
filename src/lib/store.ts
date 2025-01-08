import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variant: string
  flavor: string
  addons: string[]
  totalPrice: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find(
          (i) =>
            i.name === item.name &&
            i.variant === item.variant &&
            i.flavor === item.flavor &&
            JSON.stringify(i.addons.sort()) === JSON.stringify(item.addons.sort())
        )

        if (existingItem) {
          set({
            items: items.map((i) =>
              i === existingItem
                ? {
                  ...i,
                  quantity: i.quantity + item.quantity,
                  totalPrice: (i.quantity + item.quantity) * i.price,
                }
                : i
            ),
          })
        } else {
          set({ items: [...items, { ...item, id: Math.random().toString() }] })
        }
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity, totalPrice: quantity * item.price }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        const items = get().items
        return items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        const items = get().items
        return items.reduce((total, item) => total + item.totalPrice, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
) 