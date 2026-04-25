import { Link } from 'react-router-dom'
import { useEffect, useEffectEvent, useState } from 'react'
import Reveal from '../components/Reveal.jsx'

function FinalCtaSection({ banners }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const advanceBanner = useEffectEvent(() => {
    setActiveIndex((current) => (current + 1) % banners.length)
  })

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      advanceBanner()
    }, 4800)

    return () => window.clearInterval(intervalId)
  }, [banners.length])

  return (
    <section className="section-spacing">
      <div className="section-shell">
        <Reveal className="overflow-hidden rounded-[18px]">
          <div className="relative h-[22rem] overflow-hidden bg-linen sm:h-[26rem] lg:h-[28rem]">
            {banners.map((banner, index) => {
              const isActive = index === activeIndex

              return (
                <div
                  key={banner.id}
                  className={`absolute inset-0 grid gap-6 transition duration-700 lg:grid-cols-[0.92fr_1.08fr] ${
                    isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <div className="flex items-center px-7 py-10 sm:px-10 lg:px-14">
                    <div className="max-w-xl">
                      <p className="section-eyebrow">{banner.label}</p>
                      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
                        {banner.heading}
                      </h2>
                      <p className="mt-4 text-base text-muted sm:text-lg">
                        {banner.subtext}
                      </p>
                      <Link to={banner.ctaHref} className="btn-primary mt-8">
                        {banner.ctaLabel}
                      </Link>
                    </div>
                  </div>

                  <div className="relative hidden overflow-hidden lg:block">
                    <img
                      src={banner.image}
                      alt={banner.heading}
                      className={`h-full w-full object-contain object-center bg-linen/35 p-8 transition-transform duration-[5000ms] ${
                        isActive ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-linen/20 to-transparent" />
                  </div>
                </div>
              )
            })}

            <div className="absolute bottom-6 left-7 z-10 flex items-center gap-2 sm:left-10 lg:left-14">
              {banners.map((banner, index) => (
                <button
                  key={banner.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 transition ${
                    index === activeIndex ? 'w-10 bg-gold' : 'w-6 bg-ink/20'
                  }`}
                  aria-label={`View promotional banner ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default FinalCtaSection
