import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from "react";
import FullCalendar from "@fullcalendar/react";
import { CalendarApi } from "@fullcalendar/core";

type CalendarContextProps = {
  updateSize: () => void;
  fullCalendarRef: React.MutableRefObject<FullCalendar | null>;
  calendarApiRef: React.MutableRefObject<CalendarApi | null>;
};

const CalendarContext = createContext<CalendarContextProps | null>(null);

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const fullCalendarRef = useRef<FullCalendar | null>(null);
  const calendarApiRef = useRef<CalendarApi | null>(null);

  useEffect(() => {
    if (fullCalendarRef.current) {
      // Записываем API календаря в календарный реф
      calendarApiRef.current = fullCalendarRef.current.getApi();
    }
  }, [fullCalendarRef]);

  const updateSize = () => {
    // Проверяем, есть ли API, и вызываем обновление
    if (calendarApiRef.current) {
      calendarApiRef.current.updateSize();
    }
  };
  return (
    <CalendarContext.Provider
      value={{ fullCalendarRef, calendarApiRef, updateSize }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  return useContext(CalendarContext);
};
