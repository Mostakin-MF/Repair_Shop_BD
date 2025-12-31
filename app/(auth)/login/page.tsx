import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Button from '@/components/ui/Button';
import { Zap, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-royal-blue/10 rounded-full mb-4">
          <Zap className="w-8 h-8 text-royal-blue" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          RepairShop BD
        </h1>
        <p className="text-muted-foreground">
          আপনার অ্যাকাউন্টে লগইন করুন
        </p>
      </div>

      <div className="space-y-4">
        <LoginLink>
          <Button 
            size="lg" 
            variant="action" 
            className="w-full group"
          >
            <span>লগইন করুন</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </LoginLink>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            কর্মচারী অ্যাক্সেসের জন্য আপনার কোম্পানির শংসাপত্র ব্যবহার করুন
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2025 RepairShop BD</span>
          <span className="flex items-center gap-1">
            নিরাপদ লগইন
            <Zap className="w-3 h-3 text-service-yellow" />
          </span>
        </div>
      </div>
    </div>
  );
}
