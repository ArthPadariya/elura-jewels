import { Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../data/siteData.js'
import { useStore } from '../context/StoreContext.jsx'

function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemove,
}) {
  const navigate = useNavigate()
  const { user } = useStore()
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/25 transition ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-ivory shadow-[0_0_50px_rgba(15,20,17,0.16)] transition duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/8 px-6 py-5">
          <div>
            <p className="section-eyebrow">Your Cart</p>
            <h2 className="mt-2 text-2xl">Shopping Bag</h2>
          </div>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Close cart">
            <X className="h-4 w-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70">
              <ShoppingBag className="h-7 w-7 text-muted" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl">Your bag is empty</h3>
              <p className="text-sm text-muted">
                Add a few pieces and continue building your ELURA collection.
              </p>
            </div>
            <Link to="/shop" onClick={onClose} className="btn-primary">
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-5">
                {items.map((item) => (
                  <article key={item.id} className="flex gap-4 border-b border-black/8 pb-5">
                    <Link to={`/product/${item.slug}`} onClick={onClose}>
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-28 w-24 rounded-[14px] object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-muted">
                          {item.category}
                        </p>
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={onClose}
                          className="product-name-animated mt-2 block w-fit text-lg font-medium text-ink"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-2 text-sm text-muted">{formatCurrency(item.price)}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-black/10 bg-white/70">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="inline-flex h-9 w-9 items-center justify-center"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="inline-flex min-w-10 items-center justify-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="inline-flex h-9 w-9 items-center justify-center"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          className="text-xs font-semibold uppercase tracking-[0.24em] text-muted transition hover:text-gold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="border-t border-black/8 px-6 py-6">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Subtotal</span>
                <span className="text-xl font-semibold text-ink">{formatCurrency(subtotal)}</span>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-muted">
                Taxes and shipping calculated at checkout
              </p>
              <div className="mt-6 grid gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose()

                    if (user) {
                      navigate('/checkout')
                      return
                    }

                    navigate('/login', {
                      state: {
                        redirectTo: '/checkout',
                        notice: 'Please login to continue to checkout',
                      },
                    })
                  }}
                  className="btn-primary"
                >
                  Checkout
                </button>
                <Link to="/shop" onClick={onClose} className="line-link text-center">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default CartDrawer
