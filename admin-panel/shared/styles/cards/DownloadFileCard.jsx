const DownloadFileCard = (props) => {
	return (
		<div className="col-md-6 col-lg-12 col-xl-3">
			<div className="card shadow-sm  mb-6 mb-xl-9">
				<div id="kt_docs_card_collapsible" className="collapse show">
					<div className="card-body">
						<div className="text-center px-4 ">
							<img className="mw-100 mh-300px card-rounded-bottom" alt="" src={`assets/${props.image}`} />
						</div>
					</div>
					<div className="card-footer text-center">
						<h4 className="mb-3">{props.title}</h4>
						<a href="#" className="btn bg_btn_small text-white fw-bolder" id="kt_toolbar_primary_button">
							<i className="me-2 fw-bolder text-white fa fa-download" />
							Download
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DownloadFileCard;
