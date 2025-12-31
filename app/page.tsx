import Button from '@/Components/ui/Button';
import ThemeToggle from '@/Components/ui/ThemeToggle';
import Link from 'next/link';
import { Phone, Mail, MapPin, Zap, Clock, Shield } from 'lucide-react';


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-blue-gradient text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="w-7 h-7 text-service-yellow fill-service-yellow" />
            <h1 className="text-2xl font-bold tracking-tight">RepairShop</h1>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/10">
                কর্মচারী লগইন
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" variant="action">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-blue-gradient dark:bg-dark-navy py-20 md:py-32">
        {/* Dark mode overlay for hero as per system spec */}
        <div className="absolute inset-0 bg-blue-gradient opacity-0 dark:opacity-5 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                আপনার মেরামত কাজ সহজ করুন
              </h2>
              <p className="text-xl text-blue-50 dark:text-blue-100 mb-8 max-w-lg opacity-90">
                ডিজিটাল টিকেট সিস্টেম দিয়ে গ্রাহক এবং কাজ পরিচালনা করুন। বাংলাদেশের জন্য বিশেষভাবে ডিজাইন করা।
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/login">
                  <Button size="lg" variant="action" className="shadow-lg transform transition hover:scale-105 active:scale-95">
                    শুরু করুন
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    যোগাযোগ করুন
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-service-yellow to-sky-blue rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative h-80 md:h-96 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-2xl">
                <div className="text-center">
                  <Zap className="w-24 h-24 text-service-yellow mx-auto mb-4 drop-shadow-lg" />
                  <p className="text-white text-xl font-bold">
                    সম্পূর্ণ ডিজিটাল সমাধান
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              আমাদের বৈশিষ্ট্য
            </h3>
            <div className="w-20 h-1.5 bg-royal-blue mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-royal-blue/10 dark:bg-royal-blue/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-royal-blue" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                দ্রুত টিকেট ট্র্যাকিং
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                প্রতিটি মেরামতের কাজ একটি অনন্য টিকেটে সংরক্ষণ করুন এবং রিয়েল-টাইমে আপডেট পান।
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-green/10 dark:bg-emerald-green/20 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-emerald-green" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                নিরাপদ গ্রাহক ডাটা
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                সকল গ্রাহক তথ্য এক জায়গায় রাখুন - ফোন, ঠিকানা, ইমেইল এবং বিশেষ নোট।
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card p-8 rounded-xl shadow-sm border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-royal-blue/10 dark:bg-royal-blue/20 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-royal-blue" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                কর্মচারী ব্যবস্থাপনা
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                বিভিন্ন ভূমিকা এবং অনুমতি সহ আপনার দল পরিচালনা করুন।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            এটি কিভাবে কাজ করে
          </h3>
          <div className="w-20 h-1.5 bg-service-yellow mx-auto rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { tag: "১", title: "তথ্য প্রবেশ করুন", desc: "নতুন গ্রাহকের তথ্য যোগ করুন - নাম, ফোন, ঠিকানা।" },
            { tag: "২", title: "টিকেট তৈরি করুন", desc: "মেরামতের জন্য একটি নতুন টিকেট তৈরি করুন।" },
            { tag: "৩", title: "ট্র্যাক করুন", desc: "রিয়েল-টাইমে টিকেটের অবস্থা দেখুন।" },
            { tag: "৪", title: "রিপোর্ট দেখুন", desc: "আপনার ব্যবসার পারফরম্যান্স বিশ্লেষণ করুন।" }
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-royal-blue text-white rounded-full flex items-center justify-center font-bold text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  {item.tag}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-muted-foreground px-4">
                  {item.desc}
                </p>
              </div>
              {idx < 3 && <div className="hidden lg:block absolute top-8 left-[65%] w-full h-[2px] bg-border -z-10"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section - Keeping dark theme specific style but updating border/text logic if needed? 
          Actually contact section has hardcoded bg-dark-navy and text-white. 
          This is a dark section regardless of theme. So we keep it as is, or maybe update subtle borders.
      */}
      <section id="contact" className="bg-dark-navy text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-royal-blue/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-service-yellow/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
            আমাদের সাথে যোগাযোগ করুন
          </h3>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Phone */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-royal-blue/50 transition-colors">
              <div className="w-12 h-12 bg-royal-blue/20 rounded-full flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-sky-blue" />
              </div>
              <h4 className="font-bold text-xl mb-3">ফোন</h4>
              <p className="text-soft-white opacity-80">+880 1XXX-XXXXXX</p>
              <p className="text-soft-white opacity-60 text-sm mt-2">সোমবার - শুক্রবার, ৯টা - ৬টা</p>
            </div>

            {/* Email */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-emerald-green/50 transition-colors">
              <div className="w-12 h-12 bg-emerald-green/20 rounded-full flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-emerald-green" />
              </div>
              <h4 className="font-bold text-xl mb-3">ইমেইল</h4>
              <p className="text-soft-white opacity-80">info@repairshop.bd</p>
              <p className="text-soft-white opacity-60 text-sm mt-2">সাপোর্ট: support@repairshop.bd</p>
            </div>

            {/* Address */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-soft-red/50 transition-colors">
              <div className="w-12 h-12 bg-soft-red/20 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-soft-red" />
              </div>
              <h4 className="font-bold text-xl mb-3">ঠিকানা</h4>
              <p className="text-soft-white opacity-80">ঢাকা, বাংলাদেশ</p>
              <p className="text-soft-white opacity-60 text-sm mt-2">প্রতিটি জেলায় সেবা</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-12 border-t border-white/10">
            <h4 className="text-2xl md:text-3xl font-bold mb-6">আজই আপনার ব্যবসা আধুনিক করুন</h4>
            <p className="text-soft-white opacity-70 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              আপনার মেরামত দোকানকে ডিজিটালাইজ করুন এবং আরও দক্ষতার সাথে কাজ করুন।
            </p>
            <Link href="/login">
              <Button size="lg" variant="action" className="px-10 py-4 text-xl shadow-2xl">
                কর্মচারী লগইন করুন
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background text-muted-foreground py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-6 h-6 text-royal-blue" />
                <span className="text-2xl font-bold text-foreground">RepairShop</span>
              </div>
              <p className="text-sm leading-relaxed">বাংলাদেশে মেরামত ব্যবসার জন্য সম্পূর্ণ ডিজিটাল সমাধান। আপনার কাজ পরিচালনা করুন স্মার্টভাবে।</p>
            </div>
            <div>
              <h5 className="font-bold text-foreground mb-6 uppercase tracking-wider text-xs">পণ্য</h5>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-royal-blue transition-colors">বৈশিষ্ট্য</a></li>
                <li><a href="#" className="hover:text-royal-blue transition-colors">মূল্য নির্ধারণ</a></li>
                <li><a href="#" className="hover:text-royal-blue transition-colors">নিরাপত্তা</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-foreground mb-6 uppercase tracking-wider text-xs">সহায়তা</h5>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-royal-blue transition-colors">সাহায্য কেন্দ্র</a></li>
                <li><a href="#" className="hover:text-royal-blue transition-colors">যোগাযোগ করুন</a></li>
                <li><a href="#" className="hover:text-royal-blue transition-colors">ব্লগ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-foreground mb-6 uppercase tracking-wider text-xs">আইনি</h5>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-royal-blue transition-colors">গোপনীয়তা নীতি</a></li>
                <li><a href="#" className="hover:text-royal-blue transition-colors">শর্তাবলী</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-80">© 2025 RepairShop. সর্বাধিকার সংরক্ষিত।</p>
            <div className="flex gap-6 items-center">
              <p className="text-sm opacity-80">বাংলাদেশে তৈরি এবং পরিচালিত।</p>
              <div className="w-px h-4 bg-gray-line dark:bg-dark-border"></div>
              <Zap className="w-4 h-4 text-service-yellow" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
