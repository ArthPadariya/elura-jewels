import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import CartDrawer from './CartDrawer.jsx'
import Header from './Header.jsx'
import FooterSection from '../sections/FooterSection.jsx'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.search])

  return null
}

function SiteLayout() {
  const [cartOpen, setCartOpen] = useState(false)
  const location = useLocation()
  const { cartItems, updateCartQuantity, removeFromCart } = useStore()

  return (
    <div className="page-shell">
      <ScrollToTop />
      <Header
        key={`${location.pathname}${location.search}`}
        onCartOpen={() => setCartOpen(true)}
      />
      <main className="pt-[72px] sm:pt-[84px]">
        <Outlet />
      </main>
      <FooterSection />
      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />
    </div>
  )
}

export default SiteLayout
