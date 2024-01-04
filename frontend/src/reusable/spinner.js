import { useTheme } from "@mui/styles";

const Spinner = ({ className }) => {
  const { palette } = useTheme();
  const color = palette.background.default;
  return (
    <div
      className={`flex justify-center items-center gap-4 bg-transparent ${className}`}
    >
      <div
        className={`h-8 w-8 bg-[${color}] rounded-full animate-bounce [animation-delay:-0.3s]`}
      ></div>
      <div
        className={`h-8 w-8 bg-[${color}] rounded-full animate-bounce [animation-delay:-0.15s]`}
      ></div>
      <div
        className={`h-8 w-8 bg-[${color}] rounded-full animate-bounce`}
      ></div>
    </div>
  );
};

export default Spinner;
