import { Link } from 'react-router-dom'
import logoImage from '../assets/brand/elura-logo-transparent.png'
import { contactDetails, footerGroups } from '../data/siteData.js'

function FooterSection() {
  return (
    <footer className="border-t border-black/8 bg-white/45">
      <div className="section-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <img
              src={logoImage}
              alt="ELURA Jewels"
              className="mb-3 h-12 w-auto object-contain"
            />
            <p className="max-w-xl text-sm leading-7 text-muted sm:text-base">
              Modern and contemporary jewellery with a clean, premium feel shaped for
              everyday luxury and occasion dressing.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-4">
            {Object.entries(footerGroups).map(([groupName, links]) => (
              <div key={groupName}>
                <p className="section-eyebrow">{groupName}</p>
                <div className="mt-4 space-y-3 text-sm text-muted">
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="link-animated footer-link"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <p className="section-eyebrow">CONTACT</p>
              <div className="mt-4 space-y-3 text-sm text-muted">
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="link-animated footer-link"
                >
                  {contactDetails.email}
                </a>
                <a
                  href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
                  className="link-animated footer-link"
                >
                  {contactDetails.phone}
                </a>
                <p>{contactDetails.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-3 border-t border-black/8 pt-6 text-xs uppercase tracking-[0.18em] text-muted sm:grid-cols-2 sm:items-center">
          <p className="sm:justify-self-start">Designed &amp; Developed by Ecliptix Solutions</p>
          <p className="sm:justify-self-end">&copy; 2026 ELURA Jewels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
