import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, RefreshCw, Eye, EyeOff, LayoutGrid } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '@/src/lib/store';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Try to find existing user or create one
    const user = store.loginUser(email, password);
    if (!user) {
      // Create a new user if not found
      store.registerUser(email.split('@')[0], email, password);
    }
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/explore');
  };

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row">
      <section className="relative w-full md:w-7/12 h-64 md:h-screen overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 z-10"></div>
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4ll7hIPz6tBURHnyxmXNLYdmrDu_WqcoVglisZbKmovK8Y-NxHZuKmKokF07hboUJ_t3sLq7elOUxA9-gSMxTTnrdLKTyF3FdICHj5WEn05UUlsGCYWx5EK2BPZnjKsbMh_h5GdTnBtOSXWHXSK0kDygp0NRmJ5MDY8gGtt2_xul1nXUTCoWram6YAJmG6hFvzg4yrQXatUIryhX9kJhjs8SyUg9DAwd9EEb_VughTyWWJ78bXJJFxG0Ll6vUWqvnT8lJHZW33ZxI" 
          alt="Architecture"
          className="w-full h-full object-cover grayscale contrast-125 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-12 left-12 z-20 hidden md:block">
          <div className="flex flex-col gap-2">
            <span className="text-white/60 font-headline tracking-[0.3em] uppercase text-[10px]">Curated Mobility</span>
            <h2 className="text-white font-headline text-4xl font-extrabold tracking-tighter max-w-xs leading-none uppercase">THE ARCHITECTURE OF ARRIVAL.</h2>
          </div>
        </div>
      </section>

      <section className="w-full md:w-5/12 min-h-[calc(100vh-16rem)] md:min-h-screen bg-surface flex flex-col justify-between p-8 md:p-16 lg:p-24 relative overflow-y-auto">
        <header className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-primary-container flex items-center justify-center text-secondary-container">
            <LayoutGrid size={24} fill="currentColor" />
          </div>
          <h1 className="font-headline font-black text-2xl tracking-tighter text-primary">Park 'N Spot</h1>
        </header>
        
        <div className="flex-grow flex flex-col justify-center max-w-md w-full mx-auto">
          <button 
              onClick={() => navigate('/aboutus')}
              className="flex items-center gap-4 text-primary/60 hover:text-primary transition-colors duration-200 group border-none bg-transparent cursor-pointer"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span className="font-headline font-bold uppercase text-[10px] tracking-widest">Back to About Us</span>
          </button>
          <div className="mb-10">
            <h2 className="font-headline text-5xl font-extrabold text-primary tracking-tight leading-tight mb-4">Enter the Spot</h2>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed max-w-sm">
              Access your reserved mobility portfolio and facility controls through our secure sovereign portal.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="font-headline text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">EMAIL</label>
              <input 
                className="w-full bg-surface-container-high border-none focus:ring-1 focus:ring-outline text-on-surface py-4 px-5 text-sm transition-all duration-300 placeholder:text-outline/50" 
                placeholder="name@estate.com" 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="font-headline text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">PASSWORD</label>
                <a className="text-[10px] font-headline uppercase tracking-widest text-secondary hover:text-primary transition-colors" href="#">Forgotten?</a>
              </div>
              <input 
                className="w-full bg-surface-container-high border-none focus:ring-1 focus:ring-outline text-on-surface py-4 px-5 text-sm transition-all duration-300 placeholder:text-outline/50" 
                placeholder="••••••••" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="pt-4 flex flex-col gap-6">
              <button 
                type="submit"
                className="w-full bg-primary py-5 text-on-primary border-none cursor-pointer font-headline font-bold text-sm tracking-[0.2em] uppercase hover:bg-primary-container transition-all duration-300 active:scale-[0.98] shadow-lg shadow-primary/10 text-center"
              >
                LOG IN
              </button>
              <button 
                type="button"
                onClick={handleLogin}
                className="w-full border border-outline-variant/50 py-4 text-on-surface font-headline font-semibold text-xs tracking-widest uppercase hover:bg-surface-container-low transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
                LOG IN WITH GOOGLE
              </button>
              
              <div className="text-center pt-2">
                <p className="text-on-surface-variant font-body text-xs tracking-wide">
                  New to the ecosystem? {' '}
                  <Link to="/signup" className="text-primary font-bold hover:underline decoration-secondary-container underline-offset-4 transition-all">
                    CREATE ACCOUNT
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        <footer className="mt-16 pt-8 border-t border-outline-variant/10 flex justify-center w-full">
          <p className="font-headline text-[10px] tracking-[0.2em] uppercase text-on-surface-variant opacity-60">
            © 2026 computer engineering students
          </p>
        </footer>
      </section>
    </main>
  );
}

