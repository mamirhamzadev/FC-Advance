const initalState = {
  type: "rep",
  isAuthorized: false,
};

export const repAuthrorized = (state = initalState, action) => {
  if (action.type === "rep") return action;
  return state;
};
