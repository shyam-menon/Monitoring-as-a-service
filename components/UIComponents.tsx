import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

export const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; extra?: React.ReactNode }> = ({ children, className = '', title, extra }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-slate-200 p-5 ${className}`}>
    {(title || extra) && (
      <div className="flex justify-between items-center mb-4">
        {title && <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">{title}</h3>}
        {extra && <div>{extra}</div>}
      </div>
    )}
    {children}
  </div>
);

export const Badge: React.FC<{ type: 'success' | 'warning' | 'critical' | 'info' | 'neutral'; text: string }> = ({ type, text }) => {
  const styles = {
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    critical: 'bg-rose-100 text-rose-800 border-rose-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    neutral: 'bg-slate-100 text-slate-800 border-slate-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[type]}`}>
      {text}
    </span>
  );
};

export const MetricCard: React.FC<{ 
  title: string; 
  value: string | number; 
  delta?: number; 
  trend?: 'up' | 'down' | 'stable';
  subtext?: string;
  icon?: React.ReactNode; 
}> = ({ title, value, delta, trend, subtext, icon }) => {
  const getTrendColor = () => {
    // Contextual: sometimes up is bad (latency), sometimes good (revenue). 
    // For simplicity, assume Green = Good, Red = Bad is handled by caller via distinct components or we default to standard logic here.
    // Let's assume standard logic: Up is green unless specified otherwise.
    return trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-rose-600' : 'text-slate-500';
  };

  return (
    <Card className="flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className="text-slate-500 text-sm font-medium mb-1">{title}</div>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {delta !== undefined && (
          <div className={`flex items-center text-xs font-medium mt-1 ${getTrendColor()}`}>
             {trend === 'up' ? <ArrowUp size={12} /> : trend === 'down' ? <ArrowDown size={12} /> : <Minus size={12} />}
             <span className="ml-1">{Math.abs(delta)}% vs previous</span>
          </div>
        )}
        {subtext && <div className="text-slate-400 text-xs mt-1">{subtext}</div>}
      </div>
    </Card>
  );
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }> = ({ variant = 'primary', className = '', ...props }) => {
  const base = "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-200",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200",
  };
  
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
};
