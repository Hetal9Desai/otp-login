import { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {}, resetTrigger }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    setOtp(new Array(length).fill(""));
    inputRefs.current[0]?.focus();
  }, [resetTrigger, length]);

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      onOtpSubmit(otp.join(""));
    }
  }, [otp, onOtpSubmit]);

  const handleInput = (index, e) => {
    const value = e.nativeEvent.data ?? e.target.value;

    // Allow only one digit
    if (!/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus on next field after typing
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleClick = (index) => {
    // Allow typing over the existing value without clearing
    if (otp[index]) {
      inputRefs.current[index]?.setSelectionRange(0, 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          onInput={(e) => handleInput(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onClick={() => handleClick(index)}
          ref={(el) => (inputRefs.current[index] = el)}
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "24px",
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
