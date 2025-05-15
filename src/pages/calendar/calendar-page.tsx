import Calendar from "@/widgets/calendar";
import useChooseWorkout from "./hooks/use-choose-workout";
import ChooseUserWorkout from "@/widgets/workout/choose-user-workout/choose-user-workout";
import { DialogCreateWorkout } from "@/widgets/workout/dialog-create-workout/dialog-create-workout";
import EmptyChooseWorkout from "@/enteties/exercise-user-card/empty-choose-workout";

export default function CalendarPage() {
  const { handleChangeWorkout, chooseWorkout } = useChooseWorkout();
  return (
    <div className="grid grid-cols-5 gap-4 px-4">
      <div className="col-span-2">
        <DialogCreateWorkout />
        {chooseWorkout ? (
          <ChooseUserWorkout chooseWorkout={chooseWorkout} />
        ) : (
          <EmptyChooseWorkout />
        )}
      </div>
      <div className="relative col-span-3">
        <Calendar handleChangeWorkout={handleChangeWorkout} />
      </div>
    </div>
  );
}
