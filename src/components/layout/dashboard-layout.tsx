import * as React from 'react';
import { useAuth } from '@/lib/auth/auth-hooks';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useProducts } from '@/features/products/hooks/use-products';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  UserCircle,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { DeveloperModeProvider } from '@/lib/developer-mode';
import { DeveloperSwitch } from '@/components/developer/developer-switch';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

function getBreadcrumbItems(pathname: string, productName?: string) {
  const segments = pathname.split('/').filter(Boolean);
  const items = [];

  if (segments[0] === 'dashboard') {
    if (segments[1]) {
      const section =
        segments[1].charAt(0).toUpperCase() + segments[1].slice(1);
      items.push({
        title: section,
        href: `/dashboard/${segments[1]}`,
        current: segments.length === 2,
      });

      if (segments[2]) {
        let title;
        if (segments[2] === 'new') {
          title = `New ${section.slice(0, -1)}`;
        } else if (productName) {
          title = `${productName} - Edit Product`;
        } else {
          title = `Edit ${section.slice(0, -1)}`;
        }

        items.push({
          title,
          current: true,
        });
      }
    }
  }

  return items;
}

function getNavItems(currentPath: string) {
  return [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
      isActive: currentPath === '/dashboard',
    },
    {
      title: 'Products',
      url: '/dashboard/products',
      icon: Package,
      isActive: currentPath.startsWith('/dashboard/products'),
    },
    {
      title: 'Customers',
      url: '/dashboard/customers',
      icon: Users,
      isActive: currentPath.startsWith('/dashboard/customers'),
    },
    {
      title: 'Orders',
      url: '/dashboard/orders',
      icon: ShoppingCart,
      isActive: currentPath.startsWith('/dashboard/orders'),
    },
    {
      title: 'Profile',
      url: '/dashboard/profile',
      icon: UserCircle,
      isActive: currentPath.startsWith('/dashboard/profile'),
    },
  ];
}

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { products } = useProducts();
  const segments = location.pathname.split('/').filter(Boolean);
  const productId = segments[2];
  const product = products.find((p) => p.id === productId);
  const breadcrumbItems = getBreadcrumbItems(location.pathname, product?.name);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <DeveloperModeProvider>
      <SidebarProvider>
        {/* <AppSidebar
          user={{
            name: user?.fullName || '',
            email: user?.email || '',
            storeName: user?.storeName || '',
          }}
          navItems={getNavItems(location.pathname)}
          onLogout={handleLogout}
        /> */}
        <div className="min-h-screen w-full bg-[rgb(245,245,245)]">
          <div className="flex h-screen">
            <AppSidebar />
            <SidebarInset className="flex-1 min-w-0 transition-all duration-300 ease-in-out relative">
              <div className="m-2 h-[calc(100vh-1rem)] rounded-[18px] bg-white border border-[rgb(229,230,235)] overflow-hidden flex flex-col relative">
                <div className="flex-1 rounded-xl bg-[#F3F2F7] overflow-hidden flex flex-col">
                  <header className="flex h-14 shrink-0 items-center justify-between px-6 border-b border-[rgb(229,230,235)]">
                    <div className="flex items-center gap-2">
                      <SidebarTrigger className="-ml-1" />
                      <Breadcrumb>
                        <BreadcrumbList>
                          {breadcrumbItems.map((item, index, array) => (
                            <React.Fragment key={item.title}>
                              <BreadcrumbItem>
                                {item.current ? (
                                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                ) : (
                                  <BreadcrumbLink href={item.href}>
                                    {item.title}
                                  </BreadcrumbLink>
                                )}
                              </BreadcrumbItem>
                              {index < array.length - 1 && (
                                <BreadcrumbSeparator />
                              )}
                            </React.Fragment>
                          ))}
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>
                    <DeveloperSwitch />
                  </header>
                  <div className="content-area w-full px-6 overflow-hidden top-[-56px] mb-[-56px] pb-6">
                    <Outlet />
                  </div>
                </div>
              </div>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </DeveloperModeProvider>
  );
}
