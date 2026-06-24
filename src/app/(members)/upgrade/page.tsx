'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import MemberNav from '@/components/layout/MemberNav'
import Link from 'next/link'

export default function UpgradePage() {
  const [selected, setSelected] = useState<'individual' | 'institutional' | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    if (!selected) return
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('meeting_requests').insert({
      user_id: user.id,
      request_type: 'meeting',
      subject: `Membership upgrade request: ${selected} tier`,
      message: `Member has requested an upgrade to the ${selected} membership tier.`,
    })

    setSubmitted(true)
    setLoading(false)
  }

  const tiers = [
    {
      id: 'individual' as const,
      name: 'Individual',
      price: 'IDR 5,000,000',
      period: 'per year',
      description: 'For individual professionals, founders, and investors seeking ecosystem intelligence.',
      features: [
        'Access to all research & whitepapers',
        'Board video updates',
        'Meeting request access',
        'Monthly member newsletter',
        'Nexticorn Summit updates',
      ],
      accent: '#6B7280',
      bg: '#F3F4F6',
    },
    {
      id: 'institutional' as const,
      name: 'Institutional',
      price: 'IDR 25,000,000',
      period: 'per year',
      description: 'For PE/VC firms, corporates, LPs, and institutional partners requiring full access.',
      features: [
        'Everything in Individual',
        'LP-level exclusive research',
        'Priority introductions',
        'Exclusive roundtable invitations',
        'Brand activation opportunities',
        'Dedicated account support',
        'Early access to summit content',
      ],
      accent: '#E61952',
      bg: '#FEE2E2',
      recommended: true,
    },
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F7F7F8]">
        <MemberNav />
        <main className="max-w-lg mx-auto px-6 py-20 text-center">
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-10 shadow-sm">
            <div className="w-14 h-14 bg-[#FEE2E2] rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-[#E61952]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#111111] mb-2">Upgrade request received</h2>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-2">
              The Nexticorn team will contact you within 2 business days to complete your upgrade to the{' '}
              <span className="font-medium text-[#111111] capitalize">{selected}</span> tier.
            </p>
            <p className="text-[#9CA3AF] text-xs mb-8">
              Payment via bank transfer or virtual account will be arranged directly.
            </p>
            <Link href="/dashboard" className="inline-block bg-[#E61952] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#C01544] transition-colors">
              Back to dashboard
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <MemberNav />

      <div className="bg-[#111111] px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#E61952] text-xs font-medium uppercase tracking-widest mb-1">Membership</p>
          <h1 className="text-2xl font-semibold text-white">Upgrade your membership</h1>
          <p className="text-[#7F7F7F] text-sm mt-1">Select a tier and we will be in touch to complete your upgrade.</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 gap-6 mb-8">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelected(tier.id)}
              className={`text-left bg-white rounded-xl border-2 p-7 transition-all duration-200 hover:shadow-md relative ${
                selected === tier.id
                  ? 'border-[#E61952] shadow-md'
                  : 'border-[#E5E7EB]'
              }`}
            >
              {tier.recommended && (
                <div className="absolute top-4 right-4 text-xs bg-[#E61952] text-white px-2.5 py-1 rounded-full font-medium">
                  Recommended
                </div>
              )}

              {/* Selection indicator */}
              <div className={`w-5 h-5 rounded-full border-2 mb-5 flex items-center justify-center transition-colors ${
                selected === tier.id ? 'border-[#E61952] bg-[#E61952]' : 'border-[#D1D5DB]'
              }`}>
                {selected === tier.id && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>

              <div className="mb-4">
                <div className="text-xs font-medium uppercase tracking-widest text-[#9CA3AF] mb-1">{tier.name}</div>
                <div className="text-3xl font-bold text-[#111111]">{tier.price}</div>
                <div className="text-[#9CA3AF] text-xs mt-0.5">{tier.period}</div>
              </div>

              <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">{tier.description}</p>

              <div className="space-y-2.5">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: tier.bg }}>
                      <svg className="w-2.5 h-2.5" style={{ color: tier.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#6B7280]">{feature}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex items-center justify-between">
          <div>
            {selected ? (
              <>
                <div className="text-[#111111] font-semibold">
                  {tiers.find(t => t.id === selected)?.name} membership selected
                </div>
                <div className="text-[#6B7280] text-sm mt-0.5">
                  {tiers.find(t => t.id === selected)?.price} / year — payment arranged via bank transfer
                </div>
              </>
            ) : (
              <>
                <div className="text-[#111111] font-semibold">Select a membership tier above</div>
                <div className="text-[#6B7280] text-sm mt-0.5">Payment via bank transfer or virtual account</div>
              </>
            )}
          </div>
          <button
            onClick={handleUpgrade}
            disabled={!selected || loading}
            className="shrink-0 ml-6 bg-[#E61952] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#C01544] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Submitting...' : 'Request upgrade'}
          </button>
        </div>

        <p className="text-center text-[#9CA3AF] text-xs mt-4">
          The Nexticorn team will contact you within 2 business days to complete your upgrade.
        </p>
      </main>
    </div>
  )
}