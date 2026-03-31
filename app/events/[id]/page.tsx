import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import { IEvent } from "@/models/Event";
import { CalendarDays } from "lucide-react";
import Image from "next/image";

interface IAgenda {
  title: string;
  day: string;
  time: string;
}

const BASE_URL = `${process.env.NEXT_PULBLIC_BASE_URL}/api/events/`;

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul className="flex flex-wrap items-center gap-2">
      {agendaItems.map(({ title, day, time }, index: number) => (
        <Item
          key={index}
          variant="outline"
          className="flex items-center justify-center mt-2 w-[250px] border-gray-700 border"
        >
          <ItemMedia variant="icon">
            <CalendarDays />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{title}</ItemTitle>
            <ItemDescription>
              {day} {time}
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const response = await fetch(`${BASE_URL}${id}`);
  const { data } = await response.json();

  return (
    <section id="event">
      <div className="header mt-4">
        <h1>{data.title}</h1>
      </div>
      <section className="flex items-center gap-2">
        {data.tags.length > 1 &&
          data.tags.map((tag: string, index: number) => (
            <Badge key={index}>{tag}</Badge>
          ))}
      </section>
      <section className="flex items-center gap-x-20 my-5">
        <div className="flex flex-col gap-2">
          <h6>Date</h6>
          <p>{data.date.slice(0, 10)}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h6>Capacity</h6>
          <p>{data.capacity}</p>
        </div>
      </section>
      <div className="details">
        <div className="content">
          <Image
            src={data.image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{data.overview}</p>
          </section>

          {data.agenda.length > 1 && <EventAgenda agendaItems={data.agenda} />}

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={`${data.location}`}
            />
          </section>
        </div>
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            <BookEvent />
          </div>
        </aside>
      </div>
    </section>
  );
};

export default page;
