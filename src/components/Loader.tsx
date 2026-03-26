import { Html } from "@react-three/drei";
import { Box, Typography } from "@mui/material";
import { DotLoader } from "react-spinners";

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
          minWidth: 225,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <DotLoader color="#cc7306" />
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
