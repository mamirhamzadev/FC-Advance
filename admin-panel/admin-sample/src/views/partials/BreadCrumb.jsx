import { Link, useLocation } from "react-router-dom";
import React from "react";

const BreadCrumb = React.memo((props) => {
	const location = useLocation();
	return (
		<div className="container-fluid px-0">
			<div className="toolbar py-5">
				<div className="container-xxl py-3">
					<div className="row justify-content-between">
						<div className="w-auto">
							<div className="page-title d-flex flex-column me-3">
								<h1 className="d-flex text-dark text-capitalize fw-bold m-0 fs-3">
									{props.pageNames[props.pageNames.length - 1]}
								</h1>

								<ul className="mt-1 breadcrumb breadcrumb-dot fw-semibold text-gray-600 fs-6">
									{location.pathname !== "/" && (
										<li
											className={`breadcrumb-item ${
												props.pageNames[props.pageNames.length - 1] === "dashboard"
													? "text-primary fw-bolder"
													: "text-gray-600"
											}`}>
											<Link to="/" className="text-gray-600 text-hover-primary">
												Dashboard
											</Link>
										</li>
									)}

									{location.pathname !== "/" &&
										props.pageNames[props.pageNames.length - 1] !== "dashboard" &&
										props.pageNames.map((pageName, index) => (
											<li
												key={index}
												className={`breadcrumb-item ${
													index == props.pageNames.length - 1 ? "text-gray-900" : "text-gray-600"
												}`}>
												{index !== props.pageNames.length - 1 ? (
													<Link
														to={`/${props.pageNames.slice(0, index + 2).join("/")}`}
														className="text-gray-600 text-hover-primary text-capitalize">
														{pageName}
													</Link>
												) : (
													<span className="text-capitalize fw-bolder text-dark">{pageName}</span>
												)}
											</li>
										))}
								</ul>
							</div>
						</div>

						{props?.breadcrumbActions}

						{props?.editButtons && (
							<div className="col-md-5">
								<div className="d-flex align-items-center justify-content-end  py-2 py-md-1">
									<Link
										to={`${
											location.pathname === "/profile"
												? "/change-password"
												: location.pathname === "/change-password"
												? "/profile"
												: ""
										}`}
										className="btn btn-light-success fw-bolder">
										<i
											className={`me-2 fw-bolder fa ${
												location.pathname === "/profile"
													? "fa-lock"
													: location.pathname === "/change-password"
													? "fa-user"
													: ""
											}`}
										/>
										{location.pathname === "/profile"
											? "Change Password"
											: location.pathname === "/change-password"
											? "Update Profile"
											: ""}
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});
BreadCrumb.displayName = "BreadCrumb";

export default BreadCrumb;
