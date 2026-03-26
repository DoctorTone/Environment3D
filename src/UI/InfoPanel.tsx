import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

export default function InfoPanel({ metadata }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600px

  return (
    <Box
      sx={{
        position: "absolute",
        top: isMobile ? 10 : 20,
        left: isMobile ? 10 : 20,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(10px)",
        padding: 2,
        borderRadius: 2,
        minWidth: 200,
        maxWidth: isMobile ? "45vw" : "none", // Cap width on mobile
      }}
    >
      <Typography
        variant={isMobile ? "subtitle1" : "h6"}
        sx={{ color: "white", mb: isMobile ? 0.5 : 1, fontWeight: 600 }}
      >
        London Urban Heat Islands
      </Typography>

      {!isMobile && ( // Hide description on mobile to save space
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}
        >
          3D visualisation of surface temperature across central London
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: isMobile ? 2 : 3 }}>
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: isMobile ? "0.65rem" : "0.75rem",
            }}
          >
            Buildings
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "h6"}
            sx={{ color: "white" }}
          >
            {metadata.count.toLocaleString()}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: isMobile ? "0.65rem" : "0.75rem",
            }}
          >
            Temp Range
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "h6"}
            sx={{ color: "white" }}
          >
            {metadata.tempRange[0]}° -- {metadata.tempRange[1]}°C
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
