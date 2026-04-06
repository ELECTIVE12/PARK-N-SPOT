import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Settings2, Home, History, FileText, User, Map as MapIcon, Wallet, LogOut } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Map', path: '/explore' },
    { name: 'History', path: '/history' },
    { name: 'Report', path: '/report' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav flex justify-between items-center px-8 h-20">
      <div className="flex items-center gap-8">
        <Link to="/home" className="text-xl font-headline font-extrabold tracking-tighter text-[#330000]">
          Park 'N Spot
        </Link>
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-headline font-bold tracking-tight transition-colors duration-300 uppercase tracking-widest",
                location.pathname === item.path 
                  ? "text-[#330000] border-b-2 border-[#330000]" 
                  : "text-on-surface-variant hover:text-primary-container"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <Bell size={20} />
        </button>
        <button 
          onClick={handleLogout}
          className="p-2 text-on-surface-variant hover:text-error transition-colors flex items-center gap-2"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
        <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9Hcla8EkRASSPQ318THjinKC3MLaLENd78ZF_wUVxqrycfFIbCxJiGHLgMHMMUbWTGx8ekV9xnIIVZEox1jvesAhOP50NL-dROHCpO-SKwnJJRG7T1xAwaZvZ3jvpXYf6JC-ghgE9erC1hsP4XSGBbyb4r1zrBSMtt_eksv6-umaz-_jkGfAuRr73L7xVYH6BajB6GeXyPUIBj5DJXdECd2BJTLiU2bH8tJT-zE_VblG_U4pwRlSVp-FzRT_q8Mx3hII_FSSTHcXg" 
            alt="Profile"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </Link>
      </div>
    </nav>
  );
}

export function BottomNav() {
  const location = useLocation();
  
  const items = [
    { name: 'Explore', path: '/explore', icon: MapIcon },
    { name: 'History', path: '/history', icon: History },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 glass-nav flex justify-around items-center px-6 pb-safe z-50 rounded-t-xl shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center transition-all",
              isActive ? "text-[#330000] scale-110" : "text-on-surface-variant opacity-60"
            )}
          >
            <Icon size={24} fill={isActive ? "currentColor" : "none"} />
            <span className="text-[11px] font-semibold tracking-wide mt-1">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="py-12 bg-surface-container-low border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6">
        <span className="font-headline font-bold text-xl tracking-tighter text-[#330000]">Park 'N Spot</span>
        <div className="flex gap-8">
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">Privacy</a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">Terms</a>
          <Link to="/admin/login" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">Admin Portal</Link>
        </div>
        <p className="text-on-surface-variant text-xs opacity-60">© 2026 Park 'N Spot. Computer Engineering Students. All rights reserved.</p>
      </div>
    </footer>
  );
}
