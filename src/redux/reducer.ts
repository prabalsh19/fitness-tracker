const initalState = {
  exercises: [],
  food: [],
  goals: [],
};

export const reducer = (state = initalState, action) => {
  switch (action.type) {
    case "UPDATE_EXERCISE":
      return { ...state, exercises: action.payload };
    case "UPDATE_FOOD":
      return { ...state, food: action.payload };
    case "UPDATE_GOAL":
      return { ...state, goals: action.payload };
    default:
      return state;
  }
};
