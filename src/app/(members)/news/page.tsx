import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import MemberNav from '@/components/layout/MemberNav'

export default async function NewsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: content } = await supabase
    .from('content')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  const pdfs = content?.filter(c => c.content_type === 'pdf') ?? []
  const videos = content?.filter(c => c.content_type === 'video') ?? []

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <MemberNav />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#111111]">News & Updates</h1>
          <p className="text-[#6B7280] mt-1 text-sm">Research, whitepapers, and video briefings from the Nexticorn board.</p>
        </div>

        {videos.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-4">Video Updates</h2>
            <div className="grid grid-cols-2 gap-4">
              {videos.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-[#E61952] transition-colors"
                >
                  <div className="bg-[#F3F4F6] h-36 flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#E61952]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] uppercase">Video</span>
                      {item.min_tier === 'institutional' && (
                        <span className="text-xs px-2 py-0.5 rounded bg-[#FEE2E2] text-[#E61952]">Institutional</span>
                      )}
                    </div>
                    <div className="text-[#111111] text-sm font-medium">{item.title}</div>
                    <div className="text-[#9CA3AF] text-xs mt-1">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {pdfs.length > 0 && (
          <div>
            <h2 className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide mb-4">Research & Whitepapers</h2>
            <div className="space-y-3">
              {pdfs.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 hover:border-[#E61952] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#FEE2E2] rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[#E61952]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[#111111] text-sm font-medium">{item.title}</div>
                      <div className="text-[#9CA3AF] text-xs mt-0.5">{item.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    {item.min_tier === 'institutional' && (
                      <span className="text-xs px-2 py-0.5 rounded bg-[#FEE2E2] text-[#E61952]">Institutional</span>
                    )}
                    <svg className="w-4 h-4 text-[#D1D5DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
