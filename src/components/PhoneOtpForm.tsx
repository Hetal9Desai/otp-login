import React, { useState, useEffect } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const [otpError, setOtpError] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpResetCounter, setOtpResetCounter] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let countdown;
    if (showOtpInput && timer > 0 && !isLoggedIn) {
      countdown = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setIsOtpExpired(true);
    }
    return () => clearInterval(countdown);
  }, [showOtpInput, timer, isLoggedIn]);

  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);

  const handlePhoneSubmit = (e) => {
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
    setTimer(60);
    setIsOtpExpired(false);
    setOtpError(null);
    setIsLoggedIn(false);
    setOtpResetCounter((c) => c + 1);
    generateOtp();
  };

  const onOtpSubmit = (entered) => {
    if (entered === generatedOtp) {
      setOtpError(null);
      setIsLoggedIn(true);
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  if (isLoggedIn) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "2rem 3rem",
            borderRadius: "8px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Login Successful!</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone Number"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput
            length={4}
            onOtpSubmit={onOtpSubmit}
            resetTrigger={otpResetCounter}
          />
          {otpError && <p className="error">{otpError}</p>}

          {isOtpExpired ? (
            <div>
              <button onClick={handleResendOtp} className="resend-otp-btn">
                Resend OTP
              </button>
              <p>OTP expired. Please request a new OTP.</p>
            </div>
          ) : (
            <p>OTP expires in {timer} seconds</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
