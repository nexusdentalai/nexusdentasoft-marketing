'use client'
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

type T = Record<string, any>

const COUNTRIES = ['TH', 'VN', 'SG', 'MY', 'PH', 'ID', 'KH', 'LA', 'MM', 'BN', 'OTHER'] as const
const SOURCES = ['google_search', 'facebook', 'line_zalo_whatsapp', 'conference', 'referral', 'instagram_tiktok', 'other'] as const

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function RequestAccessModal({
  isOpen,
  onClose,
  t,
  locale,
}: {
  isOpen: boolean
  onClose: () => void
  t: T
  locale: string
}) {
  const [practiceName, setPracticeName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [source, setSource] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const reset = useCallback(() => {
    setPracticeName('')
    setEmail('')
    setCountry('')
    setSource('')
    setStatus('idle')
    setErrorMsg('')
  }, [])

  const handleClose = useCallback(() => {
    if (status === 'submitting') return
    onClose()
    setTimeout(reset, 200)
  }, [status, onClose, reset])

  useEffect(() => {
    if (!isOpen) return
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onEsc)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEsc)
      document.body.style.overflow = prev
    }
  }, [isOpen, handleClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setErrorMsg('')
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app.nexusdentasoft.com'
      const res = await fetch(`${appUrl}/api/waitlist`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          practice_name: practiceName.trim(),
          email: email.trim().toLowerCase(),
          country,
          locale,
          source: source || null,
        }),
      })
      if (!res.ok) {
        let data: any = {}
        try { data = await res.json() } catch {}
        if (res.status === 409 || data?.error === 'email_exists') {
          setErrorMsg(t.privateBeta.error.duplicate)
        } else {
          setErrorMsg(t.privateBeta.error.generic)
        }
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setErrorMsg(t.privateBeta.error.generic)
      setStatus('error')
    }
  }

  if (!isOpen) return null
  if (typeof document === 'undefined') return null

  const pb = t.privateBeta

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-w-900/80 backdrop-blur-sm"
      style={{ animation: 'rfaModalFade 0.2s ease-out' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rfa-modal-title"
    >
      <div
        onClick={handleClose}
        className="flex min-h-screen items-start justify-center p-4 py-10"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="my-auto bg-surface rounded-2xl shadow-2xl w-full max-w-md p-7 sm:p-8 relative"
          style={{ animation: 'rfaModalPop 0.25s ease-out', boxShadow: '0 20px 60px rgba(28,27,26,0.25)' }}
        >
        <button
          type="button"
          onClick={handleClose}
          disabled={status === 'submitting'}
          aria-label={pb.modal.close}
          className="absolute top-4 right-4 p-1 text-w-500 hover:text-w-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-gold-dark" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3
              id="rfa-modal-title"
              className="text-2xl text-w-900 mb-3"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 400 }}
            >
              {pb.confirmation.title}
            </h3>
            <p className="text-sm text-w-700 leading-relaxed mb-6">{pb.confirmation.body}</p>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 bg-gold text-w-0 text-sm font-medium rounded-[10px] hover:bg-gold-dark transition-colors"
            >
              {pb.confirmation.close}
            </button>
          </div>
        ) : (
          <>
            <h3
              id="rfa-modal-title"
              className="text-2xl text-w-900 mb-1 pr-8"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 400 }}
            >
              {pb.modal.title}
            </h3>
            <p className="text-sm text-w-700 mb-6">{pb.modal.subtitle}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="rfa-practice" className="block text-xs font-medium text-w-900 mb-1.5">
                  {pb.modal.practiceName}
                </label>
                <input
                  id="rfa-practice"
                  type="text"
                  required
                  value={practiceName}
                  onChange={e => setPracticeName(e.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full border border-w-200 rounded-[10px] px-4 py-2.5 text-sm text-w-900 focus:border-gold focus:ring-2 focus:ring-gold-50 outline-none transition-all disabled:bg-w-50"
                />
              </div>
              <div>
                <label htmlFor="rfa-email" className="block text-xs font-medium text-w-900 mb-1.5">
                  {pb.modal.email}
                </label>
                <input
                  id="rfa-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full border border-w-200 rounded-[10px] px-4 py-2.5 text-sm text-w-900 focus:border-gold focus:ring-2 focus:ring-gold-50 outline-none transition-all disabled:bg-w-50"
                />
              </div>
              <div>
                <label htmlFor="rfa-country" className="block text-xs font-medium text-w-900 mb-1.5">
                  {pb.modal.country}
                </label>
                <select
                  id="rfa-country"
                  required
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full border border-w-200 rounded-[10px] px-4 py-2.5 text-sm text-w-900 focus:border-gold focus:ring-2 focus:ring-gold-50 outline-none transition-all disabled:bg-w-50 bg-surface"
                >
                  <option value="" disabled>{pb.modal.placeholder}</option>
                  {COUNTRIES.map(c => (
                    <option key={c} value={c}>{pb.country[c]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="rfa-source" className="block text-xs font-medium text-w-900 mb-1.5">
                  {pb.modal.source} <span className="text-w-500 font-normal">{pb.modal.sourceOptional}</span>
                </label>
                <select
                  id="rfa-source"
                  value={source}
                  onChange={e => setSource(e.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full border border-w-200 rounded-[10px] px-4 py-2.5 text-sm text-w-900 focus:border-gold focus:ring-2 focus:ring-gold-50 outline-none transition-all disabled:bg-w-50 bg-surface"
                >
                  <option value="">{pb.modal.placeholder}</option>
                  {SOURCES.map(s => (
                    <option key={s} value={s}>{pb.source[s]}</option>
                  ))}
                </select>
              </div>
              {status === 'error' && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full px-6 py-3 bg-gold text-w-0 text-sm font-semibold rounded-[10px] hover:bg-gold-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? pb.modal.submitting : pb.modal.submit}
              </button>
            </form>
          </>
        )}
      </div>
      </div>
      <style jsx>{`
        @keyframes rfaModalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes rfaModalPop {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )

  return createPortal(modalContent, document.body)
}
