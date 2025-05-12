import React from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import PhoneOtpForm from "./components/PhoneOtpForm";

function App() {
  return (
    <>
      <CssBaseline />
      <Box textAlign="center" pt={4} bgcolor="#f9f9f9" minHeight="100vh">
        <Typography variant="h4" gutterBottom>
          Enter Your Phone Number to Get OTP
        </Typography>
        <PhoneOtpForm />
      </Box>
    </>
  );
}

export default App;
