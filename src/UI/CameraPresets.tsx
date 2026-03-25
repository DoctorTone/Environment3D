import { Stack, Button, useMediaQuery, useTheme } from "@mui/material";

export default function CameraPresets({ onPresetClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const presets = [
    {
      label: "Overview",
      position: [0, 2000, 3000],
      target: [0, 0, 0],
    },
    {
      label: "Hot Zones",
      position: [4000, 540, 2000], // Focus on right side red areas
      target: [2800, -530, 530],
    },
    {
      label: "Cool Zones",
      position: [2500, 565, -3000], // Focus on left side blue areas
      target: [900, 265, -900],
    },
  ];

  return (
    <Stack
      direction={isMobile ? "column" : "row"} // Stack vertically on mobile
      spacing={isMobile ? 1 : 1.5}
      sx={{
        position: "absolute",
        bottom: 30,
        left: isMobile ? 10 : "50%",
        transform: isMobile ? "none" : "translateX(-50%)",
        zIndex: 10,
      }}
    >
      {presets.map((preset, i) => (
        <Button
          key={preset.label}
          variant={i === 0 ? "contained" : "outlined"}
          size={isMobile ? "small" : "medium"}
          onClick={() => onPresetClick(preset.position, preset.target)}
          sx={{
            backdropFilter: "blur(10px)",
            background:
              i === 0 ? "rgba(25, 118, 210, 0.9)" : "rgba(255, 255, 255, 0.1)",
            color: "white",
            borderColor: "rgba(255, 255, 255, 0.3)",
            fontSize: isMobile ? "0.75rem" : "0.875rem",
            padding: isMobile ? "6px 12px" : "8px 16px",
            minWidth: isMobile ? 100 : "auto",
            "&:hover": {
              background:
                i === 0 ? "rgba(25, 118, 210, 1)" : "rgba(255, 255, 255, 0.2)",
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
          }}
        >
          {preset.label}
        </Button>
      ))}
    </Stack>
  );
}
