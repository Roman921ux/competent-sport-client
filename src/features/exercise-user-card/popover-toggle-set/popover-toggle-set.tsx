import { Button } from "@/shared/shadcn-ui/components/ui/button";
import { Input } from "@/shared/shadcn-ui/components/ui/input";
import { Label } from "@/shared/shadcn-ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/shadcn-ui/components/ui/popover";
import { Textarea } from "@/shared/shadcn-ui/components/ui/textarea";
import { ReactNode, useState } from "react";
import useToggleSet from "./use-toggle-set";
import { TSetDto } from "@/shared/types/workout";

export default function PopoverToggleSet({
  workoutId,
  exerciseId,
  setId,
  setItem,
  set,
  removeActionSlot,
}: {
  workoutId: string;
  exerciseId: string;
  setId: string;
  setItem?: ReactNode;
  set: TSetDto;
  removeActionSlot: ({
    workoutId,
    exerciseId,
    setId,
  }: {
    workoutId: string;
    exerciseId: string;
    setId: string;
  }) => ReactNode;
  children?: ReactNode;
}) {
  const [openPopover, setOpenPopover] = useState(false);
  const {
    formData,
    handlers: { handleChange, handleSubmit },
  } = useToggleSet({ workoutId, exerciseId, setId, set });

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger>{setItem}</PopoverTrigger>
      <PopoverContent className="w-80">
        <form
          onSubmit={(event) => handleSubmit(event, setOpenPopover)}
          className="grid gap-4"
        >
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Редактировть подход</h4>
            <p className="text-sm text-muted-foreground">
              Введите новые значения
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Вес</Label>
              <Input
                value={formData.weight}
                onChange={handleChange}
                name="weight"
                id="width"
                type="number"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="repeat">Повтор.</Label>
              <Input
                value={formData.repeat}
                onChange={handleChange}
                name="repeat"
                id="repeat"
                type="number"
                className="col-span-2 h-8"
              />
            </div>
          </div>

          <Textarea
            value={formData.comment}
            onChange={handleChange}
            name="comment"
            placeholder="Здесь комментарий к подходу, его можно изменить, или оставить путсым"
            className="text-sm"
          />
          <div className="grid grid-cols-2 gap-2">
            <Button type="submit" variant="secondary">
              Сохранить
            </Button>
            <Button type="button">Отмена</Button>
          </div>
        </form>
        {removeActionSlot({ workoutId, exerciseId, setId })}
      </PopoverContent>
    </Popover>
  );
}
