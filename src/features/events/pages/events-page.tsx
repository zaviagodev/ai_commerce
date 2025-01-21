import { EventTicketList } from "../components/event-ticket-list";
import { useEvents } from "../hooks/use-events";

export function EventsPage() {
  const { events, isLoading } = useEvents();

  return <EventTicketList events={events} isLoading={isLoading} />;
}
