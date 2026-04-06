import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  AlertTriangle, 
  LogOut, 
  Search, 
  Bell, 
  HelpCircle 
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
    navigate('/admin/login');
  };

  return (
    <div className="bg-background text-on-surface flex min-h-screen">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col py-8 space-y-6 z-40 border-r border-outline-variant/10">
        <div className="px-8 mb-4">
          <Link to="/admin/dashboard" className="font-black tracking-tighter text-on-surface text-2xl font-headline">
            Park 'N Spot
          </Link>
        </div>

        {/* Profile section */}
        <div className="px-8 flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
            <img 
              alt="System Curator" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACVBnlOVyyr1znSmg_cNozPlTN_AxqNfNWMBeNLSXvx3grpl-gkZOX2JvVi0NoSSjmJZ7GSKl9x9Xtf-R8ENFr-peW1x5H0NtJIcIgfHZQ9f-Ph-7lO7ZJ33PskFRQoGzhibHt9eKnhWqzsjssBCjUaRNgw4CMq3O3VAM30FRlSGocpf6QfzcYVbjpYJ_RD3fqRWH3XCCmyz9-MqDW5Q6doME_GcVC3P85yKbUA7tI8llDessme1MCoELq7SD-3fkB2aKcrdKJg9zT"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="text-on-surface font-bold text-sm font-headline">The Curator</p>
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
                    ? 'text-on-surface font-bold border-l-4 border-primary bg-surface-container-high/50' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
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
            <div className="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/10">
              <Search size={16} className="text-on-surface-variant mr-2" />
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder-on-surface-variant text-on-surface font-body" 
                placeholder="Search reports..." 
                type="text" 
              />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer">
              <Bell size={20} />
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer">
              <HelpCircle size={20} />
            </button>
          </div>
        </header>

        {/* Canvas Area */}
        <div className="p-8 space-y-8 flex-1">
          {children}
        </div>

        <footer className="p-8 pt-0 text-center text-xs text-on-surface-variant border-t border-outline-variant/10 mt-auto flex justify-center items-center">
          <p className="font-body">© 2026 computer engineering students</p>
        </footer>
      </main>
    </div>
  );
}
