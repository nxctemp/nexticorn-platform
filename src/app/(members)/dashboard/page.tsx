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
    <div className="min-h-screen bg-[#F7F7F8]">
      <MemberNav />

      {/* Welcome header */}
      <div className="bg-[#111111] px-6 py-14">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-[#E61952] text-xs font-medium uppercase tracking-widest mb-1">Member Dashboard</p>
            <h1 className="text-2xl font-semibold text-white">Welcome back, {firstName}</h1>
            <p className="text-[#7F7F7F] text-sm mt-0.5">
              {profile?.company ?? ''}{profile?.job_title ? ` · ${profile.job_title}` : ''}
            </p>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-full border border-[#E61952] text-[#E61952] font-medium capitalize">
            {tier} member
          </span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* Quick links */}
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
              label: 'Billing',
              sub: 'Invoices & membership details',
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
              className="group bg-white border border-[#E5E7EB] rounded-xl p-5 hover:shadow-md hover:border-transparent transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: card.bg, color: card.accent }}>
                {card.icon}
              </div>
              <div className="text-[#111111] font-semibold text-sm mb-1 group-hover:text-[#E61952] transition-colors">{card.label}</div>
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

        {/* Recent content */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-sm font-semibold text-[#111111]">Latest Intelligence</h2>
            <Link href="/news" className="text-xs text-[#E61952] hover:text-[#C01544] font-medium">View all →</Link>
          </div>
          {content && content.length > 0 ? (
            <div className="divide-y divide-[#F3F4F6]">
              {content.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="flex items-center gap-5 px-6 py-4 hover:bg-[#FAFAF8] transition-colors group"
                >
                  <div className="shrink-0 w-6 text-center">
                    <span className="text-sm font-bold text-[#D1D5DB] group-hover:text-[#E61952] transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#111111] text-sm font-medium group-hover:text-[#E61952] transition-colors leading-snug">{item.title}</div>
                    <div className="text-[#9CA3AF] text-xs mt-0.5 truncate">{item.description}</div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium uppercase tracking-wide ${
                      item.content_type === 'video' ? 'bg-[#EBF0FB] text-[#4472C4]' : 'bg-[#FEE2E2] text-[#E61952]'
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
          <div className="mt-6 bg-[#111111] rounded-xl p-6 flex items-center justify-between">
            <div>
              <div className="text-[#E61952] text-xs font-medium uppercase tracking-widest mb-1">Upgrade</div>
              <div className="text-white font-semibold">Unlock Institutional access</div>
              <div className="text-[#7F7F7F] text-sm mt-0.5">LP-level research, priority introductions, exclusive roundtables.</div>
            </div>
            <Link href="/billing" className="shrink-0 ml-6 bg-[#E61952] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#C01544] transition-colors">
              Learn more
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}