/* global process */
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resend } from 'resend'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()
const port = Number(process.env.PORT || 5000)
const resend = new Resend(process.env.RESEND_API_KEY)

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
]

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Origin not allowed by CORS'))
    },
  }),
)
app.use(express.json())

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body ?? {}
  const trimmedName = name?.trim()
  const trimmedEmail = email?.trim()
  const trimmedMessage = message?.trim()

  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ error: 'Missing RESEND_API_KEY' })
    return
  }

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    res.status(400).json({ error: 'Name, email, and message are required.' })
    return
  }

  const safeName = escapeHtml(trimmedName)
  const safeEmail = escapeHtml(trimmedEmail)
  const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br />')

  try {
    await Promise.all([
      resend.emails.send({
        from: 'ELURA <info@elurajewels.com>',
        to: 'info.elurajewels@gmail.com',
        replyTo: trimmedEmail,
        subject: 'New Contact Message',
        html: `
          <div>
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          </div>
        `,
      }),
      resend.emails.send({
        from: 'ELURA <info@elurajewels.com>',
        to: trimmedEmail,
        subject: 'We received your message',
        html: `
          <div>
            <p>Hi ${safeName},</p>
            <p>Thank you for contacting ELURA. We will get back to you shortly.</p>
          </div>
        `,
      }),
    ])

    res.json({ success: true })
  } catch (error) {
    console.error('Failed to send contact email', error)
    res.status(500).json({ error: 'Unable to send message right now.' })
  }
})

app.listen(port, () => {
  console.log(`ELURA contact server running on http://localhost:${port}`)
})
