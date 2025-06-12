import { HTTP_STATUS_CODES } from "../utils/constants";

export const apiErrorHandler = (error, notify, logoutUser) => (dispatch) => {
	// Handle other error scenarios and dispatch appropriate actions
	switch (error?.httpCode) {
		case HTTP_STATUS_CODES?.NO_CONTENT:
			notify("info", error?.message ? error.message : "No content available.");
			break;

		case HTTP_STATUS_CODES?.BAD_REQUEST:
			notify("error", error?.message ? error.message : "Bad request. Please check your input.");
			break;

		case HTTP_STATUS_CODES?.NOTFOUND:
			notify("warning", error?.message ? error.message : "Requested resource not found.");
			break;

		case HTTP_STATUS_CODES?.NOT_ACCEPTABLE:
			notify("warning", error?.message ? error.message : "Request not acceptable.");
			break;

		case HTTP_STATUS_CODES?.CONFLICT:
			notify("error", error?.message ? error.message : "Conflict. The resource already exists.");
			break;

		case HTTP_STATUS_CODES?.GONE:
			notify("warning", error?.message ? error.message : "Resource gone. It's no longer available.");
			break;

		case HTTP_STATUS_CODES?.UNPROCESSABLE_ENTITY:
			notify("error", error?.message ? error.message : "Unprocessable Entity. Invalid data provided.");
			break;

		case HTTP_STATUS_CODES?.UNAUTHORIZED:
			notify("error", error?.message ? error.message : "Your session has expired. Please log in again.");
			break;

		case HTTP_STATUS_CODES?.INVALID_TOKEN:
			notify("error", error?.message ? error.message : "Invalid Token. Please log in again.");
			dispatch(logoutUser()).then(() => (window.location.href = "/"));
			break;

		case HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR:
			notify("error", error?.payload?.error ? error.payload.error : "Internal Server Error. Please try again later.");
			break;

		default:
			notify("error", error?.message ? error.message : "An error occurred. Please try again.");
			break;
	}
};
