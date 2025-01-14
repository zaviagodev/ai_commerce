import { Outlet } from 'react-router-dom';
import { SettingsNav } from '../components/settings-nav';

export function SettingsPage(){
  return (
    <div className="space-y-6">
      <div className='-mx-6 py-3 px-6 sticky top-0 z-10 pt-14'>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your store settings and configurations
        </p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SettingsNav />
        </aside>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}