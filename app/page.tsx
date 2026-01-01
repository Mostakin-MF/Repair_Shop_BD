import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Link from 'next/link';
import { Phone, Mail, MapPin, Zap, Wrench, Droplets, PaintBucket, Car, Bike, CalendarCheck } from 'lucide-react';


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-service-yellow/10 dark:bg-service-yellow/20 p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-service-yellow fill-service-yellow" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              <span className="text-royal-blue dark:text-sky-400">Auto</span>Fix <span className="text-muted-foreground text-sm font-normal ml-1">BD</span>
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeToggle />
            <Link href="/book">
              <Button variant="action" size="sm" className="hidden sm:flex shadow-md hover:shadow-lg transition-all">
                অ্যাপয়েন্টমেন্ট বুক করুন
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                Staff Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        {/* Backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 transition-colors duration-500"></div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/10 dark:bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-service-yellow/20 dark:bg-purple-500/10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 text-white text-sm font-medium backdrop-blur-sm">
                  <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                  এখন খোলা আছে
               </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
                আপনার বাহন,<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-service-yellow to-amber-300">আমাদের যত্ন</span>
              </h2>
              <p className="text-lg text-blue-50 dark:text-slate-300 max-w-lg leading-relaxed font-light">
                অটো ফিক্স বিডি - কার ও বাইকের জন্য বাংলাদেশের সবচেয়ে নির্ভরযোগ্য ডিজিটাল সার্ভিস সেন্টার। বিশেষজ্ঞ মেকানিক, জেনুইন পার্টস।
              </p>
              <div className="flex gap-4 flex-wrap pt-2">
                <Link href="/book">
                  <Button size="lg" className="bg-service-yellow text-slate-900 hover:bg-yellow-400 dark:bg-service-yellow dark:text-slate-900 dark:hover:bg-amber-400 font-bold border-none shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 text-base h-14 px-8 rounded-full">
                    <CalendarCheck className="mr-2 w-5 h-5"/>
                    অ্যাপয়েন্টমেন্ট নিন
                  </Button>
                </Link>
                <Link href="#services">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 dark:border-white/10 dark:hover:bg-white/5 backdrop-blur-sm h-14 px-8 rounded-full">
                    সেবাসমূহ দেখুন
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative group hidden md:block">
              <div className="absolute -inset-1 bg-gradient-to-r from-service-yellow to-sky-blue rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative h-96 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl p-10">
                 <div className="grid grid-cols-2 gap-8 text-center text-white">
                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                        <Car className="w-16 h-16 mx-auto mb-2 text-service-yellow" />
                        <span className="font-bold text-lg">কার সার্ভিস</span>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                        <Bike className="w-16 h-16 mx-auto mb-2 text-sky-blue" />
                        <span className="font-bold text-lg">বাইক সার্ভিস</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-slate-50 dark:bg-slate-950 py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase mb-3 text-sm">আমাদের সেবাসমূহ</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
              বিশেষজ্ঞদের দ্বারা <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">প্রফেশনাল সেবা</span>
            </h3>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1: Engine Work */}
            <div className="group bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:rotate-3 transition-all duration-300">
                <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">ইঞ্জিন কাজ</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                জটিল ইঞ্জিন রিপেয়ার, টিউনিং এবং ওভারহলিং সেবা অভিজ্ঞ মেকানিক দ্বারা।
              </p>
            </div>

            {/* Service 2: Wash */}
            <div className="group bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-cyan-50 dark:bg-cyan-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:-rotate-3 transition-all duration-300">
                <Droplets className="w-8 h-8 text-cyan-500 dark:text-cyan-400 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">ফোম ওয়াশ</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                হাই-প্রেসার ফোম ওয়াশ, ইন্টেরিয়র ক্লিনিং এবং পলিশিং।
              </p>
            </div>

            {/* Service 3: Paint */}
            <div className="group bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-service-yellow group-hover:rotate-3 transition-all duration-300">
                <PaintBucket className="w-8 h-8 text-service-yellow dark:text-amber-400 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">পেইন্ট ও ডেন্টিং</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                উন্নত মানের পেইন্ট এবং ডেন্ট রিপেয়ার সেবা নতুনের মতো ফিনিশিং সহ।
              </p>
            </div>

            {/* Service 4: General Servicing */}
            <div className="group bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:-rotate-3 transition-all duration-300">
                <Wrench className="w-8 h-8 text-emerald-500 dark:text-emerald-400 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">জেনারেল সার্ভিসিং</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                অয়েল চেঞ্জ, ব্রেক চেক, এয়ার ফিল্টার এবং সম্পূর্ণ চেকআপ।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Book Now */}
      <section className="py-20 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-slate-900 dark:to-blue-950 transition-colors duration-500"></div>
        <div className="relative z-10 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">আপনার সার্ভিসের জন্য প্রস্তুত?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            আজই অনলাইনে বুকিং দিন এবং দীর্ঘ লাইনে দাঁড়ানো এড়িয়ে চলুন। আমরা আপনার সময়ের মূল্য বুঝি।
            </p>
            <Link href="/book">
                <Button size="lg" variant="action" className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-service-yellow dark:text-slate-900 dark:hover:bg-amber-400 font-bold px-10 py-6 text-xl shadow-xl border-none">
                    বুকিং দিন
                </Button>
            </Link>
        </div>
      </section>

      {/* Footer (Simplified) */}
      <footer className="bg-background text-muted-foreground py-12 border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-royal-blue" />
            <span className="text-xl font-bold text-foreground">AutoFix BD</span>
          </div>
          <p className="text-sm">© 2026 AutoFix BD. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-4">
            <Phone className="w-5 h-5 hover:text-royal-blue cursor-pointer" />
            <Mail className="w-5 h-5 hover:text-royal-blue cursor-pointer" />
            <MapPin className="w-5 h-5 hover:text-royal-blue cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}