export function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Register the user in the store
    store.registerUser(name, email, password);
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/verify');
  };

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-white min-h-screen flex flex-col">
      {/* Header Navigation Shell */}
      <header className="fixed top-0 w-full z-50 bg-[#fcf9f4]/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-8 py-6 w-full max-w-screen-2xl mx-auto">
          <Link to="/" className="text-2xl font-black tracking-tighter text-[#330000] font-headline">Park 'N Spot</Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/login" className="text-[#544340] font-body text-xs tracking-widest uppercase hover:opacity-80 transition-opacity">Already have an account?</Link>
            <button 
              onClick={() => navigate('/login')}
              className="bg-primary text-on-primary px-6 py-2 text-xs tracking-widest uppercase font-bold active:scale-95 duration-200 cursor-pointer border-none"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        {/* Asymmetric Bento-style Layout */}
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-0 shadow-[0_12px_40px_rgba(27,28,25,0.06)] bg-surface-container-lowest overflow-hidden">
          {/* Left Narrative Column (Futuristic Parking Visual) */}
          <div className="md:col-span-5 relative min-h-[400px] md:min-h-[700px] bg-primary overflow-hidden">
            <img 
              alt="Minimalist futuristic parking garage" 
              className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-luminosity" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJepRHUplR4zZzMg8vFMBOWaOMFzM7jaV_KyRdQ7tcsEHTHgZaZmGNoMi30yXHSqlQXuZ0qQM3aIeb-jhJ2ST6QMye-L1oKryIj-wuJWHP2g48dbxod4K92THCmMxAX-YKYkZGi8URYWCSz1RfhWdKW4eBSDQUV2oxmh_DfhuPIcKL0QptqJ-Nlr5mliloXy5CcjfiT55FesIwqaLQaS0InJdXfDncjQayyJ49udVYYyqe3vSrsLQUBPWOOmE_FYdNSXhKWREGWB_V"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-12 left-12 right-12 z-10">
              <div className="w-12 h-1 bg-secondary-container mb-6"></div>
              <h2 className="text-4xl font-extrabold text-on-primary tracking-tighter mb-4 leading-tight font-headline">Join the curated <br/>mobility ecosystem.</h2>
              <p className="text-on-primary-container font-light leading-relaxed max-w-xs font-body">Experience facility management reimagined through high-end architectural logic and tonal precision.</p>
            </div>
          </div>

          {/* Right Functional Column (The Form) */}
          <div className="md:col-span-7 bg-surface-container-low p-8 md:p-20 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <header className="mb-12">
                <h1 className="text-5xl font-black text-on-surface tracking-tighter font-headline">Sign Up</h1>
              </header>
              <form className="space-y-8" onSubmit={handleRegister}>
                {/* Name Field */}
                <div className="relative group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1" htmlFor="name">Full Name</label>
                  <input 
                    className="w-full bg-surface-container-high border-none border-b border-outline-variant focus:ring-0 focus:border-primary px-4 py-4 text-on-surface placeholder:text-on-surface-variant/40 transition-all font-body" 
                    id="name" 
                    placeholder="E.g. Julian Vayne" 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* Email Field */}
                <div className="relative group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1" htmlFor="email">Email</label>
                  <input 
                    className="w-full bg-surface-container-high border-none border-b border-outline-variant focus:ring-0 focus:border-primary px-4 py-4 text-on-surface placeholder:text-on-surface-variant/40 transition-all font-body" 
                    id="email" 
                    placeholder="julian@architecture.io" 
                    type="email"
                    required
                  />
                </div>
                {/* Password Field */}
                <div className="relative group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1" htmlFor="password">Password</label>
                  <div className="relative">
                    <input 
                      className="w-full bg-surface-container-high border-none border-b border-outline-variant focus:ring-0 focus:border-primary px-4 py-4 text-on-surface placeholder:text-on-surface-variant/40 transition-all font-body" 
                      id="password" 
                      placeholder="••••••••" 
                      type={showPassword ? "text" : "password"}
                      required
                    />
                    <button 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer border-none bg-transparent" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                {/* Terms & Conditions */}
                <div className="flex items-start space-x-3 pt-4">
                  <div className="flex items-center h-5">
                    <input className="h-4 w-4 rounded-sm border-outline-variant text-primary focus:ring-0" id="terms" name="terms" type="checkbox" required />
                  </div>
                  <div className="text-xs text-on-surface-variant font-light font-body">
                    <label htmlFor="terms">I agree to the <a className="text-primary font-semibold underline decoration-secondary-container underline-offset-4" href="#">Governance Protocols</a> and architectural standards of the Park 'N Spot ecosystem.</label>
                  </div>
                </div>
                {/* CTA */}
                <div className="pt-8">
                  <button className="group relative w-full bg-primary text-on-primary py-5 font-bold tracking-[0.2em] uppercase text-xs transition-all active:scale-[0.98] overflow-hidden cursor-pointer border-none" type="submit">
                    <span className="relative z-10">Register</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-container transition-transform group-hover:scale-105 duration-500"></div>
                  </button>
                </div>
              </form>
              <div className="mt-12 flex items-center justify-between text-[10px] tracking-widest uppercase font-bold text-on-surface-variant opacity-50">
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="w-full py-12 bg-surface">
        <div className="flex flex-col items-center justify-center w-full px-4">
          <p className="font-body text-xs tracking-widest uppercase text-[#544340] text-center">
            © 2026 computer engineering students
          </p>
        </div>
      </footer>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-secondary-container/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-primary-container/5 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}

