import { z } from 'zod';

const EventSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    location: z.string(),
    date: z.string(),
    image: z.string(),
    isFeatured: z.boolean(),
});

export type EventItemType = z.infer<typeof EventSchema>;
export type EventDataType = EventItemType[];


const API_ROUTE = 'https://nextjs-course-f0bb2-default-rtdb.europe-west1.firebasedatabase.app/events.json';

export const getAllEvents = async (): Promise<EventDataType> => {
    const res = await fetch(API_ROUTE);
    const data = await res.json();
    const eventsList: EventItemType[] = [];

    for (const event in data.events) {
        eventsList.push(EventSchema.parse(data.events[event]));
    }

    return eventsList;
}

export const getFeaturedEvents = async (): Promise<EventDataType> => {
    const events = await getAllEvents();

    return events.filter((event) => event.isFeatured);

}


export const getFilteredEvents = async (dateFilter: { year: number, month: number }): Promise<EventDataType> => {
    const { year, month } = dateFilter;
    const events = await getAllEvents();

    let filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
        );
    });

    return filteredEvents;
}

export const getEventById = async (id: string): Promise<EventItemType | undefined> => {
    const events = await getAllEvents();
    return events.find((event) => event.id === id);
}
