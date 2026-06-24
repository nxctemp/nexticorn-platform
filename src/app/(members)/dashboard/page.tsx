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

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <MemberNav />

      {/* Dark hero welcome strip */}
      <div className="bg-[#111111] px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[#E61952] text-xs font-medium uppercase tracking-widest mb-2">Member Dashboard</p>
              <h1 className="text-3xl font-bold text-white mb-1">
                Welcome, {profile?.full_name?.split(' ')[0] ?? user.email}
              </h1>
              <p className="text-[#7F7F7F] text-sm">
                {profile?.company ?? ''}{profile?.job_title ? ` · ${profile.job_title}` : ''}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block text-xs px-3 py-1.5 rounded-full bg-[#E61952] text-white font-medium capitalize">
                {tier} member
              </span>
              <p className="text-[#7F7F7F] text-xs mt-2">nexticorn.id</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
              <div className="text-[#E61952] text-2xl font-bold">
                {content?.length ?? 0}
              </div>
              <div className="text-[#7F7F7F] text-xs mt-0.5">Updates available</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
              <div className="text-[#4472C4] text-2xl font-bold">6,500+</div>
              <div className="text-[#7F7F7F] text-xs mt-0.5">Meetings facilitated</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
              <div className="text-white text-2xl font-bold">5</div>
              <div className="text-[#7F7F7F] text-xs mt-0.5">Annual summits</div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* Quick links — colour coded */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Link href="/news" className="group relative bg-white border border-[#E5E7EB] rounded-xl p-5 hover:border-[#E61952] transition-all hover:shadow-md overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#E61952] rounded-l-xl" />
            <div className="pl-2">
              <div className="w-9 h-9 bg-[#FEE2E2] rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#E61952]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="text-[#111111] font-semibold text-sm group-hover:text-[#E61952] transition-colors">News & Updates</div>
              <div className="text-[#9CA3AF] text-xs mt-0.5">Whitepapers, research, videos</div>
              <div className="text-[#E61952] text-xs mt-3 font-medium">View all →</div>
            </div>
          </Link>

          <Link href="/meetings" className="group relative bg-white border border-[#E5E7EB] rounded-xl p-5 hover:border-[#4472C4] transition-all hover:shadow-md overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#4472C4] rounded-l-xl" />
            <div className="pl-2">
              <div className="w-9 h-9 bg-[#EBF0FB] rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#4472C4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-[#111111] font-semibold text-sm group-hover:text-[#4472C4] transition-colors">Request a Meeting</div>
              <div className="text-[#9CA3AF] text-xs mt-0.5">Introductions & briefings</div>
              <div className="text-[#4472C4] text-xs mt-3 font-medium">Request now →</div>
            </div>
          </Link>

          <Link href="/billing" className="group relative bg-white border border-[#E5E7EB] rounded-xl p-5 hover:border-[#111111] transition-all hover:shadow-md overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#111111] rounded-l-xl" />
            <div className="pl-2">
              <div className="w-9 h-9 bg-[#F3F4F6] rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="text-[#111111] font-semibold text-sm">Billing</div>
              <div className="text-[#9CA3AF] text-xs mt-0.5">Invoices & membership</div>
              <div className="text-[#111111] text-xs mt-3 font-medium">View details →</div>
            </div>
          </Link>
        </div>

        {/* Recent content */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide">Recent content</h2>
            <Link href="/news" className="text-xs text-[#E61952] hover:text-[#C01544] font-medium">View all</Link>
          </div>
          <div className="space-y-3">
            {content && content.length > 0 ? (
              content.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 hover:border-[#E61952] hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      index === 0 ? 'bg-[#E61952] text-white' :
                      index === 1 ? 'bg-[#4472C4] text-white' :
                      'bg-[#111111] text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-[#111111] text-sm font-medium group-hover:text-[#E61952] transition-colors">{item.title}</div>
                      <div className="text-[#9CA3AF] text-xs mt-0.5">{item.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium uppercase ${
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
              ))
            ) : (
              <p className="text-[#9CA3AF] text-sm">No content published yet.</p>
            )}
          </div>
        </div>

        {/* Upgrade banner for non-institutional */}
        {tier !== 'institutional' && (
          <div className="mt-6 bg-[#111111] rounded-xl p-6 flex items-center justify-between">
            <div>
              <div className="text-[#E61952] text-xs font-medium uppercase tracking-wide mb-1">Upgrade</div>
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