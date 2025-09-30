// Vercel serverless function — /api/submit-lead.ts
// Sends an email (via SMTP or provider) and stores the lead in Supabase (optional).

import type { VercelRequest, VercelResponse } from '@vercel/node'

// Optional: simple email via Resend, Mailgun, etc. (choose one provider)
// Here we sketch Resend; set RESEND_API_KEY & RESEND_TO in env.
async function sendEmail(payload: any) {
  const key = process.env.RESEND_API_KEY
  const to = process.env.RESEND_TO
  if (!key || !to) return
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'no-reply@kingspan-ee.local',
      to,
      subject: 'New Kingspan Eesti BIO lead',
      text: JSON.stringify(payload, null, 2),
    })
  })
  if (!res.ok) throw new Error('Email send failed')
}

// Optional: Supabase insert using service role key (do NOT use anon key here)
async function saveToSupabase(payload: any) {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) return
  const res = await fetch(`${url}/rest/v1/web_leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify({
      source: 'kingspan-ee',
      created_at: new Date().toISOString(),
      ...payload
    })
  })
  if (!res.ok) throw new Error('Supabase insert failed')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  const t0 = Date.now()
  const honeypot = (req.body && req.body.company) || req.query.company // hidden field
  if (honeypot) return res.status(200).json({ ok: true }) // bot

  const payload = {
    name: req.body?.name || '',
    email: req.body?.email || '',
    phone: req.body?.phone || '',
    type: req.body?.type || '',
    pe: req.body?.pe || '',
    groundwater: req.body?.groundwater || '',
    message: req.body?.message || '',
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    ua: req.headers['user-agent'],
    took_ms: Date.now() - t0,
  }

  try {
    await Promise.all([ sendEmail(payload), saveToSupabase(payload) ])
    return res.status(200).json({ ok: true })
  } catch (e:any) {
    return res.status(500).json({ ok: false, error: e.message })
  }
}
