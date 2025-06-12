const adminFooter = () => {
	const currentYear = new Date().getFullYear();

	return (
		<div className="container mt-auto">
			<div className="row mt-5">
				<div className="col-12 text-center">
					<p className="footer__text">
						Copyright <i className="fa fa-copyright"></i> {currentYear}&nbsp;
						<a href="https://single-solution.com/" target="__blank" style={{ textDecoration: "underline" }}>
							Single Solution
						</a>
						. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	);
};

export default adminFooter;
