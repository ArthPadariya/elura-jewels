import { MessageCircle } from 'lucide-react'

const whatsappUrl =
  'https://wa.me/447440482483?text=Hi%20I%20am%20interested%20in%20your%20jewelry'

function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[55] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_32px_rgba(0,0,0,0.18)] transition hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  )
}

export default WhatsAppButton
