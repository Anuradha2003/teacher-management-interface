'use client'

import { Home, Users, Calendar, Settings, BookOpen, CreditCard, Menu } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Teachers', href: '/teachers' },
  { icon: Users, label: 'Students', href: '/students' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: CreditCard, label: 'Payments', href: '/payments' },
  { icon: Settings, label: 'Settings', href: '/settings' }
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();
  
  return (
    <aside className={`h-screen ${expanded ? 'w-64' : 'w-16'} bg-gray-900 text-white flex flex-col transition-all duration-300`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {expanded && <h1 className="text-xl font-bold">TeacherHub</h1>}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-md hover:bg-gray-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <nav className="space-y-1 p-2 flex-1">
        {navItems.map((item, index) => (
          <Link 
            key={index}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-800 transition-colors ${
              pathname === item.href ? 'bg-gray-800' : ''
            }`}
          >
            <item.icon size={20} />
            {expanded && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">A</span>
          </div>
          {expanded && (
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-gray-400">admin@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}