import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import MemberNav from '@/components/layout/MemberNav'

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const tier = profile?.tier ?? 'free'
  const labels: Record<string, string> = {
    free: 'Free',
    individual: 'Individual',
    institutional: 'Institutional',
  }
  const pricing: Record<string, string> = {
    free: 'IDR 0',
    individual: 'IDR 5,000,000 / year',
    institutional: 'IDR 25,000,000 / year',
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <MemberNav />
      <main className="max-w-2xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#111111]">Billing</h1>
          <p className="text-[#6B7280] mt-1 text-sm">Your membership and payment details.</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-4 shadow-sm">
          <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-3">Current plan</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[#111111] font-semibold text-lg">
                {labels[tier]} membership
              </div>
              <div className="text-[#6B7280] text-sm mt-0.5">
                {pricing[tier]}
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-600 font-medium">
              Active
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-4 shadow-sm">
          <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-3">Payment</div>
          <p className="text-[#6B7280] text-sm">
            Payment via bank transfer or virtual account. Contact the Nexticorn team to update payment details.
          </p>
          
           <a href="mailto:membership@nexticorn.id" className="inline-block mt-3 text-sm text-[#E61952]">membership@nexticorn.id</a>
        </div>

        {tier !== 'institutional' && (
          <div className="bg-white border border-[#E61952] rounded-xl p-6 shadow-sm">
            <div className="text-xs text-[#E61952] uppercase tracking-wide mb-3 font-medium">
              Upgrade
            </div>
            <div className="text-[#111111] font-semibold mb-1">Institutional membership</div>
            <p className="text-[#6B7280] text-sm mb-4">
              Access exclusive LP-level research, institutional deal flow, and priority introductions.
            </p>
            <a href="mailto:membership@nexticorn.id" className="inline-block bg-[#E61952] text-white rounded-lg px-4 py-2 text-sm font-medium">Enquire about institutional access</a>
          </div>
        )}

      </main>
    </div>
  )
}