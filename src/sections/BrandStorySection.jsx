import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

function BrandStorySection({ story }) {
  return (
    <section className="section-spacing">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <img
              src={story.image}
              alt={story.title}
              className="h-full min-h-[34rem] w-full rounded-[18px] object-cover"
            />
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              eyebrow="About ELURA"
              title={story.title}
              description={story.body[0]}
            />

            <div className="space-y-5 text-base text-muted sm:text-lg">
              <p>{story.body[1]}</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {story.features.map((feature, index) => (
                <div
                  key={`feature-${index}`}
                  className="rounded-[16px] bg-white/55 px-5 py-4 text-sm text-muted"
                >
                  {feature}
                </div>
              ))}
            </div>

            <Link to="/about" className="line-link mt-8">
              Learn More
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default BrandStorySection
