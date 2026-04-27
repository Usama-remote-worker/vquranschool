import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact vQuranSchool – Book Free Quran Trial Class | WhatsApp & Email Support",
  description:
    "Contact vQuranSchool to enroll in online Quran classes or book your FREE trial. Reach us via WhatsApp +92 304 4296295, email, or our contact form. 24/7 support for UK, USA, Canada & Australia students.",
  alternates: { canonical: "https://vquranschool.com/contact" },
  openGraph: {
    title: "Contact vQuranSchool – Book Free Quran Trial | WhatsApp Support",
    description: "Get in touch with vQuranSchool. Book your free trial, ask about courses, or get enrollment help. WhatsApp: +92 304 4296295. Serving UK, USA, Canada & Australia.",
    url: "https://vquranschool.com/contact",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact vQuranSchool – Online Quran Academy",
  description: "Contact vQuranSchool to book a free online Quran trial class, get course information, or receive enrollment support.",
  mainEntity: {
    "@type": "EducationalOrganization",
    name: "vQuranSchool",
    telephone: "+92-304-4296295",
    email: "support@vquranschool.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+92-304-4296295",
        contactType: "customer service",
        availableLanguage: ["English", "Urdu", "Arabic"],
        contactOption: "TollFree",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32 flex items-center justify-center border-b border-slate-200 bg-white">
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2000&auto=format&fit=crop"
              alt="Online Quran Academy contact"
              fill
              className="object-cover mix-blend-multiply"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white" />
          </div>
          <div className="container px-4 md:px-6 relative z-10 mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              24/7 WhatsApp Support
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-blue-950 mb-6 font-serif">
              Contact vQuranSchool
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              Ready to start your Quran learning journey? Book a free trial, ask about our courses, or get enrollment help. Our team is available 24/7 via WhatsApp for students in the UK, USA, Canada, and Australia.
            </p>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <section className="py-24 relative overflow-hidden bg-slate-50">
          <div className="absolute top-1/2 left-0 w-[40%] h-[40%] bg-blue-100 blur-[120px] rounded-full pointer-events-none mix-blend-multiply -translate-y-1/2" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Left: Contact Info */}
              <div className="space-y-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4 font-serif">Get in Touch</h2>
                  <p className="text-slate-600 leading-relaxed font-light text-lg">
                    Whether you want to enroll in online Quran classes, need technical support for your student dashboard, or simply have a question about our courses — we&apos;re here to help. We respond to all inquiries within 2 hours during business hours.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* WhatsApp — PRIMARY CTA */}
                  <a
                    href="https://wa.me/923044296295?text=Assalamu%20Alaikum!%20I'd%20like%20to%20book%20a%20free%20Quran%20trial%20class%20at%20vQuranSchool."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-6 group p-5 bg-white rounded-2xl border border-green-100 hover:border-green-400 hover:shadow-lg hover:shadow-green-50 transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552" className="w-8 h-8" aria-hidden="true">
                        <path fill="#fff" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.535 23.08-6.043 2.233 1.322c9.412 5.590 20.130 8.544 31.038 8.550h.025c33.714 0 61.146-27.426 61.158-61.135.008-16.335-6.349-31.693-17.886-43.239a61.012 61.012 0 0 0-43.095-18.067z" />
                        <path fill="#25D366" d="M87.184 32.227c-29.804 0-54.09 24.274-54.1 54.076a53.916 53.916 0 0 0 8.268 28.737l1.284 2.042-5.462 19.93 20.404-5.343 1.974 1.168c8.32 4.938 17.800 7.546 27.454 7.55h.022c29.789 0 54.074-24.278 54.084-54.08.007-14.444-5.612-28.014-15.81-38.217a53.893 53.893 0 0 0-38.118-15.863z" />
                        <path fill="#fff" fillRule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.600s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.919-4.746 5.981-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.730s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.840 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.669-13.537z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">WhatsApp — Fastest Response</p>
                      <h3 className="text-xl font-bold text-blue-950 mb-1 font-serif">+92 304 4296295</h3>
                      <p className="text-slate-500 text-sm font-light">Message us on WhatsApp 24/7 — we typically reply within minutes.</p>
                    </div>
                  </a>

                  {/* Email */}
                  <div className="flex items-start gap-6 group p-5 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white shadow-sm transition-colors duration-500 flex shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-950 mb-1 font-serif">Email Address</h3>
                      <a href="mailto:support@vquranschool.com" className="text-blue-600 hover:underline font-medium">
                        support@vquranschool.com
                      </a>
                      <p className="text-slate-500 text-sm font-light mt-1">We reply to all emails within 24 hours.</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-6 group p-5 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white shadow-sm transition-colors duration-500 flex shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-950 mb-1 font-serif">Phone</h3>
                      <a href="tel:+923044296295" className="text-slate-700 font-medium hover:text-blue-600 transition-colors">
                        +92 304 4296295
                      </a>
                      <p className="text-blue-500 italic text-sm mt-1">Available during Pakistan business hours (PKT UTC+5)</p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-start gap-6 group p-5 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-blue-600 shadow-sm flex shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-950 mb-1 font-serif">Class Availability</h3>
                      <p className="text-slate-600 font-medium">Monday — Saturday</p>
                      <p className="text-slate-500 text-sm font-light mt-1">
                        Morning, afternoon &amp; evening slots available to suit UK, USA, Canada &amp; Australian time zones.
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-6 p-5 bg-white rounded-2xl border border-slate-100">
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-blue-600 shadow-sm flex shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-blue-950 mb-1 font-serif">Based in</h3>
                      <p className="text-slate-600 font-medium">Lahore, Pakistan</p>
                      <p className="text-slate-500 text-sm font-light mt-1">All classes are conducted fully online — no travel required.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Quick Actions */}
              <div className="space-y-6">
                {/* WhatsApp Quick Action Card */}
                <a
                  href="https://wa.me/923044296295?text=Assalamu%20Alaikum!%20I'd%20like%20to%20book%20a%20free%20trial%20Quran%20class%20at%20vQuranSchool."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-8 bg-gradient-to-br from-[#1ebe5d] to-[#25D366] text-white rounded-3xl shadow-2xl shadow-green-600/20 hover:shadow-green-600/40 hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552" className="w-9 h-9" aria-hidden="true">
                        <path fill="#fff" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.535 23.08-6.043 2.233 1.322c9.412 5.590 20.130 8.544 31.038 8.550h.025c33.714 0 61.146-27.426 61.158-61.135.008-16.335-6.349-31.693-17.886-43.239a61.012 61.012 0 0 0-43.095-18.067z" />
                        <path fill="rgba(255,255,255,0.3)" d="M87.184 32.227c-29.804 0-54.09 24.274-54.1 54.076a53.916 53.916 0 0 0 8.268 28.737l1.284 2.042-5.462 19.93 20.404-5.343 1.974 1.168c8.32 4.938 17.800 7.546 27.454 7.55h.022c29.789 0 54.074-24.278 54.084-54.08.007-14.444-5.612-28.014-15.81-38.217a53.893 53.893 0 0 0-38.118-15.863z" />
                        <path fill="#fff" fillRule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.600s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.919-4.746 5.981-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.730s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.840 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.669-13.537z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Fastest Way to Reach Us</p>
                      <h3 className="text-2xl font-bold font-serif">WhatsApp Us Now</h3>
                    </div>
                  </div>
                  <p className="text-white/90 font-light leading-relaxed mb-6">
                    Tap below to open WhatsApp and send us a message. Ask about courses, pricing, teacher availability, or book your free trial class instantly.
                  </p>
                  <div className="h-12 bg-white/20 hover:bg-white/30 transition-colors rounded-xl flex items-center justify-center font-bold text-white border border-white/30">
                    Open WhatsApp → +92 304 4296295
                  </div>
                </a>

                {/* Book Trial Card */}
                <div className="p-8 bg-white rounded-3xl border border-blue-100 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-950 font-serif mb-3">Book a Free Trial Class</h3>
                  <p className="text-slate-500 font-light text-sm mb-6 leading-relaxed">
                    Ready to start? Fill out our quick enrollment form and we&apos;ll schedule your first complimentary 1-on-1 Quran class within 24 hours.
                  </p>
                  <Link href="/book-trial">
                    <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-blue-600/25 text-sm">
                      Book Free Trial Class →
                    </button>
                  </Link>
                </div>

                {/* FAQ quick links */}
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <h3 className="font-bold text-blue-950 mb-4">Quick Answers</h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    {[
                      { q: "How do I enroll?", a: "Click 'Book Free Trial' above." },
                      { q: "What are your prices?", a: "Plans start from $25/month." },
                      { q: "Do you have female teachers?", a: "Yes, female tutors available." },
                      { q: "What time zones do you cover?", a: "GMT, EST, PST, CST, AEST & more." },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                        <span className="font-medium text-slate-700">{item.q}</span>
                        <span className="text-right shrink-0 text-slate-500">{item.a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
