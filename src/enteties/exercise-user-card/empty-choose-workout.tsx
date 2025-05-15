export default function EmptyChooseWorkout() {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-6">
        <span className="text-5xl font-black text-primary/90">
          Ваш календарь
        </span>
        <span className="text-2xl font-normal text-primary/90 max-w-lg">
          Чтобы увидеть тренировк нажмите на нее в календаре, или на кнопку
          создать тренировку
        </span>
      </div>
    </div>
  );
}
