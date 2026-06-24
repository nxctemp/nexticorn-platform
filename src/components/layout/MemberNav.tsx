'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/news', label: 'News & Updates' },
  { href: '/meetings', label: 'Request Meeting' },
  { href: '/billing', label: 'Billing' },
]

export default function MemberNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-[#E5E7EB] bg-white px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="text-lg font-bold text-[#111111]">
          Nexti<span className="text-[#E61952]">corn</span>
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? 'text-[#E61952] font-medium'
                  : 'text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="text-sm text-[#9CA3AF] hover:text-[#111111]">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}
