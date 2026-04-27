import CopyrightIcon from "@mui/icons-material/Copyright";
import Typography from "@mui/material/Typography";

const Copyright = () => {
  return (
    <div id="copyright" className="panel">
      <Typography variant="h6" sx={{ color: "orange" }} className="links">
        <a
          href="https://www.drt-software.com/"
          target="_blank"
          rel="noreferrer noopener"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <CopyrightIcon fontSize="large" sx={{ mr: 1 }} />
          DRT Software Ltd. 2026
        </a>
      </Typography>
    </div>
  );
};

export default Copyright;
