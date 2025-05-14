import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import ruLocale from "@fullcalendar/core/locales/ru";
import { useCalendarContext } from "@/app/providers/update-size-calendar-context";
import { useSidebar } from "@/shared/shadcn-ui/components/ui/sidebar";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TWorkoutDto } from "@/shared/types/workout";
import axiosInstance from "@/shared/api/axios-instance";
import { Button } from "@/shared/shadcn-ui/components/ui/button";

export default function Calendar({
  handleChangeWorkout,
}: {
  handleChangeWorkout: (workoutId: string) => void;
}) {
  const useCalendar = useCalendarContext();
  const sidebar = useSidebar();

  const { data: workouts } = useQuery({
    queryKey: ["user-workouts"],
    queryFn: async (): Promise<TWorkoutDto[]> => {
      const response = await axiosInstance.get("/workout");

      return response.data;
    },
  });
  // lib
  const adaptWorkoutsForCalendar = (workouts: TWorkoutDto[] | undefined) => {
    return workouts?.map((workout) => ({
      id: workout._id,
      title: workout.title,
      start: workout.date,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      useCalendar?.updateSize();
    }, 500);
  }, [sidebar.open]);

  const handlePrev = () => {
    if (useCalendar?.fullCalendarRef?.current) {
      useCalendar.fullCalendarRef.current.getApi().prev();
    }
  };
  const handleNext = () => {
    if (useCalendar?.fullCalendarRef?.current) {
      useCalendar?.fullCalendarRef.current.getApi().next();
    }
  };
  const handleToday = () => {
    if (useCalendar?.fullCalendarRef?.current) {
      useCalendar?.fullCalendarRef.current.getApi().today();
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <Button size="icon" variant="secondary" onClick={handlePrev}>
          ◀
        </Button>
        <Button size="sm" variant="secondary" onClick={handleToday}>
          Сегодня
        </Button>
        <Button size="icon" variant="secondary" onClick={handleNext}>
          ▶
        </Button>
      </div>

      <FullCalendar
        ref={useCalendar?.fullCalendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={ruLocale}
        height="80vh"
        // headerToolbar={{
        //   left: "prev,next today",
        //   center: "title",
        //   right: "dayGridMonth,dayGridWeek,dayGridDay",
        // }}
        // hiddenDays={[0, 6]}
        events={adaptWorkoutsForCalendar(workouts)}
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
        eventClick={(info) => {
          handleChangeWorkout(info.event.id);
        }}
        dateClick={(info) => {
          console.log("Дата клика:", info.dateStr);
        }}
      />
    </div>
  );
}
