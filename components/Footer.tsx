import { Box, Grid, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Paper
      component={"footer"}
      sx={{
        marginTop: "auto",
        display:"grid",
        justifyContent: "center",
        backgroundColor:"#d62828"
      }}
    >
     <Box component={"div"} sx={{
      padding: "1rem",
      color:"#fcbf49"
     }}>
      &copy; 2023 InHouse Dev
     </Box>
    </Paper>
  );
}

export default Footer;
