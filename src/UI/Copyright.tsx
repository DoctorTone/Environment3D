import CopyrightIcon from "@mui/icons-material/Copyright";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";

const Copyright = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const label = "DRT Software Ltd. 2026";

  return (
    <div id="copyright" className="panel">
      <Typography
        variant="h6"
        sx={{
          color: "orange",
          textShadow:
            "0 0 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.9)",
        }}
        className="links"
      >
        <Tooltip title={isMobile ? label : ""} enterTouchDelay={0} arrow>
          <a
            href="https://www.drt-software.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <CopyrightIcon fontSize="large" sx={{ mr: isMobile ? 0 : 1 }} />
            {!isMobile && label}
          </a>
        </Tooltip>
      </Typography>
    </div>
  );
};

export default Copyright;
