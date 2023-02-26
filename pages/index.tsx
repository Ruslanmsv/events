import { GetStaticProps, NextPage } from "next";
import { EventList } from "@/components/events/event-list";
import { getFeaturedEvents, EventDataType } from "@/server/events-data";

interface HomePageProps {
  events: EventDataType;
}

const HomePage: NextPage<HomePageProps> = ({ events }) => {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <ul>
        <EventList items={events} />
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};

export default HomePage;
