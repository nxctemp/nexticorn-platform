import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import MemberNav from '@/components/layout/MemberNav'

export default async function ContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: item } = await supabase
    .from('content')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (!item) notFound()

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <MemberNav />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <Link href="/news" className="text-sm text-[#6B7280] hover:text-[#E61952] flex items-center gap-1 mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to News
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] uppercase">
            {item.content_type}
          </span>
          {item.min_tier === 'institutional' && (
            <span className="text-xs px-2 py-0.5 rounded bg-[#FEE2E2] text-[#E61952]">
              Institutional
            </span>
          )}
        </div>

        <h1 className="text-2xl font-semibold text-[#111111] mb-3">{item.title}</h1>
        <p className="text-[#6B7280] text-sm mb-8">{item.description}</p>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-sm">
          {item.content_type === 'video' ? (
            <>
              <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#E61952]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[#6B7280] text-sm font-medium">Video player</p>
              <p className="text-[#9CA3AF] text-xs mt-1">Mux streaming — configured after prototype approval</p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#E61952]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-[#6B7280] text-sm font-medium">PDF viewer</p>
              <p className="text-[#9CA3AF] text-xs mt-1">Watermarked per member — configured after prototype approval</p>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
