import { Outlet } from 'react-router-dom';
import { SettingsNav } from '../components/settings-nav';
import { useTranslation } from '@/lib/i18n/hooks';

export function SettingsPage() {
  const t  = useTranslation();

  return (
    <div className="space-y-6">
      <div className='-mx-6 py-3 px-6 sticky top-0 z-10 pt-14'>
        <h1 className="text-2xl font-semibold">{t.settings.settings.title}</h1>
        <p className="text-sm text-muted-foreground">
          {t.settings.settings.description}
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