export const HTTP_STATUS_CODES = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOTFOUND: 404,
	NOT_ACCEPTABLE: 406,
	CONFLICT: 409,
	GONE: 410,
	UNPROCESSABLE_ENTITY: 422,
	INVALID_TOKEN: 498,
	INTERNAL_SERVER_ERROR: 500,
};

export const MODAL_VARIANT_CONFIGS = {
	hidden: { opacity: 0, scale: 0.7 },
	visible: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.1 },
};

export const SWAL_VARIANT_CONFIGS = {
	delete: {
		before: {
			title: "Are you sure?",
			text: "Do you really want to delete this Record permanently?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel!",
			reverseButtons: true,
		},
		after: {
			title: "Deleted!",
			text: "Record has been deleted.",
			icon: "success",
			showConfirmButton: false,
			timer: 1000,
		},
	},
	update: {
		before: {
			title: "Are you sure?",
			text: "This action will change the record. You can reverse this action later if needed.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, change it!",
			cancelButtonText: "No, cancel!",
			reverseButtons: true,
		},
		after: {
			title: "Successfully Changed!",
			text: "Record has been Updated.",
			icon: "success",
			showConfirmButton: false,
			timer: 1000,
		},
	},
	create: {
		after: {
			title: "Record Created!",
			text: "Record has been Created.",
			icon: "success",
			showConfirmButton: false,
			timer: 1000,
		},
	},
	logout: {
		before: {
			title: "Session Expired",
			text: "Your session has expired, you need to login again to use the app",
			icon: "warning",
			showCancelButton: false,
			confirmButtonColor: "#C10105",
			confirmButtonText: "Login",
			allowOutsideClick: false,
		},
	},
};

export const PROPOSAL_STATUSES = [
	{ label: "Draft", value: "draft" },
	{ label: "Submitted", value: "submitted" },
	{ label: "Interviewing", value: "interviewing" },
	{ label: "Accepted", value: "accepted" },
	{ label: "Rejected", value: "rejected" },
	{ label: "Archived", value: "archived" },
];

export const SALARY_TYPES = [
	{ label: "Hourly", value: "hourly" },
	{ label: "Daily", value: "daily" },
	{ label: "Weekly", value: "weekly" },
	{ label: "Monthly", value: "monthly" },
	{ label: "Quarterly", value: "quarterly" },
	{ label: "Annual", value: "annual" },
];
