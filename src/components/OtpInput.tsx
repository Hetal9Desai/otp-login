import React, { useEffect, useRef, useState } from "react";
import { Box, TextField } from "@mui/material";

interface OtpInputProps {
  length?: number;
  onOtpSubmit?: (otp: string) => void;
  resetTrigger?: number;
  onChange?: () => void;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 4,
  onOtpSubmit = () => {},
  resetTrigger = 0,
  onChange = () => {},
}) => {
  const [otp, setOtp] = useState<string[]>(Array.from({ length }, () => ""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    setOtp(Array.from({ length }, () => ""));
    inputRefs.current = inputRefs.current.slice(0, length);
    inputRefs.current[0]?.focus();
  }, [resetTrigger, length]);

  useEffect(() => {
    const code = otp.join("");
    if (code.length === length) {
      onOtpSubmit(code);
    }
  }, [otp, length, onOtpSubmit]);

  const handleChange = (idx: number, value: string) => {
    if (!/^\d$/.test(value)) return;
    const updated = [...otp];
    updated[idx] = value;
    setOtp(updated);
    onChange();

    if (idx < length - 1) {
      setTimeout(() => {
        inputRefs.current[idx + 1]?.focus();
        inputRefs.current[idx + 1]?.select();
      }, 0);
    }
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const updated = [...otp];
        updated[idx] = "";
        setOtp(updated);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
        const updated = [...otp];
        updated[idx - 1] = "";
        setOtp(updated);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      inputRefs.current[idx - 1]?.focus();
      inputRefs.current[idx - 1]?.select();
    } else if (e.key === "ArrowRight" && idx < length - 1) {
      e.preventDefault();
      inputRefs.current[idx + 1]?.focus();
      inputRefs.current[idx + 1]?.select();
    }
  };

  const handleClick = (idx: number) => {
    inputRefs.current[idx]?.select();
  };

  return (
    <Box display="flex" justifyContent="center" gap={1}>
      {otp.map((digit, i) => (
        <TextField
          key={i}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value.slice(-1))}
          onClick={() => handleClick(i)}
          inputRef={(el) => (inputRefs.current[i] = el)}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center", fontSize: "1.5rem" },
            onKeyDown: (e) => handleKeyDown(i, e),
          }}
          size="small"
        />
      ))}
    </Box>
  );
};

export default OtpInput;
