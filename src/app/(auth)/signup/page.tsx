'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    jobTitle: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          company: formData.company,
          job_title: formData.jobTitle,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 shadow-sm">
            <div className="w-12 h-12 bg-[#FEE2E2] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#E61952]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-[#111111] mb-2">Check your email</h2>
            <p className="text-[#6B7280] text-sm">
              We sent a confirmation link to{' '}
              <span className="text-[#111111] font-medium">{formData.email}</span>.
              Click it to activate your account.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#111111]">
            <img src="/images/nxclogo.png" alt="Nexticorn" className="h-14 w-auto mx-auto block" />
          </h1>
          <p className="text-[#6B7280] mt-2 text-sm">Request membership access</p>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[#111111] mb-6">Create account</h2>

          <form onSubmit={handleSignup} className="space-y-4">
            {[
              { label: 'Full name', name: 'fullName', type: 'text', placeholder: 'Kevin Yonathan' },
              { label: 'Company', name: 'company', type: 'text', placeholder: 'Acme Ventures' },
              { label: 'Job title', name: 'jobTitle', type: 'text', placeholder: 'Partner' },
              { label: 'Work email', name: 'email', type: 'email', placeholder: 'you@company.com' },
              { label: 'Password', name: 'password', type: 'password', placeholder: 'Min. 8 characters' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm text-[#6B7280] mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  minLength={field.name === 'password' ? 8 : undefined}
                  className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[#111111] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#E61952]"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            {error && <p className="text-[#E61952] text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E61952] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#C01544] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-sm text-[#9CA3AF] mt-6">
            Already a member?{' '}
            <Link href="/login" className="text-[#E61952] hover:text-[#C01544]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
