import { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Modal from "react-bootstrap/Modal";
import { urlValidation } from "../../utils/validations/regexValidations";

// Remove background color from the image
const removeBackground = (imageData) => {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	const img = new Image();
	img.src = imageData;
	img.crossOrigin = "Anonymous";

	return new Promise((resolve, reject) => {
		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);

			try {
				const imageDataCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height);
				const data = imageDataCanvas.data;

				// Adjust the threshold for color similarity
				const threshold = 80;

				// Define the color to remove (white) and the shadow color (black or gray)
				const targetColor = [255, 255, 255]; // RGB values for white
				const shadowColor = [0, 0, 0]; // RGB values for shadow (black) or gray
				const maxColor = [207, 207, 207]; // RGB values for #CFCFCF

				for (let i = 0; i < data.length; i += 4) {
					const pixelColor = [data[i], data[i + 1], data[i + 2]];

					const colorDiff =
						Math.abs(pixelColor[0] - targetColor[0]) +
						Math.abs(pixelColor[1] - targetColor[1]) +
						Math.abs(pixelColor[2] - targetColor[2]);

					const shadowDiff =
						Math.abs(pixelColor[0] - shadowColor[0]) +
						Math.abs(pixelColor[1] - shadowColor[1]) +
						Math.abs(pixelColor[2] - shadowColor[2]);

					const maxDiff =
						Math.abs(pixelColor[0] - maxColor[0]) +
						Math.abs(pixelColor[1] - maxColor[1]) +
						Math.abs(pixelColor[2] - maxColor[2]);

					if (colorDiff < threshold || shadowDiff < threshold || maxDiff < threshold) {
						data[i + 3] = 0;
					}
				}

				ctx.putImageData(imageDataCanvas, 0, 0);

				const modifiedImage = new Image();
				modifiedImage.onload = () => resolve(modifiedImage);
				modifiedImage.src = canvas.toDataURL();
			} catch (error) {
				console.error("Error retrieving pixel data:", error);
				reject(error);
			}
		};

		img.onerror = (error) => {
			console.error("Image loading error:", error);
			reject(error);
		};
	});
};

const getDominantColor = (image, targetColor) => {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	return new Promise((resolve, reject) => {
		if (image.complete) {
			processImage();
		} else {
			image.onload = processImage;
		}

		function processImage() {
			canvas.width = image.width;
			canvas.height = image.height;
			ctx.drawImage(image, 0, 0);

			const startX = Math.floor(canvas.width / 4); // Adjust as needed
			const endX = Math.floor((canvas.width / 4) * 3); // Adjust as needed
			const startY = Math.floor(canvas.height / 4); // Adjust as needed
			const endY = Math.floor((canvas.height / 4) * 3); // Adjust as needed

			let closestColor = null;
			let minColorDiff = Number.MAX_SAFE_INTEGER;

			// Sample multiple points within the shirt region
			for (let x = startX; x < endX; x += 10) {
				for (let y = startY; y < endY; y += 10) {
					const pixelData = ctx.getImageData(x, y, 1, 1).data;
					const sampledColor = `#${(
						"000000" + ((pixelData[0] << 16) | (pixelData[1] << 8) | pixelData[2]).toString(16)
					).slice(-6)}`;
					const colorDiff = getColorDifference(sampledColor, targetColor);

					if (colorDiff < minColorDiff) {
						closestColor = sampledColor;
						minColorDiff = colorDiff;
					}
				}
			}

			resolve(closestColor);
		}

		function getColorDifference(color1, color2) {
			// Validate color strings
			if (!color1 || !color2 || typeof color1 !== "string" || typeof color2 !== "string") {
				console.error("Invalid color strings provided.");
				return -1; // Return an error value or handle it appropriately
			}

			// Parse the hexadecimal strings to RGB values
			const hexToRgb = (hex) => {
				// Remove the # symbol if present
				hex = hex.replace(/^#/, "");

				// Parse the hexadecimal string to RGB values
				const r = parseInt(hex.substring(0, 2), 16);
				const g = parseInt(hex.substring(2, 4), 16);
				const b = parseInt(hex.substring(4, 6), 16);

				return { r, g, b };
			};

			// Convert both colors to RGB format
			const rgb1 = hexToRgb(color1);
			const rgb2 = hexToRgb(color2);

			// Calculate the absolute differences in RGB values
			const diffR = Math.abs(rgb1.r - rgb2.r);
			const diffG = Math.abs(rgb1.g - rgb2.g);
			const diffB = Math.abs(rgb1.b - rgb2.b);

			// Return the sum of absolute differences
			return diffR + diffG + diffB;
		}

		image.onerror = (error) => {
			console.error("Image loading error:", error);
			reject(error);
		};
	});
};

// // Calculate the dominant color (average color approach)
// const getDominantColor = (image) => {
// 	const canvas = document.createElement("canvas");
// 	const ctx = canvas.getContext("2d");

// 	return new Promise((resolve, reject) => {
// 		if (image.complete) {
// 			processImage();
// 		} else {
// 			image.onload = processImage;
// 		}

// 		function processImage() {
// 			canvas.width = image.width;
// 			canvas.height = image.height;
// 			ctx.drawImage(image, 0, 0);

// 			const centerX = Math.floor(canvas.width / 4);
// 			const bottomY = canvas.height - 200;

// 			try {
// 				const pixelData = ctx.getImageData(centerX, bottomY, 1, 1).data;
// 				const color = `#${("000000" + ((pixelData[0] << 16) | (pixelData[1] << 8) | pixelData[2]).toString(16)).slice(-6)}`;
// 				resolve(color);
// 			} catch (error) {
// 				console.error("Error retrieving pixel data:", error);
// 				reject(error);
// 			}
// 		}

// 		image.onerror = (error) => {
// 			console.error("Image loading error:", error);
// 			reject(error);
// 		};
// 	});
// };

const setCanvasImage = (image, canvas, crop) => {
	if (!image || !canvas || !crop) return;

	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	const ctx = canvas.getContext("2d");

	const pixelRatio = window.devicePixelRatio;

	canvas.width = crop.width * pixelRatio * scaleX;
	canvas.height = crop.height * pixelRatio * scaleY;

	ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
	ctx.imageSmoothingQuality = "high";

	// Clear the canvas to make it transparent
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the image with a transparent background
	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width * scaleX,
		crop.height * scaleY,
	);
};

