import { Button } from "@/shared/shadcn-ui/components/ui/button";
import SetItem from "./ui/set-item";

export default function ExerciseUserCard() {
  return (
    <div className="border rounded-md p-4 flex gap-4">
      <div className="w-[100px] h-[100px] bg-blue-100 rounded-md" />

      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Name exercise</span>
            <span className="text-sm font-normal text-muted-foreground">
              Description exercise
            </span>
          </div>
          <Button size="sm" variant="outline">
            + Add set
          </Button>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 3 }, (_, i) => (
            <SetItem key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
