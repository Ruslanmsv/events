import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { EventList } from "@/components/events/event-list";
import { getFeaturedEvents, EventDataType } from "@/server/events-data";

interface HomePageProps {
  events: EventDataType;
}

const HomePage: NextPage<HomePageProps> = ({ events }) => {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>NextJS Events Projects</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
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