const ImageEditAndCropModal = (props) => {
	const imgRef = useRef(null);
	const previewCanvasRef = useRef(null);

	const [imageToEdit, setImageToEdit] = useState();
	const [crop, setCrop] = useState({});

	const setImageToShow = useCallback((img) => {
		imgRef.current = img.target;
	}, []);

	useEffect(() => {
		if (props.image) handleReceiveImage(props.image);
	}, [props]);

	useEffect(() => {
		if (crop) setCanvasImage(imgRef.current, previewCanvasRef.current, crop);
	}, [crop]);

	const handleReceiveImage = (image) => {
		if (!image) return;

		if (typeof image === "string" && urlValidation.test(image)) {
			setImageToEdit(image);
			// setCrop({ x: 50, y: 50, width: 150, height: 150, unit: "px" });
		} else if (image instanceof Blob) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				setImageToEdit(reader.result);
				// setCrop({ x: 50, y: 50, width: 150, height: 150, unit: "px" });
			});
			reader.readAsDataURL(image);
		}
	};

	const handleRescaleImage = async () => {
		const canvas = previewCanvasRef.current;
		const targetWidth = 740;
		const targetHeight = 1053;
		const topBorderSize = 270;
		const bottomBorderSize = 200;
		const leftBorderSize = 350;
		const rightBorderSize = 350;

		if (!canvas || !imageToEdit) {
			console.error("Canvas or image data is missing.");
			return;
		}

		const ctx = canvas.getContext("2d");

		canvas.width = targetWidth + leftBorderSize + rightBorderSize;
		canvas.height = targetHeight + topBorderSize + bottomBorderSize;

		try {
			// const bgRemovedImage = await removeBackground(imageToEdit);
			// const dominantColor = await getDominantColor(bgRemovedImage);
			const bgRemovedImage = imgRef.current;
			const dominantColor = null;

			// Fill canvas with dominant color
			ctx.fillStyle = dominantColor || "#ffffff";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Draw image with border
			ctx.drawImage(bgRemovedImage, leftBorderSize, topBorderSize, targetWidth, targetHeight);
		} catch (error) {
			console.error("Error processing image:", error);
		}
	};

	const handleSubmitImage = () => {
		const canvas = previewCanvasRef.current;

		if (!canvas || !crop) {
			console.error("Canvas or crop data is missing.");
			return;
		}

		canvas.toBlob((blob) => {
			if (!blob) {
				console.error("Failed to generate blob from canvas.");
				return;
			}

			const file = new File([blob], "cropped-image" + props?.image?.type.split("/").pop(), { type: props?.image?.type });
			props.handleSubmit(file);
		}, props?.image?.type);
	};

	return (
		<Modal
			show={props.isOpen}
			onHide={() => props.setIsOpen(false)}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">IMAGE EDIT & CROP</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="card-body p-1 px-4">
					<div className="row">
						<div className="col-lg-6">
							{/* <img className="w-100" src={imageToEdit} onLoad={setImageToShow} alt="Crop preview" /> */}
							<ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
								<img className="w-100" src={imageToEdit} onLoad={setImageToShow} alt="Crop preview" />
							</ReactCrop>
						</div>
						<div className="col-lg-6">
							<canvas className="w-100" ref={previewCanvasRef} />
						</div>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
					<button type="button" className="btn btn-light" onClick={() => props.setIsOpen(false)}>
						Close
					</button>
					<button className="bg-primary text-white btn rounded-md capitalize" onClick={handleRescaleImage}>
						Auto Scale image
					</button>
					{crop && (
						<button className="bg-primary text-white btn rounded-md capitalize" onClick={handleSubmitImage}>
							Submit
						</button>
					)}
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default ImageEditAndCropModal;
