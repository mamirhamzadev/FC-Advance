import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../actions/users";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useToast from "../../../../../shared/store/hooks/useToast";
import { passwordValidationSchema } from "../../../../../shared/utils/validations/yupValidations";

const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { notify } = useToast();

	const queryParams = new URLSearchParams(location.search);
	const authToken = queryParams.get("token");
	const currentYear = new Date().getFullYear();

	const [showPassword, setShowPassword] = useState(false);
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

	const {
		control,
		watch,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ resolver: yupResolver(passwordValidationSchema), mode: "onBlur" });
	const passwordValue = watch("password");

	const passwordStrength =
		passwordValue?.length >= 10 && /[A-Z]/.test(passwordValue) && /[!@#$%^&*]/.test(passwordValue)
			? "strong"
			: passwordValue?.length >= 8 && /[0-9]/.test(passwordValue)
			? "medium"
			: passwordValue
			? "weak"
			: "";

	const handleShowPassword = (fieldName) => {
		setShowPassword({ ...showPassword, [fieldName]: !showPassword[fieldName] });
	};

	const handleSubmitResetPasswordForm = async (formData) => {
		setIsSubmittingRequest(true);

		dispatch(resetPassword({ formData: { token: authToken, password: formData?.password }, notify })).then(() => {
			setIsSubmittingRequest(false);
			navigate("/auth");
		});
	};

	return (
		<div className="d-flex flex-column flex-root">
			<div
				className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
				style={{
					backgroundImage: "url(/assets/media/illustrations/sketchy-1/14.png",
				}}>
				<div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
					<Link to="/" className="mb-12">
						<img alt="Logo" src="/assets/logo.png" className="h-125px" />
					</Link>
					<div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
						<div className="text-center mb-10">
							<h1 className="text-dark mb-3">Setup New Password</h1>
							<div className="text-gray-400 fw-bold fs-4" />
						</div>

						<div className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework">
							<div className="text-center mb-10">
								<div className="text-gray-400 fw-bold fs-4" />
							</div>
							<div className="row">
								<div className="col-lg-12">
									<div className="fv-row mb-10 fv-plugins-icon-container">
										<label className="form-label fs-6 fw-bolder text-dark">New Password</label>

										<div className="position-relative mb-3">
											<Controller
												control={control}
												name="password"
												render={({ field: { onChange, value } }) => (
													<input
														className="form-control mb-0"
														placeholder="Password"
														type={showPassword.password ? "text" : "password"}
														value={value}
														onChange={onChange}
													/>
												)}
											/>
											<i
												className={`position-absolute end-0 top-50 translate-middle-y p-2 fa ${
													showPassword.password ? "fa-eye-slash" : "fa-eye"
												}`}
												onClick={() => handleShowPassword("password")}
											/>
										</div>

										<div className="d-flex align-items-center gap-1 mb-0">
											{Array.from({ length: 5 }, (_, index) => (
												<div
													className={`${
														passwordStrength === "weak" && index < 2
															? "bg-danger"
															: passwordStrength === "medium" && index < 3
															? "bg-warning"
															: passwordStrength === "strong" && index < 5
															? "bg-success"
															: "bg-light"
													}`}
													style={{ height: "5px", width: "5%" }}
													key={index}
												/>
											))}
											{passwordStrength && (
												<p
													className={`text-small mb-0 fw-bold text-${
														passwordStrength === "weak"
															? "danger"
															: passwordStrength === "medium"
															? "warning"
															: "success"
													}`}>
													{passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
												</p>
											)}
										</div>

										{errors.password && <p className="text-danger fs-8">{errors.password.message}</p>}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="fv-row mb-10 fv-plugins-icon-container">
										<label className="form-label fs-6 fw-bolder text-dark">Confirm New Password</label>

										<div className="position-relative mb-3">
											<Controller
												control={control}
												name="confirmPassword"
												render={({ field: { onChange, value } }) => (
													<input
														className="form-control mb-0"
														placeholder="Password"
														type={showPassword.confirmPassword ? "text" : "password"}
														value={value}
														onChange={onChange}
													/>
												)}
											/>
											<i
												className={`position-absolute end-0 top-50 translate-middle-y p-2 fa ${
													showPassword.confirmPassword ? "fa-eye-slash" : "fa-eye"
												}`}
												onClick={() => handleShowPassword("confirmPassword")}
											/>
										</div>

										{errors.confirmPassword && <p className="text-danger fs-8">{errors.confirmPassword.message}</p>}
									</div>
								</div>
							</div>
							<div className="text-center">
								<button
									className="btn btn-lg btn-primary w-100 mb-5"
									onClick={handleSubmit(handleSubmitResetPasswordForm)}
									disabled={isSubmittingRequest}>
									<span className="indicator-label">Setup New Password</span>
								</button>
							</div>
							<div />
						</div>
					</div>
				</div>
				<div className="d-flex flex-center flex-column-auto p-10">
					<div className="container-xxl d-flex flex-column flex-md-row align-items-center justify-content-center">
						<div className="text-dark order-2 order-md-1">
							<p style={{ textAlign: "center" }}>
								Copyright <i className="fa fa-copyright" />
								{currentYear}
								<a href="https://single-solution.com/" target="__blank" style={{ textDecoration: "underline" }}>
									Single Solution
								</a>
								. All rights reserved.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
