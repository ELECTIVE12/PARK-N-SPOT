import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Settings2, Home, History, FileText, User, Map as MapIcon, Wallet, LogOut, LayoutGrid } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import profile from "./images/profile.jpg";
import { useEffect, useState } from "react";


export function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [hasUnread, setHasUnread] = React.useState(true);

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
        <Link to="/home" className="text-xl font-headline font-extrabold  ml-8 tracking-tighter text-[#330000]">
          Park ‘n Spot
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

      <div className="relative flex items-center gap-4">
        <button
          onClick={() => setOpen(!open)}
          className=" relative p-2 text-on-surface-variant hover:text-primary transition-colors">
          <Bell size={20} />
          {hasUnread && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>


        {open && (
          <div className="absolute right-0 top-12 w-64 bg-white shadow-md rounded-md p-3">
            <p className="text-sm text-[#330000] font-semibold mb-2">Notifications</p>
            <div className="text-sm border-b pb-2 mb-2">
              New update available
            </div>
            <div className="text-sm border-b pb-2 mb-2">
              Parking data updated
            </div>
            <div
              onClick={() => {
                setHasUnread(false);
                setOpen(false);
              }}
              className="text-sm text-[#330000] text-center cursor-pointer">
              Mark all as read
            </div>
          </div>
        )}
        <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20">
          <img
            src={profile}
            alt="profile picture"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </Link>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="py-8 bg-surface-container-low border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6">
        <header className="flex items-center gap-3 mb-4 ml-15">
          <h1 className="font-headline font-black text-2xl tracking-tighter text-primary text-[#330000]">Park ‘n Spot</h1>
        </header>
        <p className="text-on-surface-variant font-bold uppercase text-center tracking-[0.3em] text-[10px] opacity-70 font-body">© 2026 Park ‘n Spot. Computer Engineering Students. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function BottomNav() {
  const location = useLocation();
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

      setHideNav(atBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const items = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Explore', path: '/explore', icon: MapIcon },
    { name: 'History', path: '/history', icon: History },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Report', path: '/report', icon: FileText },
  ];

 return (
    <nav
      className={cn(
        "md:hidden fixed bottom-0 left-0 w-full h-20 glass-nav flex justify-around items-center px-6 pb-safe z-50 rounded-t-xl shadow-2xl transition-all duration-300",
        hideNav ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      )}
    >
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
            <span className="text-[11px] font-semibold tracking-wide mt-1">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

