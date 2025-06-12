export const getToken = () => {
	try {
		const authToken = localStorage.getItem("authToken");

		if (authToken) return authToken;
		else return null;
	} catch (error) {
		return error;
	}
};

export const setToken = async (authToken) => {
	try {
		localStorage.setItem("authToken", authToken);

		const dbToken = getToken();

		if (dbToken) return dbToken;
		else return null;
	} catch (error) {
		return error;
	}
};
