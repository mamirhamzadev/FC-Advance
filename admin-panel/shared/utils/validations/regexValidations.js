export const usernameValidation = new RegExp(/^[A-Za-z][A-Za-z0-9_]{7,}$/);
export const emailValidation = new RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);
export const passwordValidation = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[._!@#$%^&*])(?=.{8,})/);
export const mediumPasswordValidation = new RegExp(
	/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{7,})/,
);
export const strongPasswordValidation = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})/);
export const stringSpaceValidation = new RegExp(/^\S*$/);
export const urlValidation = new RegExp(/(((https?:\/\/)?(www\.)?)?[^\s]+(\.\w+(\.\w+)*))\b/g);
