'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import MemberNav from '@/components/layout/MemberNav'

export default function MeetingsPage() {
  const [formData, setFormData] = useState({
    request_type: 'meeting',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8]">
      <MemberNav />

      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#111111]">Request a Meeting</h1>
          <p className="text-[#6B7280] mt-1 text-sm">
            Request a briefing or introduction with relevant parties in the Nexticorn network.
          </p>
        </div>

        {success ? (
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 text-center shadow-sm">
            <div className="w-12 h-12 bg-[#FEE2E2] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#E61952]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-[#111111] font-semibold mb-2">Request submitted</h2>
            <p className="text-[#6B7280] text-sm">
              The Nexticorn team will follow up within 2 business days.
            </p>
            <button
              onClick={() => { setSuccess(false); setFormData({ request_type: 'meeting', subject: '', message: '' }) }}
              className="mt-6 text-sm text-[#E61952] hover:text-[#C01544]"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm">
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
                  rows={4}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[#111111] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#E61952] resize-none"
                  placeholder="Describe what you're looking for and any relevant context..."
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
      </main>
    </div>
  )
}
