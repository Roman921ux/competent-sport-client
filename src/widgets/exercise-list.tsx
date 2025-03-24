import ExerciseUserCard from "@/enteties/exercise-user-card/exercise-user-card";
import {
  DropdownMenuSetting,
  PopoverToggleSet,
} from "@/features/exercise-user-card";

export default function ExerciseList() {
  console.log(window.innerWidth, window.innerHeight);

  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }, (_, i) => (
        <ExerciseUserCard
          key={i}
          settingSlot={<DropdownMenuSetting />}
          renderToggle={(setItem) => (
            <PopoverToggleSet>{setItem}</PopoverToggleSet>
          )}
        />
      ))}
    </div>
  );
}
