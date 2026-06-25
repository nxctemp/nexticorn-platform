'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/news', label: 'News & Updates' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/billing', label: 'Billing' },
  { href: '/profile', label: 'Profile' },
]

export default function MemberNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-[#E5E7EB] bg-white px-6 py-4 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/dashboard">
          <Image src="/images/nxclogo.png" alt="Nexticorn" width={100} height={50} />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
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
          <form action="/api/auth/signout" method="POST" className="flex items-center">
            <button type="submit" className="text-sm border border-[#F6ACC1] text-[#111111] px-4 py-2 rounded-lg hover:border-[#E61952] hover:text-white hover:bg-[#E61952] transition-colors leading-none">
              Sign out
            </button>
          </form>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#6B7280]"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#E5E7EB] mt-4 pt-4 pb-2 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                pathname === link.href
                  ? 'bg-[#FEE2E2] text-[#E61952] font-medium'
                  : 'text-[#6B7280] hover:bg-[#F3F4F6]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#6B7280] hover:bg-[#F3F4F6] transition-colors">
              Sign out
            </button>
          </form>
        </div>
      )}
    </nav>
  )
}