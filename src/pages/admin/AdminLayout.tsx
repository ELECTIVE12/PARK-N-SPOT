import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../../components/footer';
import Logo from "../../components/Logo/logo.png";
import { 
  LayoutDashboard, 
  Users, 
  CircleUserRound,
  BarChart3, 
  AlertTriangle, 
  LogOut, 
} from 'lucide-react';
import { motion } from 'motion/react';


interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Complaints', path: '/admin/complaints', icon: AlertTriangle },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/admin/login');
  };

  return (
    <div className="bg-background text-on-surface flex min-h-screen">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-high flex flex-col py-8 space-y-6 z-40 border-r border-outline-variant/10">
       <div className="text-center mb-12">
            <div className="relative inline-block">
              <img src={Logo} alt="Logo" className="w-26 h-26 object-contain" />
              <Link to="/user/aboutus" className="text-2xl font-bold tracking-tight text-on-surface font-headline absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-1 whitespace-nowrap">Park 'n Spot</Link>
            </div>
        </div>

        {/* Profile section */}
        <div className="px-8 flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-surface-container-low overflow-hidden">
            <CircleUserRound className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-on-surface font-bold text-sm font-headline">Admin</p>
            <p className="text-on-surface-variant text-xs font-body">Facility Lead</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 py-3 transition-all pl-5 ${
                  isActive 
                    ? 'text-on-surface font-bold border-l-4 border-primary bg-surface-container-low' 
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-primary' : ''} />
                <span className="font-medium text-sm font-body">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-8 py-4 border-t border-outline-variant/10">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 py-3 mt-4 text-on-surface-variant hover:text-primary transition-colors w-full text-left bg-transparent border-none cursor-pointer"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm font-body">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Stage */}
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center w-full px-8 py-4 shadow-[0_12px_40px_rgba(27,28,25,0.06)]">
          <div className="flex items-center space-x-8">
            <h2 className="text-xl font-bold tracking-tight text-on-surface font-headline">{title}</h2>
          </div>
        </header>

        {/* Canvas Area */}
        <div className="p-8 space-y-8 flex-1">
          {children}
        </div>
       <Footer />
      </main>
    </div>
  );
}
