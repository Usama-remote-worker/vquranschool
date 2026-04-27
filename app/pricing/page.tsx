import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, CreditCard, ShieldCheck, UserPlus, Star, Clock, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Online Quran Class Fees & Pricing Plans | vQuranSchool",
  description: "Affordable online Quran class pricing for kids and adults. Monthly plans starting from $25. Book a free trial class today. Transparent pricing for UK, USA, Canada, and Australia families.",
  keywords: ["online quran class fees", "quran learning pricing", "cheap quran classes online", "affordable quran tutor", "quran academy fees uk", "quran class prices usa"],
  alternates: { canonical: "https://vquranschool.com/pricing" },
};

export default function PricingPage() {
  const plans = [
    {
      name: "Starter Plan",
      price: "25",
      frequency: "2 Classes / Week",
      features: ["8 Classes per Month", "30 mins per session", "1-on-1 Live Classes", "Noorani Qaida / Basic Quran", "Basic Islamic Studies", "Monthly Progress Report"],
      recommended: false,
    },
    {
      name: "Standard Plan",
      price: "45",
      frequency: "3 Classes / Week",
      features: ["12 Classes per Month", "30 mins per session", "1-on-1 Live Classes", "Tajweed / Quran Reading", "Islamic Dua & Sunnah", "Weekly Evaluations"],
      recommended: true,
    },
    {
      name: "Intensive Plan",
      price: "75",
      frequency: "5 Classes / Week",
      features: ["20 Classes per Month", "30 mins per session", "1-on-1 Live Classes", "Hifz (Memorization)", "Advanced Tajweed", "Ijazah Certification Track"],
      recommended: false,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-6">
            Transparent & Affordable Pricing
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-950 font-serif mb-6 leading-tight">
            Invest in Your Child&apos;s <br />
            <span className="text-blue-600">Islamic Future</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            High-quality 1-on-1 Quran education at competitive rates. Choose a plan that fits your schedule and budget. No long-term contracts.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative bg-white rounded-[32px] p-8 border ${plan.recommended ? 'border-blue-500 shadow-2xl shadow-blue-500/10 scale-105 z-10' : 'border-slate-200 shadow-sm'} transition-all hover:shadow-xl`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-blue-950 mb-2 font-serif">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-blue-600">${plan.price}</span>
                    <span className="text-slate-400 font-light">/ month</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2 font-medium">{plan.frequency}</p>
                </div>
                
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-slate-600">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/book-trial">
                  <Button className={`w-full h-14 rounded-2xl font-bold text-lg transition-all ${plan.recommended ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20' : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                    Book Free Trial
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center max-w-2xl mx-auto">
            <p className="text-slate-500 text-sm font-light mb-8">
              * Family discounts available for 3 or more siblings. Contact us for custom plans.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="flex items-center justify-center gap-2 text-slate-600 font-medium text-sm">
                 <ShieldCheck className="w-5 h-5 text-blue-600" /> Secure Payments
               </div>
               <div className="flex items-center justify-center gap-2 text-slate-600 font-medium text-sm">
                 <Clock className="w-5 h-5 text-blue-600" /> Cancel Anytime
               </div>
               <div className="flex items-center justify-center gap-2 text-slate-600 font-medium text-sm">
                 <Star className="w-5 h-5 text-blue-600" /> Free Evaluation
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-blue-950 font-serif mb-12">Why Invest in Online Quran Classes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg">Global Reach</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Connect your children with certified scholars from around the world without leaving your home in the UK, USA, or Canada.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg">Save Time</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Eliminate the commute to local Madrasahs. Flexible evening and weekend slots that fit your busy western lifestyle.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg">Focused Learning</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                1-on-1 attention ensures your child makes faster progress compared to traditional group classes at local centers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-blue-600 rounded-[48px] p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 relative z-10">Start with a 100% FREE <br /> Trial Class</h2>
            <p className="text-blue-100 text-lg mb-10 relative z-10 font-light">Experience our teaching style and get a free evaluation before choosing a plan.</p>
            <Link href="/book-trial">
              <Button className="h-16 px-12 bg-white text-blue-600 hover:bg-slate-50 rounded-2xl font-bold text-xl relative z-10 shadow-xl transition-all hover:scale-105">
                Book My Free Trial Class
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
