import Box from "@mui/material/Box";

const Banner = () => {
  return (
    <Box
      className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
      sx={{ backgroundColor: "primary.main" }}
    >
      <svg
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 960 540"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Box
          component="g"
          sx={{ color: "primary.light" }}
          className="opacity-20"
          fill="none"
          stroke="currentColor"
          strokeWidth="100"
        >
          <circle r="234" cx="196" cy="23" />
          <circle r="234" cx="790" cy="491" />
        </Box>
      </svg>
      <Box
        component="svg"
        className="absolute -top-64 -right-64 opacity-20"
        sx={{ color: "primary.light" }}
        viewBox="0 0 220 192"
        width="220px"
        height="192px"
        fill="none"
      >
        <defs>
          <pattern
            id="837c3e70-6c3a-44e6-8854-cc48c737b659"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor" />
          </pattern>
        </defs>
        <rect
          width="220"
          height="192"
          fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
        />
      </Box>

      <div className="z-10 relative w-full max-w-2xl">
        <div className="text-7xl font-bold leading-none text-gray-100">
          <div>خوش آمدید</div>
        </div>
        <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400"></div>
      </div>
    </Box>
  );
};

export default Banner;
