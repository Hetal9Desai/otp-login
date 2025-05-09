import { useState, useEffect } from "react";
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
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsOtpExpired(true);
    }
    return () => clearInterval(countdown);
  }, [showOtpInput, timer, isLoggedIn]);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    setShowOtpInput(true);
    generateOtp();
  };

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(otp.toString());
    alert(`Your OTP is: ${otp}`);
  };

  const handleResendOtp = () => {
    setTimer(60);
    setIsOtpExpired(false);
    setOtpError(null);
    setIsLoggedIn(false);
    setOtpResetCounter((prev) => prev + 1);
    generateOtp();
    console.log("Resending OTP to", phoneNumber);
  };

  const onOtpSubmit = (otp) => {
    if (otp === generatedOtp) {
      alert("Login Successful");
      setOtpError(null);
      setIsLoggedIn(true);
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

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

          {isLoggedIn ? (
            <p>Login Successful</p>
          ) : isOtpExpired ? (
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
