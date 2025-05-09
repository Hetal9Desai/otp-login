import "./App.css";
import PhoneOtpForm from "./components/PhoneOtpForm";

function App() {
  return (
    <div className="App">
      <h1>Enter Your Phone Number to Get OTP</h1>
      <div className="card">
        <PhoneOtpForm />
      </div>
    </div>
  );
}

export default App;
