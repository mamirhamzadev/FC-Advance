import { differenceInMilliseconds, format, isValid } from "date-fns";

/**
 * Converts the given date to a Date object or formatted string based on a pattern.
 *
 * @param {string|Date} date - The date to convert. Can be a string or Date object.
 * @param {string} [pattern] - The pattern to use for formatting the date string.
 * @returns {(Date|string|null)} A Date object, formatted date string, or null if input is invalid.
 */
export const convertToDate = (date, pattern) => {
	if (!date) return null;

	let formattedDate;

	if (typeof date === "string" && date.includes("T")) {
		formattedDate = new Date(date);
	} else if (date instanceof Date) {
		formattedDate = date;
	}
	return isValid(formattedDate) ? (pattern ? format(formattedDate, pattern) : formattedDate) : null;
};

/**
 * Calculates the time difference between two dates and returns it in a human-readable format.
 *
 * @param {string|Date} startTime - The start time.
 * @param {string|Date} endTime - The end time.
 * @returns {string} The formatted time difference as a string with hours, minutes, and seconds.
 */
export const calculateFormattedTimeDifference = (startTime, endTime) => {
	const startDate = new Date(startTime);
	const endDate = new Date(endTime);

	const timeDifferenceInMilliseconds = differenceInMilliseconds(endDate, startDate);

	const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
	const minutes = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timeDifferenceInMilliseconds % (1000 * 60)) / 1000);

	const parts = [];

	if (hours > 0) {
		parts.push(`${hours}h`);
	}
	if (minutes > 0) {
		parts.push(`${minutes}m`);
	}
	if (seconds > 0) {
		parts.push(`${seconds}s`);
	}

	return parts.join(" ");
};

/**
 * Converts a file to a base64 encoded string.
 *
 * @param {File} file - The file to be converted.
 * @returns {Promise<string>} A promise that resolves with the base64 encoded string of the file.
 */
export const convertBase64 = (file) =>
	new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});

/**
 * Handles form data input changes and updates the state accordingly.
 *
 * @param {Object} event - The event triggered on input change.
 * @param {Function} setFormData - The state setter function for the form data.
 */
export const handleFormDataInput = (event, setFormData) => {
	const { name, value, valueAsNumber, type } = event.target;
	const parts = name.split(".");
	const updateState = (state, parts, value) => {
		const newState = { ...state };
		let currentLevel = newState;

		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];

			// If it's not the last part, continue deep cloning, otherwise set the value
			if (i < parts.length - 1) {
				currentLevel[part] = currentLevel[part] ? { ...currentLevel[part] } : {};
				currentLevel = currentLevel[part];
			} else {
				// Only set the `valueAsNumber` if it's a number and the type of input allows for a numeric value
				currentLevel[part] = type === "number" || type === "range" ? valueAsNumber : value;
			}
		}

		return newState;
	};

	setFormData((prevState) => updateState(prevState || {}, parts, value));
};

/**
 * Handles form data input changes for select options and updates the state accordingly.
 *
 * @param {Array|Object} selectedOptions - The selected option(s).
 * @param {Function} setFormData - The state setter function for the form data.
 * @param {string} key - The key in the form data object to update.
 */
export const handleSelectInput = (selectedOption, setFormData, key) => {
	let value;

	// Extract the selected value (assuming selectedOption is an object with a 'value' property)
	value = selectedOption?.value; // Safely extract the value, handling potential undefined selectedOption

	// Update form data state with the single value
	setFormData((prevState) => ({
		...prevState,
		[key]: value,
	}));

	// No need for nested state update logic if key doesn't involve nested objects
	// (remove the updateState function and its usage)
};

/**
 * Handles file downloading by simply getting the url.
 *
 * @param {Object} event - The event triggered on input change.
 * @param {Function} setFormData - The state setter function for the form data.
 */
export const handleDownloadFile = async (imageUrl, fileName = "downloaded-image.jpg") => {
	try {
		const response = await fetch(imageUrl);

		if (!response.ok) {
			throw new Error(`Failed to fetch image: ${response.statusText}`);
		}

		const blob = await response.blob();
		const blobUrl = URL.createObjectURL(blob);
		const downloadLink = document.createElement("a");
		downloadLink.href = blobUrl;
		downloadLink.download = fileName;

		downloadLink.click();

		URL.revokeObjectURL(blobUrl);
	} catch (error) {
		console.error("Error fetching or creating blob:", error);
	}
};

export const formatSalaryTypeInPer = (type) => {
	if (!type) return "";
	const typeMap = {
		hourly: "per hour",
		daily: "per day",
		weekly: "per week",
		monthly: "per month",
		quarterly: "per quarter",
		annual: "per year",
	};
	return typeMap[type] || type;
};

export const getStatusBadgeBackgroundColor = (status) => {
	const statusColors = {
		draft: "danger",
		submitted: "success",
		interviewing: "info",
		accepted: "primary",
		rejected: "danger",
		archived: "dark",
	};

	return statusColors[status] || "info";
};
