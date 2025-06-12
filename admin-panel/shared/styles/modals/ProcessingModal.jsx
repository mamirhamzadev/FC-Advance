import React from "react";
import { LottieIcon } from "../icons/LottieIcon";
import Modal from "react-bootstrap/Modal";

const ProcessingModal = React.memo((props) => {
	return (
		<>
			<Modal
				show={props?.isOpen}
				onHide={null} // Prevents closing on outside click
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				backdrop="static" // Prevents closing on ESC key press
				keyboard={false} // Prevents closing on pressing ESC key
			>
				<Modal.Header closeButton={false}>
					{" "}
					{/* Removes close button */}
					<Modal.Title id="contained-modal-title-vcenter">
						<h5 className="modal-title">{props?.heading}</h5>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="d-flex flex-column  me-n7 pe-7 text-center">
						<div className="row justify-content-center">
							{props?.icon && <LottieIcon iconType={props.icon} style={{ width: "250px", height: "250px" }} />}
						</div>

						<div className="fv-row mb-7">
							<label className="required fw-bold fs-4 mb-2">{props?.progress}</label>

							<label className="required fw-bold fs-6 mb-2">{props?.description}</label>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
						{props?.handleSubmit && (
							<button type="button" className="btn btn-light" onClick={() => props?.handleSubmit(false)}>
								Cancel
							</button>
						)}
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
});
ProcessingModal.displayName = "ProcessingModal";
export default ProcessingModal;
