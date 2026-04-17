import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

function TestimonialsSection({ testimonials }) {
  return (
    <section className="section-spacing bg-white">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Reviews"
          title="Loved for the finish, chosen for the simplicity"
          description="Customer feedback that reflects the cleaner ELURA experience: refined product, easy navigation, and premium presentation."
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 90}>
              <article className="rounded-[18px] bg-white/55 p-8">
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
