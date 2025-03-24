import SetItem from "./ui/set-item";
import { ReactNode } from "react";

export default function ExerciseUserCard({
  settingSlot,
  renderToggle,
}: {
  settingSlot: ReactNode;
  renderToggle: (setItem: ReactNode) => ReactNode;
}) {
  return (
    <div className="border rounded-md p-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="min-w-[100px] min-h-[100px] bg-blue-100 rounded-md" />

        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-semibold">Name exercise</span>
              <span className="text-sm font-normal text-muted-foreground">
                Description exercise
              </span>
            </div>

            <div>{settingSlot}</div>
          </div>

          <div className="flex gap-2">
            {Array.from({ length: 3 }, (_, i) =>
              renderToggle(<SetItem key={i} />),
            )}
          </div>
        </div>
      </div>
      <span className="text-muted-foreground">
        Комментарий к упражнению на тренировке
      </span>
    </div>
  );
}
