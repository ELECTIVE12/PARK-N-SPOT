import React, { useState } from 'react';
import { Footer } from '../../components/footer'
import Logo from "../../components/Logo/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { Lock, PersonStanding, ArrowRight, Eye, EyeOff } from 'lucide-react';

export function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAdminLoggedIn', 'true');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/admin/dashboard');
  };

  return (
    <div className="bg-surface text-on-surface flex flex-col min-h-screen p-6 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-surface-container-low rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-secondary-container opacity-20 rounded-full blur-[100px]"></div>
      </div>

      {/* Login Container */}
      <main className="relative z-10 w-full max-w-md mx-auto flex-1 flex items-center">
        <div className="w-full">
          {/* Brand Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <img src={Logo} alt="Logo" className="w-46 h-46 object-contain" />
            <h1 className="text-5xl font-bold tracking-tight text-on-surface font-headline absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-1 whitespace-nowrap">Park 'n Spot</h1>
          </div>
          <p className="text-on-surface-variant font-medium tracking-tight font-body mt-3">Admin Access Portal</p>
        </div>
          {/* Login Card */}
          <div className="bg-surface-container-lowest shadow-[0_12px_40px_rgba(27,28,25,0.06)] rounded-xl p-10 backdrop-blur-md border border-outline-variant/10">
            <h2 className="text-xl font-bold text-on-surface mb-8 font-headline">Admin Authorization</h2>
            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline" htmlFor="username">Email</label>
                <div className="relative">
                  <PersonStanding size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input 
                    className="w-full bg-surface-container-high border-none focus:ring-1 focus:ring-primary text-sm pl-12 py-4 rounded-sm placeholder:text-on-surface-variant/40 transition-all font-body text-on-surface" 
                    id="username" 
                    placeholder="admin@gmail.com" 
                    type="text" 
                    required
                  />
                </div>
              </div>
              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline" htmlFor="password">Password</label>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input 
                    className="w-full bg-surface-container-high border-none focus:ring-1 focus:ring-primary text-sm pl-12 pr-12 py-4 rounded-sm placeholder:text-on-surface-variant/40 transition-all font-body text-on-surface" 
                    id="password" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"} 
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {/* Primary Action */}
              <div className="pt-4">
                <button className="w-full bg-primary-container text-secondary-container py-5 rounded-sm font-bold tracking-tight text-sm flex items-center justify-center space-x-2 hover:bg-primary-container transition-all active:scale-[0.98] shadow-lg shadow-primary/20 border-none cursor-pointer font-headline" type="submit">
                  <span>Log In</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>        
          </div>
        </div>
      </main>
      
      <Footer/>
    </div>
  );
}