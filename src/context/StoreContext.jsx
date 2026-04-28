/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import {
  accountOrders,
  homeFeaturedProducts as fallbackHomeFeaturedProducts,
  products as fallbackProducts,
} from '../data/siteData.js'
import { getShopifyProducts } from '../lib/shopify.js'

const StoreContext = createContext(null)

const normalizeValue = (value) => value?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') ?? ''

const inferCategory = (fallbackProduct, handle, title) => {
  if (fallbackProduct?.category) {
    return fallbackProduct.category
  }

  const subject = `${handle} ${title}`.toLowerCase()

  if (subject.includes('bangle')) {
    return 'Bangles'
  }

  if (subject.includes('bracelet')) {
    return 'Bracelets'
  }

  if (subject.includes('earring') || subject.includes('stud')) {
    return 'Earrings'
  }

  if (subject.includes('ring')) {
    return 'Rings'
  }

  return 'Necklaces'
}

const buildImages = (primaryImage, fallbackImages = []) => {
  const images = [primaryImage, ...fallbackImages].filter(Boolean)

  while (images.length < 3) {
    images.push(images[images.length - 1] ?? '')
  }

  return images.slice(0, 3)
}

const mapShopifyProduct = (node) => {
  const fallbackProduct = fallbackProducts.find(
    (item) =>
      item.slug === node.handle ||
      normalizeValue(item.name) === normalizeValue(node.title),
  )
  const primaryImage = node.images?.edges?.[0]?.node?.url ?? fallbackProduct?.images?.[0] ?? ''
  const amount = node.variants?.edges?.[0]?.node?.price?.amount
  const price = Number.parseFloat(amount ?? fallbackProduct?.price ?? 0)

  return {
    id: fallbackProduct?.id ?? node.id,
    slug: node.handle ?? fallbackProduct?.slug ?? normalizeValue(node.title),
    name: node.title ?? fallbackProduct?.name ?? 'ELURA Product',
    category: inferCategory(fallbackProduct, node.handle ?? '', node.title ?? ''),
    price: Number.isNaN(price) ? 0 : price,
    description:
      fallbackProduct?.description ??
      'Selected from the ELURA collection with premium finishing and refined detail.',
    materials: fallbackProduct?.materials ?? ['Material details available on request'],
    details: fallbackProduct?.details ?? ['Presented in ELURA packaging'],
    images: buildImages(primaryImage, fallbackProduct?.images?.slice(1)),
    reviews: fallbackProduct?.reviews ?? [],
  }
}

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
  const [products, setProducts] = useState(fallbackProducts)
  const [isProductsLoading, setIsProductsLoading] = useState(true)
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

  useEffect(() => {
    let isActive = true

    const loadProducts = async () => {
      try {
        const shopifyProducts = await getShopifyProducts()

        if (isActive && shopifyProducts.length > 0) {
          setProducts(shopifyProducts.map(mapShopifyProduct))
        }
      } catch (error) {
        console.error('Failed to load Shopify products', error)
      } finally {
        if (isActive) {
          setIsProductsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isActive = false
    }
  }, [])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const wishlistProducts = products.filter((product) => wishlistIds.includes(product.id))
  const homeFeaturedProducts = fallbackHomeFeaturedProducts
    .map((featuredProduct) => products.find((product) => product.slug === featuredProduct.slug))
    .filter(Boolean)

  while (homeFeaturedProducts.length < 4 && homeFeaturedProducts.length < products.length) {
    const nextProduct = products[homeFeaturedProducts.length]

    if (nextProduct && !homeFeaturedProducts.some((product) => product.id === nextProduct.id)) {
      homeFeaturedProducts.push(nextProduct)
    }
  }

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
        homeFeaturedProducts,
        isProductsLoading,
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
