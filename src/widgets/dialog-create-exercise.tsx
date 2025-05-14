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
import { TExercise } from "@/shared/types/exercise";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";

type TFormData = Omit<TExercise, "typeExercise" | "userCreateExerciseId">;

export function DialogCreateExercise({
  handleAddExercise,
}: {
  handleAddExercise: (data: TFormData) => void;
}) {
  const [muscles] = useState([
    "грудь",
    "трицепс",
    "бицепс",
    "плечи (дельты)",
    "трапеции",
    "спина (широчайшие)",
    "поясница",
    "предплечья",
    "пресс (прямая мышца живота)",
    "косые мышцы живота",
    "ягодицы",
    "квадрицепсы (передняя поверхность бедра)",
    "бицепс бедра (задняя поверхность бедра)",
    "икроножные мышцы",
    "пояснично-крестцовый отдел",
    "аддукторы (внутренняя поверхность бедра)",
    "абдукторы (наружная поверхность бедра)",
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<TFormData>({
    title: "",
    description: "",
    muscleGroups: [],
  });

  const handleAddMuscle = (muscle: string) => {
    if (formData.muscleGroups.includes(muscle)) {
      const newMuscleGroups = formData.muscleGroups.filter(
        (oldMuscle) => oldMuscle !== muscle,
      );
      setFormData((prev) => ({
        ...prev,
        muscleGroups: newMuscleGroups,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      muscleGroups: [...formData.muscleGroups, muscle],
    }));
  };

  const changeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleAddExercise(formData);
    setFormData({ title: "", description: "", muscleGroups: [] });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Создать новое упражнение</Button> */}
        <button className="font-medium bg-primary/5 text-primary/90 rounded-[30px] py-3 px-6 w-fit hover:bg-primary/90 hover:text-background">
          Создать новое упражнение
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Создани упражнения</DialogTitle>
          <DialogDescription>
            При создании упражнения, оно попадет в общую базу для всех
            пользователей
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={changeSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Название упражнения</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Жим лежа"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Описние</Label>
              <Input
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Описние ..."
              />
            </div>
            <div className="space-y-2 h-[300px] pr-4 overflow-y-scroll">
              <Label>Группы мышц</Label>
              <div className="grid grid-cols-2 gap-2">
                {muscles.map((muscle) => (
                  <div
                    onClick={() => handleAddMuscle(muscle)}
                    className={cn(
                      "flex justify-between items-center border rounded-xl px-3 py-0.5 bg-background hover:bg-primary/90 hover:text-background hover:cursor-pointer",
                      formData.muscleGroups.includes(muscle) &&
                        "bg-primary/90 text-background",
                    )}
                  >
                    {muscle}
                    {formData.muscleGroups.includes(muscle) && (
                      <X className="w-4 h-4 shrink-0" />
                    )}
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
