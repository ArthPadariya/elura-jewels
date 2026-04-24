import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useEffectEvent, useRef } from 'react'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

function TestimonialsSection({ testimonials }) {
  const sliderRef = useRef(null)

  const scrollCards = (direction) => {
    const slider = sliderRef.current

    if (!slider) {
      return
    }

    const scrollAmount = Math.min(slider.clientWidth * 0.88, 420)

    slider.scrollBy({
      left: scrollAmount * direction,
      behavior: 'smooth',
    })
  }

  const advanceSlider = useEffectEvent(() => {
    const slider = sliderRef.current

    if (!slider) {
      return
    }

    const maxScrollLeft = slider.scrollWidth - slider.clientWidth - 12

    if (slider.scrollLeft >= maxScrollLeft) {
      slider.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }

    scrollCards(1)
  })

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      advanceSlider()
    }, 5200)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className="section-spacing bg-white">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Reviews"
            title="Loved for the finish, chosen for the simplicity"
            description="Customer feedback that reflects the cleaner ELURA experience: refined product, easy navigation, and premium presentation."
          />

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              className="icon-button border border-black/8"
              aria-label="Scroll reviews left"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollCards(1)}
              className="icon-button border border-black/8"
              aria-label="Scroll reviews right"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2 scroll-smooth"
        >
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.id}
              delay={index * 90}
              className="min-w-[85%] flex-[0_0_85%] snap-start sm:min-w-[24rem] sm:flex-[0_0_24rem] lg:min-w-[26rem] lg:flex-[0_0_26rem]"
            >
              <article className="review-card rounded-[16px] bg-white p-6 shadow-[0_14px_36px_rgba(27,24,19,0.06)] transition duration-300 hover:-translate-y-1">
                <p className="text-lg leading-8 text-ink">{testimonial.quote}</p>
                <div className="mt-8">
                  <h3 className="text-xl">{testimonial.name}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-muted">
                    {testimonial.title}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
