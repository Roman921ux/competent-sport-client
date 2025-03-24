import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ruLocale from "@fullcalendar/core/locales/ru";
import { useCalendarContext } from "@/app/providers/update-size-calendar-context";
import { useSidebar } from "@/shared/shadcn-ui/components/ui/sidebar";
import { useEffect } from "react";

const events = [
  {
    id: "1",
    title: "Тренировка 1",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    color: "green",
    description: "Кардио и силовая нагрузка",
  },
  {
    id: "3",
    title: "Тренировка 12",
    start: new Date(new Date().setDate(new Date().getDate() + 5)), // Через 2 дня
    backgroundColor: "blue",
    textColor: "white",
  },
  {
    id: "2",
    title: "Тренировка 5",
    start: new Date(new Date().setDate(new Date().getDate() + 5)), // Через 2 дня
    backgroundColor: "blue",
    textColor: "white",
  },
  {
    id: "4",
    title: "Тренировка 3",
    start: new Date(new Date().setDate(new Date().getDate() + 5)), // Через 2 дня
    backgroundColor: "blue",
    textColor: "white",
  },
  {
    id: "5",
    title: "Тренировка 4",
    start: new Date(new Date().setDate(new Date().getDate() + 5)), // Через 2 дня
    backgroundColor: "blue",
    textColor: "white",
  },
];

export default function Calendar() {
  const useCalendar = useCalendarContext();
  const sidebar = useSidebar();

  useEffect(() => {
    setTimeout(() => {
      useCalendar?.updateSize();
    }, 500);
  }, [sidebar.open]);

  return (
    <div>
      <FullCalendar
        ref={useCalendar?.fullCalendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={ruLocale}
        height="80vh"
        headerToolbar={false}
        // здесь можно в состоянии хранить булево значение и спрашивать скрывать панель или нет
        // {showHeader ? {} : false}
        // hiddenDays={[0, 6]}
        events={events}
        eventContent={(arg) => (
          <div
            className="w-full max-w-40 overflow-hidden"
            style={{
              padding: "2px 12px",
              background: "rgba(1,1,1, 0.05)",
              borderRadius: "5px",
            }}
          >
            {arg.event.title}
          </div>
        )}
      />
    </div>
  );
}
