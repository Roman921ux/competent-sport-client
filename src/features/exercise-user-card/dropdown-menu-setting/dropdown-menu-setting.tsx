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

export default function DropdownMenuSetting() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon" variant="outline">
          <EllipsisVertical className="w-4 h-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Настройки упражнения</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Добавить комментарий</DropdownMenuItem>
        <DropdownMenuItem>Посмотреть статитику</DropdownMenuItem>
        <DropdownMenuItem>Посмотреть историю</DropdownMenuItem>
        <DropdownMenuItem>Удалить</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
