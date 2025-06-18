export const setRepAuthorized = (isAuthorized = true) => {
  return {
    type: "rep",
    isAuthorized: !!isAuthorized,
  };
};
