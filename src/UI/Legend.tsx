import { Box, Typography } from "@mui/material";

export default function Legend({ tempRange }) {
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
        right: 30,
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(10px)",
        padding: 2,
        borderRadius: 2,
        minWidth: 200,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: "white", mb: 1.5, fontWeight: 600 }}
      >
        Surface Temperature
      </Typography>

      {colors.map((item, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              backgroundColor: item.color,
              borderRadius: 0.5,
              mr: 1.5,
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: "white", fontSize: "0.85rem" }}
          >
            {item.range || item.temp}
          </Typography>
        </Box>
      ))}

      <Typography
        variant="caption"
        sx={{ color: "rgba(255,255,255,0.6)", mt: 1.5, display: "block" }}
      >
        Landsat 9 thermal data
        <br />
        July 30, 2024
      </Typography>
    </Box>
  );
}
