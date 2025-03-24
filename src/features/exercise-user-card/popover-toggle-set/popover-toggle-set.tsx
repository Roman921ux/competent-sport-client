import { Button } from "@/shared/shadcn-ui/components/ui/button";
import { Input } from "@/shared/shadcn-ui/components/ui/input";
import { Label } from "@/shared/shadcn-ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/shadcn-ui/components/ui/popover";
import { Textarea } from "@/shared/shadcn-ui/components/ui/textarea";
import { ReactNode } from "react";

export default function PopoverToggleSet({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
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
                id="width"
                type="number"
                defaultValue="60"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="repeat">Повтор.</Label>
              <Input
                id="repeat"
                type="number"
                defaultValue="12"
                className="col-span-2 h-8"
              />
            </div>
          </div>

          <Textarea
            defaultValue="Здесь комментарий к подходу, его можно изменить, или оставить путсым"
            className="text-sm"
          />
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary">Сохранить</Button>
            <Button>Отмена</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
