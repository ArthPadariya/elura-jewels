/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { accountOrders, products } from '../data/siteData.js'

const StoreContext = createContext(null)

const readStoredValue = (key, fallback) => {
  const value = window.localStorage.getItem(key)

  if (!value) {
    return fallback
  }

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => readStoredValue('elura-cart', []))
  const [wishlistIds, setWishlistIds] = useState(() =>
    readStoredValue('elura-wishlist', []),
  )
  const [user, setUser] = useState(() => readStoredValue('elura-user', null))
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem('elura-cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    window.localStorage.setItem('elura-wishlist', JSON.stringify(wishlistIds))
  }, [wishlistIds])

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('elura-user', JSON.stringify(user))
      return
    }

    window.localStorage.removeItem('elura-user')
  }, [user])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const wishlistProducts = products.filter((product) => wishlistIds.includes(product.id))

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const addToCart = (product, quantity = 1, options = {}) => {
    const { openDrawer = true } = options

    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id)

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...current, { ...product, quantity }]
    })

    if (openDrawer) {
      openCart()
    }
  }

  const updateCartQuantity = (productId, nextQuantity) => {
    if (nextQuantity <= 0) {
      setCartItems((current) => current.filter((item) => item.id !== productId))
      return
    }

    setCartItems((current) =>
      current.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item,
      ),
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId))
  }

  const clearCart = () => setCartItems([])

  const toggleWishlist = (productId) => {
    setWishlistIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  const login = ({ name, email }) => {
    setUser({
      name,
      email,
      memberSince: '2025',
      loyaltyId: 'ELURA-UK-2048',
    })
  }

  const googleLogin = () => {
    setUser({
      name: 'Amelia Hart',
      email: 'amelia.hart@example.com',
      memberSince: '2025',
      loyaltyId: 'ELURA-UK-2048',
    })
  }

  const logout = () => setUser(null)

  return (
    <StoreContext.Provider
      value={{
        products,
        cartItems,
        cartCount,
        cartSubtotal,
        isCartOpen,
        wishlistIds,
        wishlistProducts,
        user,
        orders: accountOrders,
        openCart,
        closeCart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        login,
        googleLogin,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

const useStore = () => {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error('useStore must be used inside StoreProvider')
  }

  return context
}

export { StoreProvider, useStore }
