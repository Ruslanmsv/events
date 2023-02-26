import { ReactNode } from "react";
import { EventItem } from "@/components/events/event-item";
import { EventDataType } from "@/server/events-data";
import classes from "./event-list.module.css";

interface EventListProps {
  items: EventDataType;
  children?: ReactNode;
}

export const EventList = ({ items }: EventListProps) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem key={event.id} {...event} />
      ))}
    </ul>
  );
};
