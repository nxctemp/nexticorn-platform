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

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <MemberNav />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-[#111111]">
            Welcome, {profile?.full_name?.split(' ')[0] ?? user.email}
          </h1>
          <p className="text-[#6B7280] mt-1 text-sm">
            {profile?.company ?? ''}{profile?.job_title ? ` · ${profile.job_title}` : ''}
          </p>
          <span className="inline-block mt-2 text-xs px-2.5 py-1 rounded-full bg-[#FEE2E2] text-[#E61952] capitalize font-medium">
            {profile?.tier ?? 'free'} member
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { href: '/news', label: 'News & Updates', sub: 'Whitepapers, research, videos', tag: 'Latest' },
            { href: '/meetings', label: 'Request a Meeting', sub: 'Introductions & briefings', tag: 'Connect' },
            { href: '/billing', label: 'Billing', sub: 'Invoices & membership', tag: 'Account' },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="bg-white border border-[#E5E7EB] rounded-xl p-5 hover:border-[#E61952] transition-colors group"
            >
              <div className="text-[#9CA3AF] text-xs uppercase tracking-wide mb-2">{card.tag}</div>
              <div className="text-[#111111] font-medium group-hover:text-[#E61952] transition-colors">{card.label}</div>
              <div className="text-[#6B7280] text-sm mt-1">{card.sub}</div>
            </Link>
          ))}
        </div>

        <div>
          <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-4">Recent content</h2>
          <div className="space-y-3">
            {content && content.length > 0 ? (
              content.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 hover:border-[#E61952] transition-colors"
                >
                  <div>
                    <div className="text-[#111111] text-sm font-medium">{item.title}</div>
                    <div className="text-[#9CA3AF] text-xs mt-0.5">{item.description}</div>
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] uppercase">
                      {item.content_type}
                    </span>
                    <svg className="w-4 h-4 text-[#D1D5DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      </main>
    </div>
  )
}
