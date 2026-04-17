import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import { faqItems } from '../data/siteData.js'

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="section-spacing">
      <div className="section-shell max-w-4xl">
        <SectionHeading
          eyebrow="FAQs"
          title="Answers to common questions"
          description="Everything from shipping and returns to care guidance and gifting presentation."
        />

        <div className="space-y-1">
          {faqItems.map((item, index) => {
            const isOpen = index === openIndex

            return (
              <article key={item.question} className="border-b border-black/8">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="text-lg font-medium text-ink sm:text-xl">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted transition ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <p className="max-w-3xl pb-6 pr-8 text-sm leading-7 text-muted">
                    {item.answer}
                  </p>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FaqPage
