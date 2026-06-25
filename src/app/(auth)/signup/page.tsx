'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import Image from 'next/image'

type Step = 'account' | 'tier' | 'payment' | 'success'

type FormData = {
  fullName: string
  company: string
  jobTitle: string
  email: string
  password: string
  tier: 'individual' | 'institutional' | null
  paymentMethod: 'va' | 'qris' | 'card' | null
}

const tiers = [
  {
    id: 'individual' as const,
    name: 'Individual',
    price: 'IDR 5,000,000',
    period: 'per year',
    features: ['Research & whitepapers', 'Board video updates', 'Meeting requests (4/quarter)', 'Member newsletter'],
  },
  {
    id: 'institutional' as const,
    name: 'Institutional',
    price: 'IDR 25,000,000',
    period: 'per year',
    recommended: true,
    features: ['Everything in Individual', 'LP-level exclusive research', 'Priority introductions', 'Exclusive roundtables', 'Brand activation'],
  },
]

export default function SignupPage() {
  const [step, setStep] = useState<Step>('account')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    company: '',
    jobTitle: '',
    email: '',
    password: '',
    tier: null,
    paymentMethod: null,
  })

  const supabase = createClient()

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setStep('tier')
  }

  const handleTierSelect = (tier: 'individual' | 'institutional') => {
    setFormData({ ...formData, tier })
    setStep('payment')
  }

  const handlePayment = async () => {
    if (!formData.paymentMethod) {
      setError('Please select a payment method')
      return
    }
    setLoading(true)
    setError(null)

    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          company: formData.company,
          job_title: formData.jobTitle,
          tier: formData.tier,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    setStep('success')
    setLoading(false)
  }

  const tierPrices: Record<string, number> = {
    individual: 5000000,
    institutional: 25000000,
  }

  const selectedTierData = tiers.find(t => t.id === formData.tier)

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src="/images/nxclogo.png" alt="Nexticorn" width={80} height={40} className="block" />
          </Link>
          <Link href="/login" className="text-sm text-[#6B7280] hover:text-[#111111]">
            Already a member? <span className="text-[#E61952] font-medium">Sign in</span>
          </Link>
        </div>
      </div>

      {/* Progress bar */}
      {step !== 'success' && (
        <div className="bg-white border-b border-[#E5E7EB] px-6 py-4">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-2">
              {[
                { id: 'account', label: 'Account' },
                { id: 'tier', label: 'Membership' },
                { id: 'payment', label: 'Payment' },
              ].map((s, index) => {
                const steps = ['account', 'tier', 'payment']
                const currentIndex = steps.indexOf(step)
                const stepIndex = steps.indexOf(s.id)
                const isComplete = stepIndex < currentIndex
                const isCurrent = stepIndex === currentIndex
                return (
                  <div key={s.id} className="flex items-center gap-2 flex-1">
                    <div className="flex items-center gap-2 shrink-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isComplete ? 'bg-[#E61952] text-white' :
                        isCurrent ? 'bg-[#111111] text-white' :
                        'bg-[#E5E7EB] text-[#9CA3AF]'
                      }`}>
                        {isComplete ? (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : index + 1}
                      </div>
                      <span className={`text-xs font-medium hidden sm:block ${isCurrent ? 'text-[#111111]' : isComplete ? 'text-[#E61952]' : 'text-[#9CA3AF]'}`}>
                        {s.label}
                      </span>
                    </div>
                    {index < 2 && <div className={`h-px flex-1 ${stepIndex < currentIndex ? 'bg-[#E61952]' : 'bg-[#E5E7EB]'}`} />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-lg mx-auto px-6 py-8">

        {/* Step 1: Account */}
        {step === 'account' && (
          <div>
            <h1 className="text-2xl font-semibold text-[#111111] mb-1">Create your account</h1>
            <p className="text-[#6B7280] text-sm mb-6">Join the Nexticorn membership network.</p>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
              <form onSubmit={handleAccountSubmit} className="space-y-4">
                {[
                  { label: 'Full name', name: 'fullName', type: 'text', placeholder: 'Kevin Yonathan' },
                  { label: 'Company', name: 'company', type: 'text', placeholder: 'Acme Ventures' },
                  { label: 'Job title', name: 'jobTitle', type: 'text', placeholder: 'Partner' },
                  { label: 'Work email', name: 'email', type: 'email', placeholder: 'you@company.com' },
                  { label: 'Password', name: 'password', type: 'password', placeholder: 'Min. 8 characters' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm text-[#6B7280] mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      value={formData[field.name as keyof FormData] as string}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      required
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[#111111] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#E61952]"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
                {error && <p className="text-[#E61952] text-sm">{error}</p>}
                <button type="submit" className="w-full bg-[#E61952] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#C01544] transition-colors">
                  Continue to membership →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: Tier */}
        {step === 'tier' && (
          <div>
            <button onClick={() => setStep('account')} className="text-sm text-[#6B7280] hover:text-[#111111] flex items-center gap-1 mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-semibold text-[#111111] mb-1">Choose your membership</h1>
            <p className="text-[#6B7280] text-sm mb-6">Select the tier that best fits your needs.</p>
            <div className="space-y-4">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => handleTierSelect(tier.id)}
                  className={`w-full text-left bg-white border-2 rounded-xl p-6 hover:border-[#E61952] hover:shadow-md transition-all relative ${
                    tier.recommended ? 'border-[#E61952]' : 'border-[#E5E7EB]'
                  }`}
                >
                  {tier.recommended && (
                    <div className="absolute top-4 right-4 text-xs bg-[#E61952] text-white px-2.5 py-1 rounded-full font-medium">
                      Recommended
                    </div>
                  )}
                  <div className="text-xs text-[#9CA3AF] uppercase tracking-widest mb-1">{tier.name}</div>
                  <div className="text-2xl font-bold text-[#111111] mb-0.5">{tier.price}</div>
                  <div className="text-xs text-[#9CA3AF] mb-4">{tier.period}</div>
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <div className="w-4 h-4 bg-[#FEE2E2] rounded-full flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 bg-[#E61952] rounded-full" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 'payment' && (
          <div>
            <button onClick={() => setStep('tier')} className="text-sm text-[#6B7280] hover:text-[#111111] flex items-center gap-1 mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-2xl font-semibold text-[#111111] mb-1">Complete payment</h1>
            <p className="text-[#6B7280] text-sm mb-6">Your membership will be activated after payment is confirmed.</p>

            {/* Order summary */}
            <div className="bg-[#111111] rounded-xl p-5 mb-6">
              <div className="text-[#9CA3AF] text-xs uppercase tracking-wide mb-3">Order summary</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">{selectedTierData?.name} Membership</div>
                  <div className="text-[#7F7F7F] text-xs mt-0.5">Annual subscription</div>
                </div>
                <div className="text-[#E61952] font-bold text-lg">{selectedTierData?.price}</div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm mb-4">
              <div className="text-sm font-semibold text-[#111111] mb-4">Select payment method</div>
              <div className="space-y-3">

                {/* Virtual Account */}
                <button
                  onClick={() => setFormData({ ...formData, paymentMethod: 'va' })}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    formData.paymentMethod === 'va' ? 'border-[#E61952] bg-[#FEF2F4]' : 'border-[#E5E7EB] hover:border-[#F6ACC1]'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-medium text-[#111111]">Virtual Account</div>
                    <div className="text-xs text-[#9CA3AF] mt-0.5">BCA · BNI · BRI · Mandiri · Permata</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.paymentMethod === 'va' ? 'border-[#E61952] bg-[#E61952]' : 'border-[#D1D5DB]'
                  }`}>
                    {formData.paymentMethod === 'va' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>

                {/* QRIS */}
                <button
                  onClick={() => setFormData({ ...formData, paymentMethod: 'qris' })}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    formData.paymentMethod === 'qris' ? 'border-[#E61952] bg-[#FEF2F4]' : 'border-[#E5E7EB] hover:border-[#F6ACC1]'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-medium text-[#111111]">QRIS</div>
                    <div className="text-xs text-[#9CA3AF] mt-0.5">GoPay · OVO · Dana · ShopeePay · LinkAja</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.paymentMethod === 'qris' ? 'border-[#E61952] bg-[#E61952]' : 'border-[#D1D5DB]'
                  }`}>
                    {formData.paymentMethod === 'qris' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>

                {/* Credit Card */}
                <button
                  onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    formData.paymentMethod === 'card' ? 'border-[#E61952] bg-[#FEF2F4]' : 'border-[#E5E7EB] hover:border-[#F6ACC1]'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-medium text-[#111111]">Credit / Debit Card</div>
                    <div className="text-xs text-[#9CA3AF] mt-0.5">Visa · Mastercard · JCB</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.paymentMethod === 'card' ? 'border-[#E61952] bg-[#E61952]' : 'border-[#D1D5DB]'
                  }`}>
                    {formData.paymentMethod === 'card' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              </div>
            </div>

            {error && <p className="text-[#E61952] text-sm mb-4">{error}</p>}

            <button
              onClick={handlePayment}
              disabled={loading || !formData.paymentMethod}
              className="w-full bg-[#E61952] text-white rounded-lg py-3 text-sm font-medium hover:bg-[#C01544] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processing...' : `Pay ${selectedTierData?.price}`}
            </button>

            <p className="text-center text-xs text-[#9CA3AF] mt-3">
              Powered by Xendit · Your payment is secure and encrypted
            </p>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-[#E61952]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-[#111111] mb-2">Welcome to Nexticorn</h1>
            <p className="text-[#6B7280] text-sm mb-2">
              Your <span className="font-medium text-[#111111] capitalize">{formData.tier}</span> membership is being processed.
            </p>
            <p className="text-[#9CA3AF] text-xs mb-8">
              Check your email at <span className="text-[#111111] font-medium">{formData.email}</span> to confirm your account. Once confirmed, your membership will be activated within 1 business day.
            </p>
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 mb-6 text-left">
              <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-3">What happens next</div>
              <div className="space-y-3">
                {[
                  'Check your email and click the confirmation link',
                  'The Nexticorn team will verify your payment',
                  'Your account will be activated within 1 business day',
                  'You will receive a welcome email with login instructions',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#FEE2E2] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#E61952] text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-sm text-[#6B7280]">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/login" className="inline-block bg-[#E61952] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#C01544] transition-colors">
              Go to sign in
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}