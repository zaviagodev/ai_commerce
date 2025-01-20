import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface FeaturedApp {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
}

interface FeaturedAppsProps {
  apps: FeaturedApp[];
}

export function FeaturedApps({ apps }: FeaturedAppsProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-4 py-4">
        {apps.map((app) => (
          <Link key={app.id} to={`/dashboard/apps-store/${app.id}`}>
            <Card
              className="group relative aspect-[2/1] w-[600px] shrink-0 overflow-hidden rounded-xl"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity group-hover:opacity-100"
                style={{ background: app.color }}
              />
              <div className="absolute inset-0 p-6 text-main">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{app.name}</h3>
                    <p className="mt-2 text-lg text-main/90">{app.description}</p>
                  </div>
                </div>
              </div>
              <img
                src={app.image}
                alt={app.name}
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </Card>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}