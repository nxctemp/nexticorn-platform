import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: content, error: contentError } = await supabase
    .from('content')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3)

  // Debug — remove before showing Tom
  console.log('user:', user.id)
  console.log('profile:', profile, profileError)
  console.log('content:', content, contentError)

  return (
    <div className="min-h-screen bg-gray-950">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-white font-semibold">Nexticorn</span>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-white">Dashboard</Link>
            <Link href="/news" className="text-sm text-gray-400 hover:text-white">News & Updates</Link>
            <Link href="/meetings" className="text-sm text-gray-400 hover:text-white">Request Meeting</Link>
            <Link href="/billing" className="text-sm text-gray-400 hover:text-white">Billing</Link>
            <form action="/api/auth/signout" method="POST">
              <button type="submit" className="text-sm text-gray-500 hover:text-white">Sign out</button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-white">
            Welcome, {profile?.full_name?.split(' ')[0] ?? user.email}
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {profile?.company ?? ''}{profile?.job_title ? ` · ${profile.job_title}` : ''}
          </p>
          <span className="inline-block mt-2 text-xs px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 capitalize">
            {profile?.tier ?? 'free'} member
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <Link href="/news" className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-2">Latest</div>
            <div className="text-white font-medium">News & Updates</div>
            <div className="text-gray-500 text-sm mt-1">Whitepapers, research, videos</div>
          </Link>
          <Link href="/meetings" className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-2">Connect</div>
            <div className="text-white font-medium">Request a Meeting</div>
            <div className="text-gray-500 text-sm mt-1">Introductions & briefings</div>
          </Link>
          <Link href="/billing" className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-2">Account</div>
            <div className="text-white font-medium">Billing</div>
            <div className="text-gray-500 text-sm mt-1">Invoices & membership</div>
          </Link>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">Recent content</h2>
          <div className="space-y-3">
            {content && content.length > 0 ? (
              content.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-5 py-4 hover:border-gray-600 transition-colors"
                >
                  <div>
                    <div className="text-white text-sm font-medium">{item.title}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{item.description}</div>
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-400 uppercase">
                      {item.content_type}
                    </span>
                    <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-600 text-sm">No content published yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
