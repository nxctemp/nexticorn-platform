'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

type BoardMember = {
  name: string
  role: string
  bio: string
  initial: string
}

const boardMembers: BoardMember[] = [
  { name: 'Rudiantara', role: 'Chairman', initial: 'R', bio: 'Rudiantara served as Indonesia\'s Minister of Communication and Information Technology from 2014 to 2019. He has been a key figure in Indonesia\'s digital transformation and startup ecosystem development.' },
  { name: 'Tom Lembong', role: 'Vice Chairman', initial: 'T', bio: 'Tom Lembong is a prominent Indonesian investor and former government official. He served as Indonesia\'s Trade Minister and Head of the Investment Coordinating Board (BKPM).' },
  { name: 'David Rimbo', role: 'Board Member', initial: 'D', bio: 'David Rimbo is a senior partner at Ernst & Young Indonesia, with extensive experience in audit, advisory, and the Indonesian startup ecosystem.' },
  { name: 'Rambun Tjajo', role: 'Board Member', initial: 'R', bio: 'Rambun Tjajo brings deep expertise in venture capital and startup investment across Southeast Asia.' },
  { name: 'Donald Wihardja', role: 'Board Member', initial: 'D', bio: 'Donald Wihardja is an experienced venture capitalist and entrepreneur with a strong track record in the Indonesian tech ecosystem.' },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

export default function HomePage() {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* Nav */}
      <nav className="border-b border-[#E5E7EB] px-6 py-4 bg-white sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src="/images/nxclogo.png" alt="Nexticorn" width={100} height={50} className="block" />
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm text-[#6B7280] hover:text-[#111111] transition-colors">About</a>
            <a href="#summit" className="text-sm text-[#6B7280] hover:text-[#111111] transition-colors">Summit</a>
            <a href="#membership" className="text-sm text-[#6B7280] hover:text-[#111111] transition-colors">Membership</a>
            <a href="#board" className="text-sm text-[#6B7280] hover:text-[#111111] transition-colors">Board</a>
            <Link href="/login" className="text-sm border border-[#F6ACC1] text-[#111111] px-4 py-2 rounded-lg hover:bg-[#F6ACC1] hover:border-[#F6ACC1] transition-colors">Sign in</Link>
            <Link href="/signup" className="text-sm bg-[#E61952] text-white px-4 py-2 rounded-lg hover:bg-[#C01544] transition-colors">Become a Member</Link>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <Link href="/login" className="text-sm border border-[#F6ACC1] text-[#111111] px-3 py-1.5 rounded-lg whitespace-nowrap">Sign in</Link>
            <Link href="/signup" className="text-sm bg-[#E61952] text-white px-3 py-1.5 rounded-lg whitespace-nowrap">Join</Link>
          </div>
        </div>
      </nav>

      {/* Hero — with faded image on right */}
      <section className="bg-[#111111] text-white relative overflow-hidden min-h-[520px] flex items-center">
        {/* Placeholder image right side with fade */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/60 to-transparent z-10" />
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] via-[#2d1b3d] to-[#111111] flex items-center justify-center">
            <div className="text-center opacity-20">
              <div className="w-32 h-32 border-2 border-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white text-sm">Hero image</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-6 py-16 md:py-24 w-full">
          <div className="max-w-4xl mx-auto">
            <Section>
              <p className="text-[#E61952] text-sm font-medium uppercase tracking-widest mb-4">Est. 2015</p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Next Indonesian<br /><span className="text-[#E61952]">Unicorns</span>
              </h1>
              <p className="text-[#9CA3AF] text-base md:text-lg max-w-xl mb-10 leading-relaxed">
                The Nexticorn Foundation is an independent umbrella advocacy organization for Indonesia's tech, startup, and venture capital industry — advancing growth through thought leadership, policy advocacy, and connectivity.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Link href="/signup" className="bg-[#E61952] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#C01544] transition-colors w-full sm:w-auto text-center">Become a Member</Link>
                <Link href="/login" className="border border-[#555] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#F6ACC1] hover:text-[#111111] hover:border-[#F6ACC1] transition-colors w-full sm:w-auto text-center">Member Portal</Link>
              </div>
            </Section>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <Section>
            <p className="text-[#E61952] text-sm font-medium uppercase tracking-widest mb-4">About</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-6">About Nexticorn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
              <div>
                <p className="text-[#6B7280] leading-relaxed mb-4">
                  First initiated in 2015 as a collaborative effort involving Indonesia's Ministry of Communications and IT, the Association of VCs and Startups in Indonesia (AMVESINDO), and Ernst & Young, the Nexticorn Foundation has evolved into the country's leading umbrella advocacy organization for the tech, startup, and VC industry.
                </p>
                <p className="text-[#6B7280] leading-relaxed">
                  Since its initiation, the Nexticorn Foundation has organized its flagship annual Nexticorn Summits, global outreach campaigns, and discussion forums, participated in by the industry's key stakeholders — from top Indonesian startups and leading global investors to policymakers and corporations.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  { label: 'Founded', value: '2015' },
                  { label: 'Summits held', value: '5' },
                  { label: 'Total meetings facilitated', value: '6,500+' },
                  { label: 'Focus', value: 'Indonesia & SEA tech ecosystem' },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-[#E61952] pl-4">
                    <div className="text-xs text-[#9CA3AF] uppercase tracking-wide">{item.label}</div>
                    <div className="text-[#111111] font-semibold mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* About image placeholder */}
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] rounded-2xl flex items-center justify-center border border-[#E5E7EB]">
              <div className="text-center">
                <svg className="w-12 h-12 text-[#D1D5DB] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-[#9CA3AF] text-sm">About image placeholder</p>
                <p className="text-[#D1D5DB] text-xs mt-1">Recommended: 1200 × 600px</p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Summit */}
      <section id="summit" className="px-6 py-16 md:py-20 bg-[#F7F7F8]">
        <div className="max-w-4xl mx-auto">
          <Section>
            <p className="text-[#E61952] text-sm font-medium uppercase tracking-widest mb-4">Flagship Program</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-4">The Nexticorn Summit</h2>
            <p className="text-[#6B7280] leading-relaxed max-w-2xl mb-8">
              Nexticorn's flagship summit, held annually in Bali, Indonesia, has been regularly attended by leading figures from Indonesia's VC-startup industry and global investors. Since 2018, Nexticorn has held five annual summits, facilitating strategic connections and the exchange of insights.
            </p>

            {/* Summit image placeholder */}
            <div className="w-full h-56 md:h-72 bg-gradient-to-br from-[#1a1a2e] via-[#2d1b3d] to-[#111111] rounded-2xl flex items-center justify-center mb-10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #E61952 0%, transparent 50%), radial-gradient(circle at 80% 50%, #4472C4 0%, transparent 50%)'}} />
              </div>
              <div className="text-center relative z-10">
                <svg className="w-12 h-12 text-white/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-white/40 text-sm">Summit image placeholder</p>
                <p className="text-white/20 text-xs mt-1">Recommended: 1200 × 600px</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { number: '6,500+', label: 'Meetings facilitated' },
                { number: '5', label: 'Annual summits' },
                { number: '2018', label: 'First summit' },
                { number: 'Bali', label: 'Home base' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl border border-[#E5E7EB] p-5 md:p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#E61952] mb-2">{stat.number}</div>
                  <div className="text-xs md:text-sm text-[#6B7280]">{stat.label}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <Section>
            <p className="text-[#E61952] text-sm font-medium uppercase tracking-widest mb-4">Program</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-4">Nexticorn Membership</h2>
            <p className="text-[#6B7280] leading-relaxed max-w-2xl mb-8">
              Exclusive membership program for startups, PE/VC firms, institutional partners, and LPs seeking privileged access to Indonesia and Southeast Asia's tech ecosystem intelligence.
            </p>

            {/* Membership image placeholder */}
            <div className="w-full h-48 md:h-64 bg-gradient-to-br from-[#FEE2E2] to-[#F6ACC1] rounded-2xl flex items-center justify-center mb-10 border border-[#FECACA]">
              <div className="text-center">
                <svg className="w-12 h-12 text-[#E61952]/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-[#E61952]/50 text-sm">Membership image placeholder</p>
                <p className="text-[#E61952]/30 text-xs mt-1">Recommended: 1200 × 500px</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10">
              {[
                { title: 'Proprietary Insights', desc: 'Exclusive research, whitepapers, and ecosystem data not available publicly.' },
                { title: 'Industry Leaders', desc: 'Direct exposure to Indonesia\'s most influential founders, investors, and policymakers.' },
                { title: 'Roundtable Sessions', desc: 'Exclusive closed-door discussions with key ecosystem stakeholders.' },
                { title: 'Private Networking', desc: 'Curated private events connecting members with the right counterparts.' },
                { title: 'Special Workshops', desc: 'Hands-on sessions on market entry, fundraising, and ecosystem navigation.' },
                { title: 'Brand Activation', desc: 'Visibility opportunities within Indonesia\'s premier startup network.' },
              ].map((benefit) => (
                <div key={benefit.title} className="border border-[#E5E7EB] rounded-xl p-5 md:p-6 hover:border-[#E61952] transition-colors">
                  <div className="w-8 h-8 bg-[#FEE2E2] rounded-lg flex items-center justify-center mb-4">
                    <div className="w-3 h-3 bg-[#E61952] rounded-full" />
                  </div>
                  <div className="text-[#111111] font-semibold mb-2">{benefit.title}</div>
                  <div className="text-[#6B7280] text-sm leading-relaxed">{benefit.desc}</div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[#E5E7EB] rounded-xl p-6 md:p-8">
                <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-2">Individual</div>
                <div className="text-2xl font-bold text-[#111111] mb-1">IDR 5,000,000</div>
                <div className="text-sm text-[#9CA3AF] mb-6">per year</div>
                <ul className="space-y-2 mb-8">
                  {['Access to research & whitepapers', 'Board video updates', 'Meeting request access', 'Member newsletter'].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <div className="w-4 h-4 bg-[#FEE2E2] rounded-full flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 bg-[#E61952] rounded-full" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block text-center border border-[#E61952] text-[#E61952] rounded-lg py-2.5 text-sm font-medium hover:bg-[#FEE2E2] transition-colors">Become a Member</Link>
              </div>
              <div className="border border-[#E61952] rounded-xl p-6 md:p-8 relative">
                <div className="absolute top-4 right-4 text-xs bg-[#E61952] text-white px-2.5 py-1 rounded-full">Institutional</div>
                <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-2">Institutional</div>
                <div className="text-2xl font-bold text-[#111111] mb-1">IDR 25,000,000</div>
                <div className="text-sm text-[#9CA3AF] mb-6">per year</div>
                <ul className="space-y-2 mb-8">
                  {['Everything in Individual', 'LP-level exclusive research', 'Priority introductions', 'Exclusive roundtable invitations', 'Brand activation opportunities', 'Dedicated account support'].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <div className="w-4 h-4 bg-[#FEE2E2] rounded-full flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 bg-[#E61952] rounded-full" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block text-center bg-[#E61952] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#C01544] transition-colors">Become a Member</Link>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Board */}
      <section id="board" className="px-6 py-16 md:py-20 bg-[#F7F7F8]">
        <div className="max-w-4xl mx-auto text-center">
          <Section>
            <p className="text-[#E61952] text-sm font-medium uppercase tracking-widest mb-4">Leadership</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-10">Board of Nexticorn</h2>

{/* All board members — uniform grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              {boardMembers.map((member, index) => (
                <button
                  key={member.name}
                  onClick={() => setSelectedMember(member)}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-5 hover:border-[#E61952] hover:shadow-md transition-all group text-center flex flex-col items-center"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg mb-3 transition-colors ${
                    index === 0
                      ? 'bg-[#FEE2E2] text-[#E61952] group-hover:bg-[#E61952] group-hover:text-white'
                      : 'bg-[#F3F4F6] text-[#6B7280] group-hover:bg-[#FEE2E2] group-hover:text-[#E61952]'
                  }`}>
                    {member.initial}
                  </div>
                  <div className="text-[#111111] font-semibold text-sm">{member.name}</div>
                  <div className="text-[#9CA3AF] text-xs mt-0.5">{member.role}</div>
                  <div className="text-[#E61952] text-xs mt-2">View profile →</div>
                </button>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 md:py-20 bg-[#111111] text-white text-center">
        <Section>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Nexticorn network</h2>
            <p className="text-[#9CA3AF] mb-8">Get privileged access to Indonesia and SEA ecosystem intelligence, exclusive research, and the connections that matter.</p>
            <Link href="/signup" className="inline-block bg-[#E61952] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#C01544] transition-colors">Become a Member</Link>
          </div>
        </Section>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] px-6 py-8 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image src="/images/nxclogo.png" alt="Nexticorn" width={100} height={50} className="block" />
          <p className="text-[#9CA3AF] text-sm text-center">© 2026 Nexticorn Foundation. All rights reserved.</p>
          <Link href="/login" className="text-sm text-[#6B7280] hover:text-[#111111]">Member login →</Link>
        </div>
      </footer>

      {/* Board member modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-6"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#FEE2E2] rounded-full flex items-center justify-center text-[#E61952] font-bold text-3xl mx-auto mb-4">
                {selectedMember.initial}
              </div>
              <h3 className="text-xl font-bold text-[#111111]">{selectedMember.name}</h3>
              <p className="text-[#E61952] text-sm font-medium mt-1">{selectedMember.role}</p>
              <p className="text-xs text-[#9CA3AF] mt-0.5">Nexticorn Foundation</p>
            </div>
            <div className="bg-[#F7F7F8] rounded-xl p-5 mb-6">
              <p className="text-[#6B7280] text-sm leading-relaxed">{selectedMember.bio}</p>
            </div>
            <button
              onClick={() => setSelectedMember(null)}
              className="w-full border border-[#E5E7EB] text-[#6B7280] rounded-lg py-2.5 text-sm font-medium hover:border-[#111111] hover:text-[#111111] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}