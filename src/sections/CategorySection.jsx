import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

function CategorySection({ cards }) {
  return (
    <section className="section-spacing" id="home-collections">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Collections"
          title="Explore Our Collections"
          description="A clearer, more product-led collection layout with soft imagery, restrained styling, and easy paths into the shop."
        />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="lg:row-span-2">
            <Link to={cards[0].href} className="group block overflow-hidden rounded-[18px]">
              <img
                src={cards[0].image}
                alt={cards[0].title}
                className="h-[34rem] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="space-y-2 px-1 py-6 sm:px-2 sm:py-7">
                <h3 className="text-3xl sm:text-4xl">{cards[0].title}</h3>
                <p className="text-sm text-muted sm:text-base">{cards[0].subtitle}</p>
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-5">
            {cards.slice(1).map((card, index) => (
              <Reveal key={card.title} delay={index * 80}>
                <Link to={card.href} className="group block overflow-hidden rounded-[18px]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="space-y-2 px-1 py-5">
                    <h3 className="text-2xl">{card.title}</h3>
                    <p className="text-sm text-muted">{card.subtitle}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategorySection
