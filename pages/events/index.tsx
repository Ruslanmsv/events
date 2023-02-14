import { getAllEvents } from "@/dummy-data";
import EventsSearch from "@/components/events/events-search";
import { EventList } from "@/components/events/event-list";
import { useRouter } from "next/router";

export default function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year: string, month: string) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />;
    </>
  );
}
