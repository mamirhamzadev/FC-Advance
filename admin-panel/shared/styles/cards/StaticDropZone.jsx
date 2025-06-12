import { useRef, useCallback } from "react";

const StaticDropzone = (props) => {
	const fileDropZone = useRef();

	const renderFileIcon = (fileName) => {
		const extension = fileName.split("/").pop().toLowerCase();
		const iconStyle = "text-primary text-2xl";

		// switch (extension) {
		// 	case "pdf":
		// 		return <FaFilePdf className={iconStyle} />;

		// 	case "xlsx":
		// 	case "xls":
		// 		return <FaFileExcel className={iconStyle} />;

		// 	case "csv":
		// 		return <TbFileTypeCsv className={iconStyle} />;

		// 	default:
		// 		return <MdAttachFile className={iconStyle} />;
		// }
	};

	const handleDragOver = useCallback((e) => {
		e.preventDefault();
	}, []);

	const handleDrop = useCallback(
		(e) => {
			e.preventDefault();
			if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
				props.handleSubmit(e.dataTransfer.files);
				e.dataTransfer.clearData();
			}
		},
		[props],
	);

	// const handleDragEnter = useCallback((e) => {
	// 	e.preventDefault();
	// 	// Optionally update the state to show some visual feedback
	// }, []);

	// const handleDragLeave = useCallback((e) => {
	// 	e.preventDefault();
	// 	// Optionally update the state to revert visual feedback
	// }, []);

	const removeFile = (index) => {
		const updatedFiles = Array.from(props.formData.files);
		updatedFiles.splice(index, 1);
		props.handleSubmit(updatedFiles);
	};

	return (
		<>
			{/* <div className="w-100">
				<div className="fv-row mb-7">
					<div className="file-upload" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
						<div className="dashed-border">
							<i className="fa fa-file file-icon"></i>
							<div className="upload-section">
								<p className="upload">
									<label className="fw-bolder" htmlFor="filePicker">
										Browse&nbsp;
									</label>
									To Upload File
								</p>
								<input id="filePicker" type="file" multiple onChange={handleInputChange} />
							</div>
						</div>
					</div>
				</div>

				<div className="d-flex mb-5 justify-content-center flex-wrap">
					{props.images.map((image, index) => (
						<div
							key={index}
							draggable
							onDragStart={() => (dragDiv.current = index)}
							onDragEnter={() => (dragOverDiv.current = index)}
							onDragEnd={handleSort}
							onDragOver={(e) => e.preventDefault()}>
							<div className="drop-images rounded">
								<img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
								<a onClick={() => handleDelete(index)}>
									<i className="fa fa-times-circle-o"></i>
								</a>
							</div>
							{index === 0 && <h6 className="fw-bold fs-6 mb-2 text-center">Feature</h6>}
						</div>
					))}
				</div>
			</div> */}

			<div className="flex flex-col items-center justify-center w-full space-y-2">
				<div
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					// onDragEnter={handleDragEnter}
					// onDragLeave={handleDragLeave}
					className="file-upload">
					<div className="dashed-border" onClick={() => fileDropZone.current.click()}>
						{/* <AiOutlineCloudUpload className="text-primary text-3xl" /> */}
						<p className="mb-2 text-sm text-primary">
							<span className="font-semibold">Click here to upload</span> or drag and drop
						</p>
					</div>

					{props?.formData?.files?.length > 0 && (
						<div>
							<p className="mb-2 text-sm text-primary">
								Total Files:<span className="font-semibold"> {props?.formData?.files?.length}</span>
							</p>
						</div>
					)}

					{props?.showFiles && props?.formData?.files?.length > 0 && (
						<div className="flex w-full items-center justify-center p-2 space-x-2">
							{Array.from(props.formData.files).map((file, index) => (
								<div
									key={index}
									className="relative flex bg-primary border-2 rounded-lg p-2 items-center justify-center space-y-2">
									<div className="flex w-full items-center justify-between">
										<div>{renderFileIcon(file?.type)}</div>
										<p className="font-medium italic text-sm text-justify break-all">
											{(file?.size / 1024).toFixed(2)} KB
										</p>
									</div>
									<p className="text-sm text-center break-all">{file?.name}</p>
									{/* <IoMdCloseCircle
										className="text-xl text-primary absolute -top-4 -right-2 smooth hover:text-primary cursor-pointer"
										onClick={() => removeFile(index)}
									/> */}
								</div>
							))}
						</div>
					)}
					<input
						ref={fileDropZone}
						type="file"
						className="hidden"
						accept={props?.accept}
						multiple={props?.multiple}
						onChange={(e) => props?.handleSubmit(e.target.files)}
					/>
				</div>
			</div>
		</>
	);
};

export default StaticDropzone;
