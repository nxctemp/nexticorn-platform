import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import MemberNav from '@/components/layout/MemberNav'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: content } = await supabase
    .from('content')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3)

  const tier = profile?.tier ?? 'free'
  const firstName = profile?.full_name?.split(' ')[0] ?? 'Member'

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <MemberNav />

      {/* Editorial header */}
      <div className="bg-[#111111] px-6 pt-10 pb-0">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[#E61952] text-xs font-medium uppercase tracking-[0.2em] mb-3">
                Member Intelligence Portal
              </p>
              <h1 style={{fontFamily: 'var(--font-playfair)'}} className="text-5xl font-black text-white leading-none mb-2">
                Good morning,<br />
                <span className="text-[#E61952] italic">{firstName}.</span>
              </h1>
              <p className="text-[#7F7F7F] text-sm mt-3">
                {profile?.company ?? ''}{profile?.job_title ? ` · ${profile.job_title}` : ''}
              </p>
            </div>
            <div className="text-right shrink-0 ml-8">
              <span className="inline-block text-xs px-3 py-1.5 rounded-full border border-[#E61952] text-[#E61952] font-medium capitalize">
                {tier} member
              </span>
              <p className="text-[#444] text-xs mt-2 font-mono">
                {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Divider line — Economist style */}
          <div className="border-t border-[#E61952] mb-0" />

          {/* Stats bar */}
          <div className="grid grid-cols-3 divide-x divide-white/10 -mx-0">
            {[
              { value: `${content?.length ?? 0}`, label: 'Updates this quarter', color: 'text-[#E61952]' },
              { value: '6,500+', label: 'Meetings facilitated since 2018', color: 'text-[#4472C4]' },
              { value: '5', label: 'Annual summits held', color: 'text-white' },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-5">
                <div style={{fontFamily: 'var(--font-playfair)'}} className={`text-4xl font-black ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-[#7F7F7F] text-xs mt-1 leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* Quick nav cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              href: '/news',
              label: 'News & Updates',
              sub: 'Whitepapers, research & video briefings',
              cta: 'Read now',
              accent: '#E61952',
              bg: '#FEE2E2',
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              )
            },
            {
              href: '/meetings',
              label: 'Request a Meeting',
              sub: 'Introductions & private briefings',
              cta: 'Request now',
              accent: '#4472C4',
              bg: '#EBF0FB',
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )
            },
            {
              href: '/billing',
              label: 'Membership & Billing',
              sub: 'Invoices, tier & renewal',
              cta: 'View details',
              accent: '#111111',
              bg: '#F3F4F6',
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              )
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-white border border-[#E5E7EB] rounded-xl p-5 hover:shadow-lg transition-all hover:-translate-y-0.5 duration-200"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: card.bg, color: card.accent }}
              >
                {card.icon}
              </div>
              <div style={{fontFamily: 'var(--font-playfair)'}} className="text-[#111111] font-bold text-base mb-1 group-hover:text-[#E61952] transition-colors">
                {card.label}
              </div>
              <div className="text-[#9CA3AF] text-xs mb-4 leading-relaxed">{card.sub}</div>
              <div className="flex items-center gap-1 text-xs font-medium" style={{ color: card.accent }}>
                {card.cta}
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent content — editorial list */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <h2 style={{fontFamily: 'var(--font-playfair)'}} className="text-lg font-bold text-[#111111]">
              Latest Intelligence
            </h2>
            <Link href="/news" className="text-xs text-[#E61952] hover:text-[#C01544] font-medium uppercase tracking-wide">
              View all →
            </Link>
          </div>

          {content && content.length > 0 ? (
            <div className="divide-y divide-[#F3F4F6]">
              {content.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="flex items-center gap-5 px-6 py-5 hover:bg-[#FAFAF8] transition-colors group"
                >
                  <div className="shrink-0">
                    <span style={{fontFamily: 'var(--font-playfair)'}} className="text-3xl font-black text-[#E5E7EB] group-hover:text-[#F6ACC1] transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{fontFamily: 'var(--font-playfair)'}} className="text-[#111111] font-semibold text-base group-hover:text-[#E61952] transition-colors leading-snug">
                      {item.title}
                    </div>
                    <div className="text-[#9CA3AF] text-xs mt-1 truncate">{item.description}</div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium uppercase tracking-wide ${
                      item.content_type === 'video'
                        ? 'bg-[#EBF0FB] text-[#4472C4]'
                        : 'bg-[#FEE2E2] text-[#E61952]'
                    }`}>
                      {item.content_type}
                    </span>
                    <svg className="w-4 h-4 text-[#D1D5DB] group-hover:text-[#E61952] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center text-[#9CA3AF] text-sm">No content published yet.</div>
          )}
        </div>

        {/* Upgrade banner */}
        {tier !== 'institutional' && (
          <div className="mt-6 relative bg-[#111111] rounded-xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E61952] opacity-10 rounded-full -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 right-16 w-20 h-20 bg-[#4472C4] opacity-10 rounded-full translate-y-6" />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="text-[#E61952] text-xs font-medium uppercase tracking-[0.2em] mb-2">Institutional Access</div>
                <h3 style={{fontFamily: 'var(--font-playfair)'}} className="text-white text-xl font-bold mb-1">
                  Unlock the full picture.
                </h3>
                <p className="text-[#7F7F7F] text-sm">LP-level research, priority introductions, exclusive roundtables.</p>
              </div>
              <Link href="/billing" className="shrink-0 ml-6 bg-[#E61952] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#C01544] transition-colors whitespace-nowrap">
                Learn more
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}