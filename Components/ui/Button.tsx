type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'outline' | 'default' | 'action' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export default function Button({ children, className = '', size = 'md', variant = 'default', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200';
  const sizeClasses =
    size === 'sm' ? 'text-sm px-3 py-1.5' : size === 'lg' ? 'text-lg px-6 py-3' : 'text-base px-4 py-2';
  
  let variantClasses = '';
  switch (variant) {
    case 'outline':
      variantClasses = 'border border-royal-blue text-royal-blue hover:bg-royal-blue/10 dark:border-royal-blue dark:text-royal-blue';
      break;
    case 'action':
      variantClasses = 'bg-service-yellow text-dark-slate hover:bg-yellow-500 shadow-sm';
      break;
    case 'ghost':
      variantClasses = 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800';
      break;
    case 'primary':
    case 'default':
    default:
      variantClasses = 'bg-royal-blue text-white hover:bg-blue-700 shadow-sm';
      break;
  }

  return (
    <button {...props} className={`${base} ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </button>
  );
};