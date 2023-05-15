const LoadingSpinner = (props: { size?: number }) => {
  return (
    <div
      style={{ backgroundColor: "black" }}
      className="color-white h-screen w-1/2 w-screen"
    >
      Loading...
    </div>
  );
};
export const LoadingPage = () => {
  return (
    <div className="absolute right-0 top-0 flex h-screen w-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};
