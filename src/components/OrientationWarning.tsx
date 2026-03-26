import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

export default function OrientationWarning() {
  const [shouldShowWarning, setShouldShowWarning] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;

      // Show warning if:
      // 1. Device is in landscape AND
      // 2. Height is small (< 500px) indicating mobile device
      const isMobileLandscape = isLandscape && height < 500;

      setShouldShowWarning(isMobileLandscape);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!shouldShowWarning) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.95)",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        gap: 3,
      }}
    >
      <Box
        sx={{
          fontSize: "4rem",
          color: "white",
          animation: "rotate 2s ease-in-out infinite",
          "@keyframes rotate": {
            "0%, 100%": { transform: "rotate(0deg)" },
            "50%": { transform: "rotate(90deg)" },
          },
        }}
      >
        📱
      </Box>

      <Typography
        variant="h5"
        sx={{
          color: "white",
          textAlign: "center",
          fontWeight: 600,
          px: 4,
        }}
      >
        Please Rotate Your Device
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          px: 4,
        }}
      >
        This visualization works best in portrait mode
      </Typography>
    </Box>
  );
}
