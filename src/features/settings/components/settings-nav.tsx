import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Store, 
  CreditCard, 
  Bell, 
  Users, 
  Mail, 
  Settings,
  Palette,
  Shield,
  Globe,
} from 'lucide-react';

const navItems = [
  {
    title: 'E-commerce',
    href: '/dashboard/settings/ecommerce',
    icon: Store,
  },
  {
    title: 'Payments',
    href: '/dashboard/settings/payments',
    icon: CreditCard,
  },
  {
    title: 'Theme',
    href: '/dashboard/settings/theme',
    icon: Palette,
  },
  // {
  //   title: 'Notifications',
  //   href: '/dashboard/settings/notifications',
  //   icon: Bell,
  // },
  // {
  //   title: 'Team',
  //   href: '/dashboard/settings/team',
  //   icon: Users,
  // },
  // {
  //   title: 'Email',
  //   href: '/dashboard/settings/email',
  //   icon: Mail,
  // },
  // {
  //   title: 'Appearance',
  //   href: '/dashboard/settings/appearance',
  //   icon: Palette,
  // },
  // {
  //   title: 'Security',
  //   href: '/dashboard/settings/security',
  //   icon: Shield,
  // },
  // {
  //   title: 'Domains',
  //   href: '/dashboard/settings/domains',
  //   icon: Globe,
  // },
  // {
  //   title: 'Advanced',
  //   href: '/dashboard/settings/advanced',
  //   icon: Settings,
  // },
];

export function SettingsNav() {
  return (
    <nav className="space-y-1 sticky top-[145px]">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-darkgray/10',
              isActive ? 'bg-darkgray/10' : 'transparent'
            )
          }
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}