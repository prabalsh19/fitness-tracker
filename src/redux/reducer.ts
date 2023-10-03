export type stateType = {
  exercises: {
    _id: number;
    duration: number;
    exerciseName: string;
    caloriesBurned: number;
  }[];
  food: {
    _id: number;
    foodName: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  }[];
  goals: {
    _id: number;
    goalName: string;
    description: string;
    targetDate: Date;
    targetCalories: number;
    status: "In Progress" | "Achieved" | "Abandoned";
  }[];
};
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
