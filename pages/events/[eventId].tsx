import { useRouter } from "next/router";

import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";

import {
  getEventById,
  EventItemType,
  getFeaturedEvents,
} from "@/server/events-data";

import { GetStaticProps } from "next";

interface EventDetailPageProps {
  event: EventItemType;
}

export default function EventDetailPage({ event }: EventDetailPageProps) {
  const router = useRouter();

  if (!event) {
    return <p>No event found!</p>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();

  return {
    paths: events.map((event) => ({
      params: {
        eventId: event.id,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context.params?.eventId;

  const event = await getEventById(eventId as string);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 300,
  };
};
