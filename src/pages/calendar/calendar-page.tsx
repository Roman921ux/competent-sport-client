import Calendar from "@/widgets/calendar";
import ExerciseList from "@/widgets/exercise-list";

export default function CalendarPage() {
  return (
    <div className="grid grid-cols-5 gap-4 px-4">
      <div className="col-span-2">
        <ExerciseList />
      </div>
      <div className="relative col-span-3">
        <Calendar />
      </div>
    </div>
  );
}
