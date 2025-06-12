const initalState = {
  type: "profile",
  profile: null,
};

export const profile = (state = initalState, action) => {
  if (action.type === "profile") return action;
  return state;
};
