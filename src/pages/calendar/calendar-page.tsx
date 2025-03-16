import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import ruLocale from "@fullcalendar/core/locales/ru";

export default function CalendarPage() {
  const events = [
    {
      id: "1",
      title: "Тренировка",
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      color: "green",
      description: "Кардио и силовая нагрузка",
    },
    {
      id: "3",
      title:
        "Встреча с командой, и тут например очень большое, длинной название",
      start: new Date(new Date().setDate(new Date().getDate() + 5)), // Через 2 дня
      backgroundColor: "blue",
      textColor: "white",
    },
    {
      id: "2",
      title: "Встреча с командой",
      start: new Date(new Date().setDate(new Date().getDate() + 5)), // Через 2 дня
      backgroundColor: "blue",
      textColor: "white",
    },
    {
      id: "4",
      title:
        "Встреча с командой, и тут например очень большое, длинной название",
      start: new Date(new Date().setDate(new Date().getDate() + 5)), // Через 2 дня
      backgroundColor: "blue",
      textColor: "white",
    },
    {
      id: "5",
      title:
        "Встреча с командой, и тут например очень большое, длинной название",
      start: new Date(new Date().setDate(new Date().getDate() + 5)), // Через 2 дня
      backgroundColor: "blue",
      textColor: "white",
    },
  ];
  return (
    <div className="grid grid-cols-3 px-4">
      <div className="col-span-1">df</div>
      <div className="relative col-span-2">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={ruLocale}
          height="80vh"
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
        />{" "}
      </div>
    </div>
  );
}
