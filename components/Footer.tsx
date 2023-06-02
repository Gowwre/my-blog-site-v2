import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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
