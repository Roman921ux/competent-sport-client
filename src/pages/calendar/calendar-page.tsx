import Calendar from "@/widgets/calendar";
import useChooseWorkout from "./hooks/use-choose-workout";
import ChooseUserWorkout from "@/widgets/workout/choose-user-workout/choose-user-workout";
import { DialogCreateWorkout } from "@/widgets/workout/dialog-create-workout/dialog-create-workout";

export default function CalendarPage() {
  const { handleChangeWorkout, chooseWorkout } = useChooseWorkout();
  return (
    <div className="grid grid-cols-6 gap-4 px-4">
      <div className="col-span-2">
        <DialogCreateWorkout />
        <ChooseUserWorkout chooseWorkout={chooseWorkout} />
      </div>
      <div className="relative col-span-4">
        <Calendar handleChangeWorkout={handleChangeWorkout} />
      </div>
    </div>
  );
}
