import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./otp.css";

const VerifyOtp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const phoneNumber = location.state?.phoneNumber;

	useEffect(() => {
		if (!phoneNumber) {
			navigate("/");
		}
	}, [phoneNumber, navigate]);

	const onSubmit = async (data) => {
		setLoading(true);
		setError("");
		try {
			// API endpoint
			const response = await axios.post("", {
				phoneNumber: phoneNumber,
				otp: data.otp,
			});

			if (response.status === 200) {
				reset();
				navigate("/");
				console.log("OTP Verified Successfully");
			} else {
				setError("Failed to verify OTP. Please try again.");
			}
		} catch (error) {
			setError("Failed to verify OTP. Please try again.");
		}
		setLoading(false);
	};

	return (
		<section className="otp_section">
			<div className="container mt-5">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="card Otp_card">
							<div className="otp_container">
								<div className="card-body">
									<h4 className="card-title text-center mb-5 mt-2">
										Verify OTP
									</h4>
									{error && (
										<div className="alert alert-danger mt-3 mb-3">{error}</div>
									)}
									<form onSubmit={handleSubmit(onSubmit)}>
										<div className="form-group">
											<label htmlFor="otp" className="mb-1 card_label">
												OTP
											</label>
											<input
												type="number"
												className="form-control form_input"
												id="otp"
												placeholder="Enter the OTP"
												{...register("otp", {
													required: "OTP is required",
													pattern: {
														value: /^[0-9]{6}$/,
														message: "OTP must be 6 digits",
													},
												})}
											/>
											{errors.otp && (
												<small className="text-danger">
													{errors.otp.message}
												</small>
											)}
										</div>
										<button
											type="submit"
											className="btn btn-primary btn-block btnSend"
											disabled={loading}
										>
											{loading ? "Verifying..." : "Verify OTP"}
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default VerifyOtp;