export function Verify() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col architectural-bg">
      {/* Top Navigation */}
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-8">
        <Link to="/" className="text-xl font-headline font-extrabold tracking-tighter text-primary uppercase">
          Park 'N Spot
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 py-12">
        {/* Confirmation Card */}
        <div className="max-w-xl w-full bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] p-10 md:p-16 relative overflow-hidden">
          {/* Status Monument */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
          
          <div className="flex flex-col items-start gap-10">
            <button 
              onClick={() => navigate('/signup')}
              className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors duration-200 group border-none bg-transparent cursor-pointer"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span className="font-headline font-bold uppercase text-[10px] tracking-widest">Back to Sign Up</span>
            </button>

            {/* Icon and Heading Group */}
            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 bg-surface-container-low flex items-center justify-center">
                  <Mail size={30} className="text-primary" />
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tight leading-tight text-primary">
                  Verify your<br/>parking profile.
                </h1>
                <p className="text-on-surface-variant text-lg leading-relaxed font-normal font-body">
                  We've sent a secure confirmation link to your email. Click the link to activate your premium parking access.
                </p>
              </div>
            </div>

            {/* Action Group */}
            <div className="w-full space-y-8">
              <div className="flex flex-col gap-3">
                <p className="text-on-surface-variant/70 text-sm font-medium tracking-wide font-body">Didn't receive the email?</p>
                <button className="text-primary font-headline font-bold flex items-center gap-2 hover:opacity-60 transition-opacity w-fit border-none bg-transparent cursor-pointer">
                  <span className="tracking-tight uppercase text-xs">Resend Link</span>
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Refined Footer */}
      <footer className="w-full py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-on-surface-variant/60">
            © 2026 computer engineering students
          </p>
        </div>
      </footer>
    </div>
  );
}
