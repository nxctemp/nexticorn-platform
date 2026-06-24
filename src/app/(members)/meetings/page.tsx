'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import MemberNav from '@/components/layout/MemberNav'

type MeetingRequest = {
  id: string
  request_type: string
  subject: string
  message: string
  status: string
  created_at: string
}

type Profile = {
  meeting_quota: number
  meeting_quota_used: number
  quota_reset_date: string
}

export default function MeetingsPage() {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new')
  const [formData, setFormData] = useState({
    request_type: 'meeting',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requests, setRequests] = useState<MeetingRequest[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const supabase = createClient()
    const [{ data: profileData }, { data: requestData }] = await Promise.all([
      supabase.from('profiles').select('meeting_quota, meeting_quota_used, quota_reset_date').single(),
      supabase.from('meeting_requests').select('*').order('created_at', { ascending: false }),
    ])
    setProfile(profileData)
    setRequests(requestData ?? [])
    setLoadingData(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setError('Not authenticated'); setLoading(false); return }

    if (profile && profile.meeting_quota_used >= profile.meeting_quota) {
      setError('You have used all your meeting requests for this quarter.')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('meeting_requests')
      .insert({
        user_id: user.id,
        request_type: formData.request_type,
        subject: formData.subject,
        message: formData.message,
      })

    if (insertError) { setError(insertError.message); setLoading(false); return }

    await supabase
      .from('profiles')
      .update({ meeting_quota_used: (profile?.meeting_quota_used ?? 0) + 1 })
      .eq('id', user.id)

    setSuccess(true)
    setLoading(false)
    fetchData()
  }

  const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
    pending: { label: 'Pending', bg: '#FEF3C7', color: '#D97706' },
    confirmed: { label: 'Confirmed', bg: '#D1FAE5', color: '#059669' },
    declined: { label: 'Declined', bg: '#FEE2E2', color: '#E61952' },
  }

  const quotaRemaining = (profile?.meeting_quota ?? 4) - (profile?.meeting_quota_used ?? 0)
  const quotaPercent = profile ? (profile.meeting_quota_used / profile.meeting_quota) * 100 : 0
  const resetDate = profile?.quota_reset_date
    ? new Date(profile.quota_reset_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—'

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <MemberNav />

      {/* Tall dark header */}
      <div className="bg-[#111111] px-6 pt-12 pb-0">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#E61952] text-xs font-medium uppercase tracking-widest mb-2">Connect</p>
          <h1 className="text-3xl font-semibold text-white mb-1">Request a Meeting</h1>
          <p className="text-[#7F7F7F] text-sm mb-8">
            Request a briefing or introduction with relevant parties in the Nexticorn network.
          </p>

          {/* Quota bar */}
          {!loadingData && profile && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8 flex items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">Quarterly meeting quota</span>
                  <span className="text-white text-sm font-bold">
                    {profile.meeting_quota_used} / {profile.meeting_quota} used
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(quotaPercent, 100)}%`,
                      background: quotaPercent >= 100 ? '#E61952' : quotaPercent >= 75 ? '#F59E0B' : '#4472C4'
                    }}
                  />
                </div>
                <p className="text-[#7F7F7F] text-xs mt-2">Resets {resetDate}</p>
              </div>
              <div className="shrink-0 text-center border-l border-white/10 pl-6">
                <div className={`text-3xl font-bold ${quotaRemaining === 0 ? 'text-[#E61952]' : 'text-white'}`}>
                  {quotaRemaining}
                </div>
                <div className="text-[#7F7F7F] text-xs mt-0.5">remaining</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8">

          {/* Pill Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex border-2 border-[#E61952] rounded-full p-1 mb-6">
            {[
              { id: 'new', label: 'New Request' },
              { id: 'history', label: `My Requests${requests.length > 0 ? ` (${requests.length})` : ''}` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'new' | 'history')}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-[#E61952] text-white'
                    : 'text-[#E61952] hover:bg-[#FEE2E2]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* New Request tab */}
        {activeTab === 'new' && (
          <div>
            {success ? (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-10 text-center shadow-sm">
                <div className="w-12 h-12 bg-[#FEE2E2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#E61952]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[#111111] font-semibold mb-2">Request submitted</h3>
                <p className="text-[#6B7280] text-sm mb-6">The Nexticorn team will follow up within 2 business days.</p>
                <button
                  onClick={() => { setSuccess(false); setFormData({ request_type: 'meeting', subject: '', message: '' }) }}
                  className="text-sm text-[#E61952] hover:text-[#C01544] font-medium"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
                {quotaRemaining === 0 && (
                  <div className="bg-[#FEE2E2] border border-[#FECACA] rounded-lg px-4 py-3 mb-5">
                    <p className="text-[#E61952] text-sm font-medium">Quota reached</p>
                    <p className="text-[#E61952] text-xs mt-0.5">You have used all your meeting requests for this quarter. Your quota resets on {resetDate}.</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm text-[#6B7280] mb-2">Request type</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'meeting', label: 'Briefing / Meeting' },
                        { value: 'introduction', label: 'Introduction' },
                      ].map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, request_type: type.value })}
                          className={`py-2.5 px-4 rounded-lg text-sm font-medium border transition-colors ${
                            formData.request_type === type.value
                              ? 'bg-[#E61952] text-white border-[#E61952]'
                              : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#E61952]'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#6B7280] mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[#111111] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#E61952]"
                      placeholder="e.g. Introduction to Series A founders in logistics"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#6B7280] mb-1.5">Details</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[#111111] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#E61952] resize-none"
                      placeholder="Describe what you are looking for and any relevant context..."
                    />
                  </div>

                  {error && <p className="text-[#E61952] text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading || quotaRemaining === 0}
                    className="w-full bg-[#E61952] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#C01544] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Submitting...' : 'Submit request'}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* History tab */}
        {activeTab === 'history' && (
          <div>
            {loadingData ? (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 text-center">
                <p className="text-[#9CA3AF] text-sm">Loading...</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-12 text-center shadow-sm">
                <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-[#6B7280] text-sm font-medium">No requests yet</p>
                <p className="text-[#9CA3AF] text-xs mt-1">Your submitted requests will appear here</p>
                <button
                  onClick={() => setActiveTab('new')}
                  className="mt-4 text-sm text-[#E61952] hover:text-[#C01544] font-medium"
                >
                  Submit your first request →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {requests.map((req) => {
                  const status = statusConfig[req.status] ?? statusConfig.pending
                  return (
                    <div key={req.id} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="text-[#111111] text-sm font-semibold leading-snug">{req.subject}</div>
                        <span className="shrink-0 text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: status.bg, color: status.color }}>
                          {status.label}
                        </span>
                      </div>
                      {req.message && (
                        <p className="text-[#6B7280] text-xs mb-3 leading-relaxed line-clamp-2">{req.message}</p>
                      )}
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] capitalize">{req.request_type}</span>
                        <span className="text-xs text-[#9CA3AF]">
                          {new Date(req.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}