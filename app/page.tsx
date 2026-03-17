import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/events";

export default function Home() {
  return (
    <section>
      <h1 className="text-center mt-2">The Hub for Every <br /> Event You Can't Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
      <ExploreBtn/>
      <div className="mt-20 space-y-7">
        <h3>Feature Events</h3>
        <ul className="events">
          {events.map((event) => (
            <li key={event.slug}>
              <EventCard {...event}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
