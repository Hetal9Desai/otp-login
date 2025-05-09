import React, { useState, useRef, useEffect } from "react";

const OtpInput = (length = 4, onOtpSubmit = () => {}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  console.log(otp);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = () => {};
  const handlekeyDoen = () => {};
  return otp.map((value, index) => {
    return (
      <input
        key={index}
        type="text"
        value={value}
        onChange={(e) => handleChange(index, e)}
        onClick={() => {
          handleClick(index);
        }}
        onkeydown={(e) => {
          handlekeyDoen(index, e);
        }}
        className="otpInput"
      />
    );
  });
};

export default OtpInput;
