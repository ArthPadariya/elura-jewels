import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useEffectEvent, useState } from 'react'
import { Link } from 'react-router-dom'

function HeroSection({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const advanceSlide = useEffectEvent(() => {
    setActiveIndex((current) => (current + 1) % slides.length)
  })

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      advanceSlide()
    }, 5000)

    return () => window.clearInterval(intervalId)
  }, [slides.length])

  return (
    <section className="relative">
      <div className="relative h-[60vh] min-h-[28rem] overflow-hidden min-[481px]:h-[70vh] min-[769px]:h-[76vh] sm:mx-4 sm:rounded-[14px] lg:h-[84vh] lg:rounded-[16px]">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition duration-1000 ${
                isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.heading}
                className={`h-full w-full object-cover object-top min-[769px]:object-center transition-transform duration-[7000ms] ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/12 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
              <div className="section-shell relative z-10 flex h-full items-end pb-14 sm:pb-20">
                <div
                  className={`max-w-2xl text-white transition duration-700 ${
                    isActive ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                  }`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-gold">
                    {slide.label}
                  </p>
                  <h1 className="mt-5 text-4xl text-white sm:text-5xl lg:text-[4.6rem] lg:leading-[0.95]">
                    {slide.heading}
                  </h1>
                  <p className="mt-6 max-w-xl text-base text-white/82 sm:text-lg">
                    {slide.subtext}
                  </p>
                  <Link
                    to={slide.ctaHref}
                    className="btn-primary mt-9 bg-emerald/95 shadow-[0_18px_30px_rgba(15,59,46,0.16)] hover:bg-emerald"
                  >
                    {slide.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          )
        })}

        <div className="section-shell absolute inset-x-0 bottom-6 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 transition ${
                  index === activeIndex ? 'w-12 bg-gold' : 'w-7 bg-white/60'
                }`}
                aria-label={`View slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) =>
                  current === 0 ? slides.length - 1 : current - 1,
                )
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-gold hover:text-gold"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-gold hover:text-gold"
              aria-label="Next slide"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
