export const Spinner = () => {
  return (
    <div className="flex justify-center items-center relative h-[100vh] w-full">
      <div className="absolute mx-auto animate-spin rounded-full h-32 w-32 border-b-2 border-green"></div>
    </div>
  );
}