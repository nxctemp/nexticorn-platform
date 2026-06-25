import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="border-b border-[#E5E7EB] px-6 py-4 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src="/images/nxclogo.png" alt="Nexticorn" width={100} height={50} className="block" />
          </Link>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm text-[#6B7280] hover:text-[#111111]">About</a>
            <a href="#summit" className="text-sm text-[#6B7280] hover:text-[#111111]">Summit</a>
            <a href="#membership" className="text-sm text-[#6B7280] hover:text-[#111111]">Membership</a>
            <a href="#board" className="text-sm text-[#6B7280] hover:text-[#111111]">Board</a>
            <Link href="/login" className="text-sm border border-[#F6ACC1] text-[#111111] px-4 py-2 rounded-lg hover:bg-[#F6ACC1] hover:border-[#F6ACC1] transition-colors">Sign in</Link>
            <Link href="/signup" className="text-sm bg-[#E61952] text-white px-4 py-2 rounded-lg hover:bg-[#C01544] transition-colors">Become a Member</Link>
          </div>
          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/login" className="text-sm border border-[#F6ACC1] text-[#111111] px-3 py-1.5 rounded-lg">Sign in</Link>
            <Link href="/signup" className="text-sm bg-[#E61952] text-white px-3 py-1.5 rounded-lg">Become a Member</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#111111] text-white px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#E61952] text-sm font-medium uppercase tracking-widest mb-4">Est. 2015</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Next Indonesian<br /><span className="text-[#E61952]">Unicorns</span>
          </h1>
          <p className="text-[#9CA3AF] text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
            The Nexticorn Foundation is an independent umbrella advocacy organization for Indonesia's tech, startup, and venture capital industry — advancing growth through thought leadership, policy advocacy, and connectivity.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link href="/signup" className="bg-[#E61952] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#C01544] transition-colors w-full sm:w-auto text-center">Become a Member</Link>
            <Link href="/login" className="border border-[#555] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#F6ACC1] hover:text-[#111111] hover:border-[#F6ACC1] transition-colors w-full sm:w-auto text-center">Member Portal</Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#E61952] text-sm font-medium uppercase tracking-widest mb-4">About</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-6">About Nexticorn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
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
        </div>
      </section>

      {/* Summit */}
      <section id="summit" className="px-6 py-16 md:py-20 bg-[#F7F7F8]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#E61952] text-sm font-medium uppercase tracking-widest mb-4">Flagship Program</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-4">The Nexticorn Summit</h2>
          <p className="text-[#6B7280] leading-relaxed max-w-2xl mb-10">
            Nexticorn's flagship summit, held annually in Bali, Indonesia, has been regularly attended by leading figures from Indonesia's VC-startup industry and global investors. Since 2018, Nexticorn has held five annual summits, facilitating strategic connections and the exchange of insights.
          </p>
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
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="px-6 py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#E61952] text-sm font-medium uppercase tracking-widest mb-4">Program</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-4">Nexticorn Membership</h2>
          <p className="text-[#6B7280] leading-relaxed max-w-2xl mb-10">
            Exclusive membership program for startups, PE/VC firms, institutional partners, and LPs seeking privileged access to Indonesia and Southeast Asia's tech ecosystem intelligence.
          </p>
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
        </div>
      </section>

      {/* Board */}
      <section id="board" className="px-6 py-16 md:py-20 bg-[#F7F7F8]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#E61952] text-sm font-medium uppercase tracking-widest mb-4">Leadership</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-10">Board of Nexticorn</h2>
          <div className="mb-8">
            <div className="inline-flex items-center gap-4 bg-white border border-[#E5E7EB] rounded-xl px-6 py-4">
              <div className="w-12 h-12 bg-[#FEE2E2] rounded-full flex items-center justify-center text-[#E61952] font-bold text-lg">R</div>
              <div>
                <div className="text-[#111111] font-semibold">Rudiantara</div>
                <div className="text-[#6B7280] text-sm">Chairman</div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="text-xs text-[#9CA3AF] uppercase tracking-wide mb-4">Governing Board</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Tom Lembong', role: 'Vice Chairman' },
                { name: 'David Rimbo', role: 'Board Member' },
                { name: 'Rambun Tjajo', role: 'Board Member' },
                { name: 'Donald Wihardja', role: 'Board Member' },
              ].map((member) => (
                <div key={member.name} className="bg-white border border-[#E5E7EB] rounded-xl p-4">
                  <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#6B7280] font-semibold text-sm mb-3">
                    {member.name.charAt(0)}
                  </div>
                  <div className="text-[#111111] font-medium text-sm">{member.name}</div>
                  <div className="text-[#9CA3AF] text-xs mt-0.5">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 md:py-20 bg-[#111111] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Nexticorn network</h2>
          <p className="text-[#9CA3AF] mb-8">Get privileged access to Indonesia and SEA ecosystem intelligence, exclusive research, and the connections that matter.</p>
          <Link href="/signup" className="inline-block bg-[#E61952] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#C01544] transition-colors">Become a Member</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] px-6 py-8 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image src="/images/nxclogo.png" alt="Nexticorn" width={100} height={50} className="block" />
          <p className="text-[#9CA3AF] text-sm text-center">© 2026 Nexticorn Foundation. All rights reserved.</p>
          <Link href="/login" className="text-sm text-[#6B7280] hover:text-[#111111]">Member login →</Link>
        </div>
      </footer>

    </div>
  )
}