export default function SetItem() {
  return (
    <div className="flex items-center gap-2 py-2 px-3 bg-muted hover:bg-muted-foreground/15 rounded-md">
      {/* <Box className="h-6 w-6 shrink-0 text-muted-foreground" /> */}
      <span className="font-medium text-sm">65 кг</span>
      <span className="text-muted-foreground text-sm">x</span>
      <span className="text-muted-foreground text-sm">8</span>
    </div>
  );
}
