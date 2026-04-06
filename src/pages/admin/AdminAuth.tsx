import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Castle, Lock, PersonStanding, Shield, Verified, ArrowRight } from 'lucide-react';

export function AdminLogin() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAdminLoggedIn', 'true');
    
    // Dispatch custom event to notify App.tsx
    window.dispatchEvent(new Event('auth-change'));
    
    navigate('/admin/dashboard');
  };
  return (
    <div className="bg-surface text-on-surface flex items-center justify-center min-h-screen p-6 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-surface-container-low rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-secondary-container opacity-20 rounded-full blur-[100px]"></div>
      </div>

      {/* Login Container */}
      <main className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-container rounded-full mb-6 shadow-xl">
            <Castle size={32} className="text-secondary-container" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-2 font-headline">Estate Sovereign</h1>
          <p className="text-on-surface-variant font-medium tracking-tight font-body">The Curator Access Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest shadow-[0_12px_40px_rgba(27,28,25,0.06)] rounded-xl p-10 backdrop-blur-md border border-outline-variant/10">
          <h2 className="text-xl font-bold text-on-surface mb-8 font-headline">Admin Authorization</h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline" htmlFor="username">Username / Email</label>
              <div className="relative">
                <PersonStanding size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input 
                  className="w-full bg-surface-container-high border-none focus:ring-1 focus:ring-primary text-sm pl-12 py-4 rounded-sm placeholder:text-on-surface-variant/40 transition-all font-body text-on-surface" 
                  id="username" 
                  placeholder="curator@sovereign.com" 
                  type="text" 
                  required
                />
              </div>
            </div>
            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline" htmlFor="password">Password</label>
                <a className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-on-secondary-container transition-colors font-headline" href="#">Forgot Credentials?</a>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input 
                  className="w-full bg-surface-container-high border-none focus:ring-1 focus:ring-primary text-sm pl-12 py-4 rounded-sm placeholder:text-on-surface-variant/40 transition-all font-body text-on-surface" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password" 
                  required
                />
              </div>
            </div>
            {/* Primary Action */}
            <div className="pt-4">
              <button className="w-full bg-primary text-on-primary py-5 rounded-sm font-bold tracking-tight text-sm flex items-center justify-center space-x-2 hover:bg-primary-container transition-all active:scale-[0.98] shadow-lg shadow-primary/20 border-none cursor-pointer font-headline" type="submit">
                <span>Log In</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
          {/* Secondary Actions */}
          <div className="mt-10 pt-8 border-t border-outline-variant/20 flex flex-col items-center space-y-4">
            <p className="text-xs text-on-surface-variant/60 text-center font-body">Restricted access for facility curators and system leads only.</p>
            <div className="flex justify-center space-x-6">
              <Link to="/admin/signup" className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors font-headline">Need an account?</Link>
              <a className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors font-headline" href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </main>

      {/* Visual Anchor: Tonal Side Bar */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-32 bg-surface-container-low z-[-1]"></div>
      
      {/* Footer Credit */}
      <footer className="fixed bottom-8 left-0 right-0 text-center pointer-events-none">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant opacity-30 font-body">© 2026 computer engineering students</p>
      </footer>
    </div>
  );
}

export function AdminSignUp() {
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // After successful signup, you might want to auto-login or just navigate to login
    navigate('/admin/login');
  };

  return (
    <div className="bg-surface text-on-surface flex flex-col min-h-screen relative overflow-hidden">
      <main className="flex-grow flex items-center justify-center px-4 py-16 relative z-10">
        {/* Aesthetic Architectural Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-container blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-container/20 blur-[120px]"></div>
        </div>

        {/* Centralized Sign-Up Card */}
        <div className="w-full max-w-md z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold tracking-tighter text-on-surface mb-2 font-headline">Estate Sovereign</h1>
            <p className="font-body text-on-surface-variant tracking-wide text-sm uppercase">Curating Operational Excellence</p>
          </div>
          <div className="bg-surface-container-low shadow-[0_12px_40px_rgba(27,28,25,0.06)] rounded-xl overflow-hidden border border-outline-variant/10">
            {/* Status Monument */}
            <div className="h-1.5 w-full bg-primary-container"></div>
            <div className="p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-on-surface font-headline">Create Account</h2>
                <p className="text-on-surface-variant text-sm mt-1 font-body">Begin your architectural management journey.</p>
              </div>
              <form className="space-y-5" onSubmit={handleSignUp}>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant font-headline" htmlFor="full_name">Full Name</label>
                  <input 
                    className="w-full px-4 py-3 bg-surface-container-high border-none focus:ring-1 focus:ring-outline text-on-surface text-sm transition-all duration-200 placeholder:text-outline/50 font-body" 
                    id="full_name" 
                    placeholder="Alexander Sovereign" 
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant font-headline" htmlFor="email">Email Address</label>
                  <input 
                    className="w-full px-4 py-3 bg-surface-container-high border-none focus:ring-1 focus:ring-outline text-on-surface text-sm transition-all duration-200 placeholder:text-outline/50 font-body" 
                    id="email" 
                    placeholder="curator@estate.com" 
                    type="email"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant font-headline" htmlFor="password">Password</label>
                    <input className="w-full px-4 py-3 bg-surface-container-high border-none focus:ring-1 focus:ring-outline text-on-surface text-sm transition-all duration-200 font-body" id="password" placeholder="••••••••" type="password" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant font-headline" htmlFor="confirm_password">Confirm</label>
                    <input className="w-full px-4 py-3 bg-surface-container-high border-none focus:ring-1 focus:ring-outline text-on-surface text-sm transition-all duration-200 font-body" id="confirm_password" placeholder="••••••••" type="password" required />
                  </div>
                </div>
                <div className="pt-4">
                  <button className="w-full bg-primary-container text-secondary-container font-headline font-bold py-4 rounded-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 border-none cursor-pointer shadow-lg" type="submit">
                    <span>Create Account</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
              <div className="mt-8 pt-8 border-t border-outline-variant/15 text-center">
                <p className="text-on-surface-variant text-sm font-body">
                  Already have an account? 
                  <Link to="/admin/login" className="text-primary font-bold hover:underline underline-offset-4 transition-all ml-1">Log In</Link>
                </p>
              </div>
            </div>
          </div>
          {/* Trust Badge */}
          <div className="mt-8 flex items-center justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <Shield size={20} />
              <span className="text-[10px] uppercase tracking-widest font-bold font-headline">Secure Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Verified size={20} />
              <span className="text-[10px] uppercase tracking-widest font-bold font-headline">Encrypted Data</span>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Component */}
      <footer className="w-full py-12 bg-surface-container-low flex flex-col items-center justify-center gap-4">
        <div className="flex flex-wrap justify-center gap-8 mb-2">
          <a className="font-body text-xs tracking-widest uppercase text-on-surface-variant hover:text-primary transition-opacity opacity-80 hover:opacity-100 hover:underline underline-offset-4" href="#">Privacy Policy</a>
          <a className="font-body text-xs tracking-widest uppercase text-on-surface-variant hover:text-primary transition-opacity opacity-80 hover:opacity-100 hover:underline underline-offset-4" href="#">Terms of Service</a>
          <a className="font-body text-xs tracking-widest uppercase text-on-surface-variant hover:text-primary transition-opacity opacity-80 hover:opacity-100 hover:underline underline-offset-4" href="#">Architecture Standards</a>
        </div>
        <p className="font-body text-xs tracking-widest uppercase text-on-surface-variant opacity-80">© 2026 computer engineering students</p>
      </footer>
    </div>
  );
}
