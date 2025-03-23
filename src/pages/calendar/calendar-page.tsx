import Calendar from "@/widgets/calendar";
import ExerciseList from "@/widgets/exercise-list";

export default function CalendarPage() {
  return (
    <div className="grid grid-cols-3 gap-4 px-4">
      <div className="col-span-1">
        <ExerciseList />
      </div>
      <div className="relative col-span-2">
        <Calendar />
      </div>
    </div>
  );
}
