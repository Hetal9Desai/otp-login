import React, { useState } from "react";

const PhoneOtpForm = () => {
  const [phonenumber, setPhoneNumber] = useState("");

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();
    console.log("Phone submitted:", phonenumber);
  };

  return (
    <div>
      <form onSubmit={handlePhoneSubmit}>
        <input
          type="text"
          value={phonenumber}
          onChange={handlePhoneNumber}
          placeholder="Enter Phone Number"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PhoneOtpForm;
