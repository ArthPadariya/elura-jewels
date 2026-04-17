import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'

function NotFoundPage() {
  return (
    <div className="section-spacing">
      <div className="section-shell max-w-3xl text-center">
        <SectionHeading
          eyebrow="404"
          title="Page not found"
          description="The page you're looking for isn't available right now."
          align="center"
        />
        <Link to="/" className="btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
