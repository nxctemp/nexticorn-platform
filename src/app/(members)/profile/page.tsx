import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import MemberNav from '@/components/layout/MemberNav'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const tierLabels: Record<string, string> = {
    free: 'Free',
    individual: 'Individual',
    institutional: 'Institutional',
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <MemberNav />

      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#111111]">Profile</h1>
          <p className="text-[#6B7280] mt-1 text-sm">Your membership details.</p>
        </div>

        {/* Avatar + name */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-4 shadow-sm flex items-center gap-5">
          <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-[#E61952]">
              {profile?.full_name?.charAt(0) ?? user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-[#111111] font-semibold text-lg">{profile?.full_name ?? '—'}</div>
            <div className="text-[#6B7280] text-sm">{user.email}</div>
            <span className="inline-block mt-1 text-xs px-2.5 py-1 rounded-full bg-[#FEE2E2] text-[#E61952] font-medium capitalize">
              {tierLabels[profile?.tier ?? 'free']} member
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-4 shadow-sm">
          <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-4">Details</div>
          <div className="space-y-4">
            {[
              { label: 'Full name', value: profile?.full_name ?? '—' },
              { label: 'Company', value: profile?.company ?? '—' },
              { label: 'Job title', value: profile?.job_title ?? '—' },
              { label: 'Email', value: user.email ?? '—' },
            ].map((field) => (
              <div key={field.label} className="flex items-center justify-between py-2 border-b border-[#F3F4F6] last:border-0">
                <span className="text-sm text-[#6B7280]">{field.label}</span>
                <span className="text-sm text-[#111111] font-medium">{field.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact to update */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
          <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-2">Update details</div>
          <p className="text-[#6B7280] text-sm">
            To update your profile information, contact the Nexticorn team.
          </p>
          <a href="mailto:membership@nexticorn.id" className="inline-block mt-3 text-sm text-[#E61952]">membership@nexticorn.id</a>
        </div>
      </main>
    </div>
  )
}