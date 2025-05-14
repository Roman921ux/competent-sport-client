import useExercise from "@/pages/exercise/hooks/use-exercise";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/shadcn-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/shadcn-ui/components/ui/dialog";
import { Input } from "@/shared/shadcn-ui/components/ui/input";
import { Label } from "@/shared/shadcn-ui/components/ui/label";
import { DatePicker } from "@/shared/ui/date-picker";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import useWorkout from "./use-workout";

export function DialogCreateWorkout() {
  const { exercises } = useExercise();
  const {
    formData,
    setFormData,
    handlers: { handleSubmit, handleAddExercise, handleSetDate },
  } = useWorkout();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Создат тренировку</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Создание тренировки</DialogTitle>
          <DialogDescription>
            Создай свою тренировку, выбери дату и нужные упражнения
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(event) => handleSubmit(event, setOpen)}>
          <div className="flex flex-col gap-4">
            <DatePicker
              date={formData.date}
              setDate={
                handleSetDate as Dispatch<SetStateAction<Date | undefined>>
              }
            />
            <div className="flex flex-col gap-2">
              <Label>Название трнировки</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Верх"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Комментарий</Label>
              <Input
                value={formData.comment}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                placeholder="О планх ..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Упражнения</Label>
              <div className="flex flex-col gap-2 pr-4 max-h-[300px] overflow-y-scroll">
                {exercises?.map((exercise) => (
                  <div
                    onClick={() => handleAddExercise(exercise)}
                    className={cn(
                      "flex justify-between items-center gap-4 py-1 px-3 border rounded-lg hover:bg-primary/90 hover:text-background",
                      formData.exercises.some(
                        (userExercise) =>
                          userExercise.exerciseId === exercise._id,
                      ) && "bg-primary/90 text-background",
                    )}
                  >
                    {exercise.title}
                    {formData.exercises.some(
                      (userExercise) =>
                        userExercise.exerciseId === exercise._id,
                    ) && <X className="w-4 h-4 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit">Создать</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
