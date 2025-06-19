const repToken = localStorage.getItem("rep-token");
const initalState = {
  type: "rep",
  isAuthorized: !!repToken,
};

export const repAuthrorized = (state = initalState, action) => {
  if (action.type === "rep") return action;
  return state;
};
