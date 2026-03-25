import { Box, Typography } from "@mui/material";

export default function InfoPanel({ metadata }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 20,
        left: 20,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(10px)",
        padding: 2.5,
        borderRadius: 2,
        minWidth: 280,
      }}
    >
      <Typography variant="h6" sx={{ color: "white", mb: 1, fontWeight: 600 }}>
        London Urban Heat Islands
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }}
      >
        3D visualization of surface temperature variation across central London
      </Typography>

      <Box sx={{ display: "flex", gap: 3 }}>
        <Box>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            Buildings
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            {metadata.count.toLocaleString()}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            Temp Range
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            {metadata.tempRange[0]}° - {metadata.tempRange[1]}°C
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
