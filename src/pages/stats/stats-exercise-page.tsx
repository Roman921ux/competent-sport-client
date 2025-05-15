import axiosInstance from "@/shared/api/axios-instance";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/shadcn-ui/components/ui/chart";
import { TStatsExDto } from "@/shared/types/stats";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface ExerciseStats {
  totalWorkouts: number;
  comments: string[];
}
// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function StatsExercisePage() {
  const { exerciseId } = useParams();
  const navigate = useNavigate();

  const { data: exercisesData } = useQuery({
    queryKey: ["exercise-stats"],
    queryFn: async (): Promise<TStatsExDto[]> => {
      const response = await axiosInstance.get(`/stats/exercise/${exerciseId}`);
      console.log(
        "запрос на получение упражнений для статистики -",
        response.data,
      );
      return response.data;
    },
  });

  const stats: ExerciseStats = {
    totalWorkouts: exercisesData?.length ?? 0,

    comments: exercisesData?.map((item) => item.comment).filter(Boolean) ?? [],
  };

  const allWeights = exercisesData?.flatMap((item) =>
    item.sets.map((set) => set.weight),
  );
  const maxWeight = allWeights && Math.max(...allWeights);

  const allRepeat = exercisesData?.flatMap((item) =>
    item.sets.map((set) => set.repeat),
  );
  const maxRepeat = allRepeat && Math.max(...allRepeat);

  const chartData = exercisesData?.map((item, index) => {
    // Находим максимальный weight в текущем sets
    const weights = item.sets.map((set) => set.weight);
    const currentMax = Math.max(...weights);

    return {
      maxWeight: currentMax,
      trainer: index + 1, // Нумерация тренеров с 1
    };
  });
  console.log("chartData -", chartData);
  console.log("exercisesData -", exercisesData);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <span className="text-5xl font-black text-primary/90">
          Статистика по упражнению
        </span>
        <div className="w-full flex justify-between">
          <span className="text-2xl font-normal text-primary/90 max-w-lg">
            Здесь вы можете посомтрть статистку для упражнения
          </span>
          <button
            onClick={() => navigate("/", { replace: true })}
            className="font-medium text-base bg-primary/5 hover:bg-primary/10 text-primary/90 rounded-[30px] px-6 py-4"
          >
            Вернуться назад
          </button>
        </div>
      </div>
      <div>
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Карточка общего количества выполнений */}
            <div className="w-full flex items-center justify-center flex-col gap-2 p-4 bg-primary/5 rounded-[30px]">
              <span className="font-medium text-xl text-primary/60">
                Всего тренировок
              </span>
              <span className="font-medium text-xl">{stats.totalWorkouts}</span>
            </div>
            {maxWeight !== Infinity && maxRepeat !== -Infinity && (
              <div className="w-full flex items-center justify-center flex-col gap-2 p-4 bg-primary/5 rounded-[30px]">
                <span className="font-medium text-xl text-primary/60">
                  Макимально поднятый вес
                </span>
                <span className="font-medium text-xl">{maxWeight} кг</span>
              </div>
            )}
            {maxRepeat !== Infinity && maxRepeat !== -Infinity && (
              <div className="w-full flex items-center justify-center flex-col gap-2 p-4 bg-primary/5 rounded-[30px]">
                <span className="font-medium text-xl text-primary/60">
                  Макимальные повторения
                </span>
                <span className="font-medium text-xl">{maxRepeat} пвт</span>
              </div>
            )}

            <div className="w-full flex gap-4 items-start justify-start flex-col px-10 py-8 bg-background border rounded-[30px]">
              <span className="font-medium text-xl text-primary/60">
                Группы мышц
              </span>
              <div>
                {exercisesData &&
                  exercisesData[0]?.exerciseId?.muscleGroups?.map((group) => (
                    <div className="font-medium text-xl">{group}</div>
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 border rounded-[30px] px-10 py-8">
              <span className="font-medium text-xl text-primary/60">
                Последние комментарии
              </span>
              <div className="space-y-2">
                {exercisesData &&
                  exercisesData.map((exercise) =>
                    exercise.sets.map((ex) => (
                      <div className="border-b pb-2 last:border-0 last:pb-0">
                        <p className="font-medium text-xl">{ex.comment}</p>
                      </div>
                    )),
                  )}
              </div>
            </div>

            <div>
              {/* <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="trainer"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                  />
                  <Area
                    dataKey="maxWeight"
                    type="linear"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ChartContainer> */}
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                    bottom: 20, // Добавляем отступ снизу для подписи оси X
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="trainer"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    label={{
                      value: "Тренироки",
                      position: "insideBottom",
                      offset: -10,
                    }} // Подпись оси X
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    label={{
                      value: "Вес (кг)",
                      angle: -90,
                      position: "insideLeft",
                    }} // Подпись оси Y
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                  />
                  <Area
                    dataKey="maxWeight"
                    type="linear"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ChartContainer>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
