import { Button } from "@/shared/shadcn-ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/shadcn-ui/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import useSettingCard from "./use-setting-card";

export default function DropdownMenuSetting({
  workoutId,
  exerciseId,
}: {
  workoutId: string;
  exerciseId: string;
}) {
  const { removeExerciseMutation } = useSettingCard({ workoutId });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          size="icon"
          variant="ghost"
          className="hover:cursor-pointer rounded-2xl"
        >
          <EllipsisVertical className="w-12 h-12 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Настройки упражнения</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Добавить комментарий</DropdownMenuItem>
        <DropdownMenuItem>Посмотреть статитику</DropdownMenuItem>
        <DropdownMenuItem>Посмотреть историю</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            removeExerciseMutation.mutate({ workoutId, exerciseId })
          }
        >
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
