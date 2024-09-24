import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OtpScreen from "./components/OtpScreen";
import VerifyOtp from "./components/VerifyOtp";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<OtpScreen />} />
				<Route path="/verify-otp" element={<VerifyOtp />} />
			</Routes>
		</Router>
	);
};

export default App;
