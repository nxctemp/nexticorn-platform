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

export default function MeetingsPage() {
  const [formData, setFormData] = useState({
    request_type: 'meeting',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requests, setRequests] = useState<MeetingRequest[]>([])
  const [loadingRequests, setLoadingRequests] = useState(true)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('meeting_requests')
      .select('*')
      .order('created_at', { ascending: false })
    setRequests(data ?? [])
    setLoadingRequests(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) { setError('Not authenticated'); setLoading(false); return }

    const { error } = await supabase
      .from('meeting_requests')
      .insert({
        user_id: user.id,
        request_type: formData.request_type,
        subject: formData.subject,
        message: formData.message,
      })

    if (error) { setError(error.message); setLoading(false); return }

    setSuccess(true)
    setLoading(false)
    fetchRequests()
  }

  const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
    pending: { label: 'Pending', bg: '#FEF3C7', color: '#D97706' },
    confirmed: { label: 'Confirmed', bg: '#D1FAE5', color: '#059669' },
    declined: { label: 'Declined', bg: '#FEE2E2', color: '#E61952' },
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <MemberNav />

      <div className="bg-[#111111] px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#E61952] text-xs font-medium uppercase tracking-widest mb-1">Connect</p>
          <h1 className="text-2xl font-semibold text-white">Request a Meeting</h1>
          <p className="text-[#7F7F7F] text-sm mt-1">Request a briefing or introduction with relevant parties in the Nexticorn network.</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-8">

          {/* Form */}
          <div>
            <h2 className="text-sm font-semibold text-[#111111] mb-4">New request</h2>
            {success ? (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 text-center shadow-sm">
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
                      placeholder="e.g. Introduction to Series A founders"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#6B7280] mb-1.5">Details</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[#111111] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#E61952] resize-none"
                      placeholder="Describe what you are looking for..."
                    />
                  </div>

                  {error && <p className="text-[#E61952] text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#E61952] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#C01544] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? 'Submitting...' : 'Submit request'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Request tracker */}
          <div>
            <h2 className="text-sm font-semibold text-[#111111] mb-4">Your requests</h2>
            {loadingRequests ? (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-center">
                <p className="text-[#9CA3AF] text-sm">Loading...</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 text-center">
                <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-[#9CA3AF] text-sm">No requests yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {requests.map((req) => {
                  const status = statusConfig[req.status] ?? statusConfig.pending
                  return (
                    <div key={req.id} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="text-[#111111] text-sm font-medium leading-snug">{req.subject}</div>
                        <span className="shrink-0 text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: status.bg, color: status.color }}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] capitalize">{req.request_type}</span>
                        <span className="text-xs text-[#9CA3AF]">
                          {new Date(req.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      {req.message && (
                        <p className="text-[#9CA3AF] text-xs mt-2 leading-relaxed line-clamp-2">{req.message}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}