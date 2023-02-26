import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { EventList } from "@/components/events/event-list";

import { getFilteredEvents, EventDataType } from "@/server/events-data";

interface FilteredEventsPageProps {
  events: EventDataType;
  hasError?: string;
}

export default function FilteredEventsPage({
  events,
  hasError,
}: FilteredEventsPageProps) {
  const router = useRouter();

  if (hasError) {
    return <p className="center">{hasError}</p>;
  }

  return (
    <>
      <h1>Filtered Events Page</h1>
      <EventList items={events} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;

  const numYear = +slug![0];
  const numMonth = +slug![1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: "Invalid filter!",
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    // return <p className="center">No events found for the chosen filter</p>;
    return {
      props: {
        hasError: "No events found for the chosen filter",
      },
    };
  }

  return {
    props: {
      events: filteredEvents,
    },
  };
};
