import { TSet } from "@/shared/types/workout";

export default function SetItem({ set }: { set: TSet }) {
  return (
    <div className="flex items-center gap-2 py-3 px-4 bg-muted hover:bg-muted-foreground/15 rounded-[18px]">
      {/* <Box className="h-6 w-6 shrink-0 text-muted-foreground" /> */}
      <span className="font-medium text-sm">{set?.weight} кг</span>
      <span className="text-muted-foreground text-sm">x</span>
      <span className="text-muted-foreground text-sm">{set?.repeat}</span>
    </div>
  );
}
