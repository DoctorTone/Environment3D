import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

export default function Legend({ tempRange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const colors = [
    { temp: "Cool", color: "#2E7D99", range: `${tempRange[0]}°C` },
    { temp: "Medium", color: "#5FBF8E", range: "" },
    { temp: "Warm", color: "#F2C94C", range: "" },
    { temp: "Hot", color: "#F2664C", range: `${tempRange[1]}°C` },
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 30,
        right: isMobile ? 10 : 30,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(10px)",
        padding: isMobile ? 1.5 : 2,
        borderRadius: 2,
        minWidth: isMobile ? 100 : 200,
        maxWidth: isMobile ? "40vw" : "none",
      }}
    >
      <Typography
        variant={isMobile ? "caption" : "subtitle2"}
        sx={{ color: "white", mb: isMobile ? 1 : 1.5, fontWeight: 600 }}
      >
        {isMobile ? "Temperature" : "Surface Temperature"}
      </Typography>

      {colors.map((item, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 0.4 }}>
          <Box
            sx={{
              width: isMobile ? 16 : 24,
              height: isMobile ? 16 : 24,
              backgroundColor: item.color,
              borderRadius: 0.5,
              mr: isMobile ? 1 : 1.5,
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: "white", fontSize: isMobile ? "0.7rem" : "0.85rem" }}
          >
            {item.range || item.temp}
          </Typography>
        </Box>
      ))}

      {!isMobile && ( // Hide data source on mobile
        <Typography
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.6)", mt: 1.5, display: "block" }}
        >
          Landsat 9 thermal data
          <br />
          July 30, 2024
        </Typography>
      )}
    </Box>
  );
}
