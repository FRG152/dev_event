import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/event";
import { IEvent } from "@/models/Event";

const BASE_URL = process.env.NEXT_PULBLIC_BASE_URL;

export default async function Home() {
  const response = await fetch(`${BASE_URL}/api/events`);
  const { data } = await response.json();

  console.log(`${BASE_URL}/api/events`, data);
  return (
    <section>
      <h1 className="text-center mt-2">
        The Hub for Every <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Feature Events</h3>
        <ul className="events">
          {data.map((event: IEvent) => (
            <li key={event.slug}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
