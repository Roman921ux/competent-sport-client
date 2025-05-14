import { Button } from "@/shared/shadcn-ui/components/ui/button";
import useRemoveSet from "./use-remove-set";

export default function RemoveSetBtn({
  workoutId,
  exerciseId,
  setId,
}: {
  workoutId: string;
  exerciseId: string;
  setId: string;
}) {
  const removeSetMutation = useRemoveSet({ workoutId });
  return (
    <Button
      onClick={() => removeSetMutation.mutate({ workoutId, exerciseId, setId })}
    >
      Удалить
    </Button>
  );
}
