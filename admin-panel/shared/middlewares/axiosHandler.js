import axios from "axios";
import { HTTP_STATUS_CODES } from "../utils/constants";

const instance = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,
	timeout: 50000, // Timeout after 5 minutes. Adjust as necessary.
});

instance.interceptors.response.use(
	(response) => {
		// Check code within JSON body for actual status
		if (response.data?.httpCode !== HTTP_STATUS_CODES?.OK && response.data?.httpCode !== HTTP_STATUS_CODES?.CREATED) {
			// You can add more custom logic based on the code here
			throw response.data;
		}

		return response.data;
	},
	(error) => {
		// Handle network errors (timeouts, no response, etc.)
		if (error.message === "Network Error") {
			throw new Error("Server is not responding. Please try again later.");
		}

		// If error response is available, use its message
		if (error.response) {
			throw new Error(error.response.data.message);
		}

		// Generic error message
		throw new Error("An unexpected error occurred.");
	},
);

export default instance;
