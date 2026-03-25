import { Html } from "@react-three/drei";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader() {
  return (
    <Html center>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          background: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(10px)",
          padding: 5,
          borderRadius: 3,
          minWidth: 320,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <CircularProgress variant="indeterminate" size={60} color="secondary" />
        <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
          Loading Heat Data
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)" }}>
          27,723 buildings
        </Typography>
      </Box>
    </Html>
  );
}
