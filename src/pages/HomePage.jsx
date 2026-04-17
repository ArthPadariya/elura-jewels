import {
  collectionCards,
  brandStory,
  heroSlides,
  homeFeaturedProducts,
  promoBanners,
  testimonials,
} from '../data/siteData.js'
import BrandStorySection from '../sections/BrandStorySection.jsx'
import CategorySection from '../sections/CategorySection.jsx'
import FinalCtaSection from '../sections/FinalCtaSection.jsx'
import HeroSection from '../sections/HeroSection.jsx'
import ProductSection from '../sections/ProductSection.jsx'
import TestimonialsSection from '../sections/TestimonialsSection.jsx'

function HomePage() {
  return (
    <>
      <HeroSection slides={heroSlides} />
      <CategorySection cards={collectionCards} />
      <ProductSection products={homeFeaturedProducts} />
      <BrandStorySection story={brandStory} />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCtaSection banners={promoBanners} />
    </>
  )
}

export default HomePage
