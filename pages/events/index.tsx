import { useRouter } from "next/router";
import { GetStaticProps } from "next";

import EventsSearch from "@/components/events/events-search";
import { EventList } from "@/components/events/event-list";

import { getAllEvents, EventDataType } from "@/server/events-data";

interface AllEventsPageProps {
  events: EventDataType;
}

export default function AllEventsPage({ events }: AllEventsPageProps) {
  // const events = getAllEvents();
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

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
      revalidate: 1800,
    },
  };
};
