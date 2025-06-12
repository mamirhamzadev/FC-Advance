import { Link } from "react-router-dom";
import Login from "./component/auth/Login";
import { useState } from "react";
import ForgotPassword from "./component/auth/ForgotPassword";
const Auth = (props) => {
	const [currentComponent, setCurrentComponent] = useState("login");

	const renderCurrentComponent = () => {
		switch (currentComponent) {
			case "login":
				return <Login setCurrentComponent={setCurrentComponent} setAuthStatus={props.setAuthStatus} />;
			case "forgotPassword":
				return <ForgotPassword setCurrentComponent={setCurrentComponent} setAuthStatus={props.setAuthStatus} />;
			default:
				return null;
		}
	};

	const currentYear = new Date().getFullYear();

	return (
		<div className="d-flex flex-column flex-root">
			<div
				className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
				style={{
					background: "#F2F0FB",
				}}>
				<div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
					<Link to="/" className="mb-12">
						<img alt="Logo" src="assets/logo.png" className="h-125px" />
					</Link>
					{renderCurrentComponent()}
				</div>
				<div className="d-flex flex-center flex-column-auto p-10">
					<div className="container-xxl d-flex flex-column flex-md-row align-items-center justify-content-center">
						<div className="text-dark order-2 order-md-1">
							<p style={{ textAlign: "center" }}>
								Copyright <i className="fa fa-copyright" />
								{currentYear}{" "}
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

export default Auth;
