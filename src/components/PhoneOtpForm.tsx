import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import OtpInput from "./OtpInput";

const PhoneOtpForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpResetCounter, setOtpResetCounter] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (showOtpInput && timer > 0 && !isLoggedIn) {
      countdown = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setIsOtpExpired(true);
    }
    return () => clearInterval(countdown);
  }, [showOtpInput, timer, isLoggedIn]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10 || /[^0-9]/.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }
    setShowOtpInput(true);
    generateOtp();
  };

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    alert(`Your OTP is: ${otp}`);
  };

  const handleResendOtp = () => {
    setOtpError(null);
    setOtpResetCounter((c) => c + 1);
    setTimer(60);
    setIsOtpExpired(false);
    generateOtp();
  };

  const handleOtpSubmit = (entered: string) => {
    setOtpError(null);
    if (entered === generatedOtp) {
      setIsLoggedIn(true);
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  if (isLoggedIn) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Card sx={{ p: 4, maxWidth: 360, textAlign: "center" }}>
          <Typography variant="h5">Login Successful!</Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 360, mx: "auto", my: 4 }}>
      <CardContent>
        {!showOtpInput ? (
          <form onSubmit={handlePhoneSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <Button type="submit" variant="contained" fullWidth>
                Send OTP
              </Button>
            </Stack>
          </form>
        ) : (
          <Stack spacing={2} alignItems="center">
            <Typography>
              Enter OTP sent to <b>{phoneNumber}</b>
            </Typography>
            <OtpInput
              length={4}
              onOtpSubmit={handleOtpSubmit}
              resetTrigger={otpResetCounter}
              onChange={() => setOtpError(null)}
            />

            <Typography
              color="error"
              variant="body2"
              sx={{ minHeight: "1.5rem" }}
            >
              {otpError || ""}
            </Typography>

            {isOtpExpired ? (
              <Button variant="outlined" onClick={handleResendOtp}>
                Resend OTP
              </Button>
            ) : (
              <Typography>OTP expires in {timer} seconds</Typography>
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default PhoneOtpForm;
