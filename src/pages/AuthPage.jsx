import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoImage from '../assets/brand/elura-logo.svg'
import { useStore } from '../context/StoreContext.jsx'

function AuthPage({ mode = 'login' }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, googleLogin } = useStore()
  const isLogin = mode === 'login'
  const redirectTo = location.state?.redirectTo
  const notice = location.state?.notice

  return (
    <div className="section-spacing">
      <div className="section-shell max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div className="flex flex-col justify-between rounded-[18px] bg-white/45 p-8 sm:p-12">
            <div>
              <img src={logoImage} alt="ELURA Jewels" className="h-32 w-auto object-contain" />
              <p className="section-eyebrow mt-10">Account</p>
              <h1 className="mt-5 text-4xl sm:text-5xl">
                {isLogin ? 'Welcome back to ELURA' : 'Create your ELURA account'}
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-muted sm:text-lg">
                Save favourites, review orders, and keep your jewellery edit in one place.
              </p>
            </div>

            <div className="mt-10 space-y-4 border-t border-black/8 pt-8 text-sm text-muted">
              <p>Elegant account tools for saved pieces, order history, and delivery updates.</p>
              <p className="text-xs uppercase tracking-[0.28em] text-gold">
                United Kingdom
              </p>
            </div>
          </div>

          <div className="max-w-xl lg:pt-8">
            <p className="section-eyebrow">{isLogin ? 'Sign In' : 'Create Account'}</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">
              {isLogin ? 'Welcome back to ELURA' : 'Create your ELURA account'}
            </h2>

            {notice ? (
              <p className="mt-6 rounded-[16px] bg-white/65 px-5 py-4 text-sm text-muted shadow-[0_12px_30px_rgba(27,24,19,0.05)]">
                {notice}
              </p>
            ) : null}

            <form
              className="mt-10 space-y-7"
              onSubmit={(event) => {
                event.preventDefault()
                login({
                  name: isLogin ? 'Olivia Bennett' : 'New ELURA Customer',
                  email: isLogin ? 'olivia.bennett@example.com' : 'welcome@elura.uk',
                })
                navigate(redirectTo || '/profile')
              }}
            >
              {!isLogin && (
                <div>
                  <label className="mb-3 block text-xs font-medium uppercase tracking-[0.24em] text-muted">
                    Full name
                  </label>
                  <input className="input-shell" placeholder="Your full name" required />
                </div>
              )}
              <div>
                <label className="mb-3 block text-xs font-medium uppercase tracking-[0.24em] text-muted">
                  Email
                </label>
                <input
                  type="email"
                  className="input-shell"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div>
                <label className="mb-3 block text-xs font-medium uppercase tracking-[0.24em] text-muted">
                  Password
                </label>
                <input
                  type="password"
                  className="input-shell"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex flex-col gap-4 pt-3 sm:flex-row">
                <button type="submit" className="btn-primary w-full sm:w-auto">
                  {isLogin ? 'Login' : 'Create Account'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    googleLogin()
                    navigate(redirectTo || '/profile')
                  }}
                  className="btn-secondary w-full justify-center sm:w-auto"
                >
                  Continue with Google
                </button>
              </div>
            </form>

            <p className="mt-8 border-t border-black/8 pt-7 text-sm text-muted">
              {isLogin ? 'New to ELURA?' : 'Already have an account?'}{' '}
              <Link to={isLogin ? '/signup' : '/login'} className="font-semibold text-gold">
                {isLogin ? 'Sign up' : 'Log in'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
