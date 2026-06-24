'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
         <Image src="/images/nxclogo.png" alt="Nexticorn" width={100} height={50} className="mx-auto" />
          <p className="text-[#6B7280] mt-2 text-sm">Member portal</p>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[#111111] mb-6">Sign in</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-[#6B7280] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[#111111] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#E61952]"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block text-sm text-[#6B7280] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-[#111111] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#E61952]"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-[#E61952] text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E61952] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#C01544] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-sm text-[#9CA3AF] mt-6">
            No account?{' '}
            <Link href="/signup" className="text-[#E61952] hover:text-[#C01544]">
              Request access
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
