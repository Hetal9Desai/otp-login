import React, { useState } from "react";

const OtpInput = (length = 4, onOtpSubmit = () => {}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  console.log(otp);

  const handleChange = () => {};
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
