import { Link } from "react-router-dom";
import React from "react";

const DashboardInfoCard = React.memo((props) => {
	return (
		<Link to={`/${props?.page}`} className="col-md-3">
			<div className="rounded-2 px-6 py-5 bg-white shadow-sm h-100">
				<div className="d-flex justify-content-between">
					<div className="symbol symbol-30px me-5 mb-8">
						<span className="symbol-label" style={{ background: "none" }}>
							<span className={`fs-2qx fa ${props?.icon}`} style={{ color: "#d21825" }}></span>
						</span>
					</div>

					{!props?.isFetching ? (
						<div className="symbol me-5 mb-8">
							<span className="fw-boldest d-block fs-2qx lh-1 mb-1" style={{ color: "#d21825" }}>
								{(props?.count || 0).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
							</span>
						</div>
					) : (
						<>~</>
					)}
				</div>

				<div className="mt-10">
					<h6 className="fw-bold fs-4" style={{ color: "#d21825" }}>
						{props?.title}
					</h6>
				</div>
			</div>
		</Link>
	);
});

DashboardInfoCard.displayName = "DashboardInfoCard";

export default DashboardInfoCard;
