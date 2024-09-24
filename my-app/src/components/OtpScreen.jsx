import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./otp.css";

const OtpScreen = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		setLoading(true);
		setError("");
		try {
			// API endpoint
			const response = await axios.post("", {
				phoneNumber: data.phoneNumber,
			});

			if (response.status === 200) {
				reset();
				navigate("/verify-otp", { state: { phoneNumber: data.phoneNumber } });
			} else {
				setError("Failed to send OTP. Please try again.");
			}
		} catch (error) {
			setError("Failed to send OTP. Please try again.");
		}
		setLoading(false);
	};

	return (
		<div className="otp_section">
			<div className="container mt-5">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="otp_container">
							<div className="card Otp_card">
								<div className="card-body">
									<h4 className="card-title text-center mb-5 mt-2">
										OTP Verification
									</h4>
									{error && (
										<div className="alert alert-danger mt-3 mb-3">{error}</div>
									)}
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className="form-group">
											<label htmlFor="phoneNumber" className="mb-1 card_label">
												Phone Number
											</label>
											<input
												type="number"
												className="form-control form_input"
												id="phoneNumber"
												placeholder="Enter your phone number"
												{...register("phoneNumber", {
													required: "Phone number is required",
													pattern: {
														value: /^[0-9]{10}$/,
														message: "Phone number must be 10 digits",
													},
												})}
											/>
											{errors.phoneNumber && (
												<small className="text-danger">
													{errors.phoneNumber.message}
												</small>
											)}
										</div>
										<button
											type="submit"
											className="btn btn-primary btnSend"
											disabled={loading}
										>
											{loading ? "Sending..." : "Send OTP"}
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OtpScreen;
