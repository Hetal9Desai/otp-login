import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {}, resetTrigger }) => {
  const [otp, setOtp] = useState(() => Array.from({ length }, () => ""));
  const inputRefs = useRef([]);
  const prevOtpRef = useRef("");

  // Reset on trigger or length change
  useEffect(() => {
    setOtp(Array.from({ length }, () => ""));
    inputRefs.current = inputRefs.current.slice(0, length);
    prevOtpRef.current = "";
    inputRefs.current[0]?.focus();
  }, [resetTrigger, length]);

  // Fire callback once, after last digit renders
  useEffect(() => {
    const code = otp.join("");
    if (code.length === length && code !== prevOtpRef.current) {
      prevOtpRef.current = code;
      setTimeout(() => onOtpSubmit(code), 0);
    }
  }, [otp, length, onOtpSubmit]);

  const handleChange = (idx, e) => {
    const val = e.target.value.trim();
    if (!/^\d$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    // auto-advance
    if (idx < length - 1) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx, e) => {
    const key = e.key;
    if (key === "Backspace") {
      e.preventDefault();
      const next = [...otp];
      if (otp[idx]) {
        // clear current
        next[idx] = "";
        setOtp(next);
      } else if (idx > 0) {
        // go back one and clear
        inputRefs.current[idx - 1]?.focus();
        next[idx - 1] = "";
        setOtp(next);
      }
    } else if (key === "ArrowLeft") {
      e.preventDefault();
      if (idx > 0) inputRefs.current[idx - 1]?.focus();
    } else if (key === "ArrowRight") {
      e.preventDefault();
      if (idx < length - 1) inputRefs.current[idx + 1]?.focus();
    } else if (key === "Enter") {
      const code = otp.join("");
      if (code.length === length) onOtpSubmit(code);
    }
  };

  const handleClick = (idx) => {
    // if there's an earlier empty slot, jump there:
    const firstEmpty = otp.findIndex((d) => d === "");
    const target = firstEmpty !== -1 && firstEmpty < idx ? firstEmpty : idx;
    inputRefs.current[target]?.focus();
    inputRefs.current[target]?.select();
  };

  const handleFocus = (e) => {
    // select existing digit so typing overwrites
    e.target.select();
  };

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      {otp.map((digit, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onClick={() => handleClick(i)}
          onFocus={handleFocus}
          ref={(el) => (inputRefs.current[i] = el)}
          className="otpInput"
          style={{
            width: 40,
            height: 40,
            textAlign: "center",
            fontSize: 24,
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
