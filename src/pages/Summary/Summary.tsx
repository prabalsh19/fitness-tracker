import { InfoCard } from "../../components/InfoCard/InfoCard";
import { useEffect, useState } from "react";
import "./Summary.scss";
import axios from "axios";
import { Loader } from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";

export const Summary = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const exercise = await axios.get(BASE_URL + "api/exercises");
        const food = await axios.get(BASE_URL + "api/food");
        const goals = await axios.get(BASE_URL + "api/goals");
        dispatch({ type: "UPDATE_EXERCISE", payload: exercise.data.exercises });
        dispatch({ type: "UPDATE_FOOD", payload: food.data.food });
        dispatch({ type: "UPDATE_GOAL", payload: goals.data.goal });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  const totalCaloriesBurned = state.exercises.reduce(
    (acc, cur) => acc + cur.caloriesBurned,
    0
  );
  const totalCaloriesConsumed = state.food.reduce(
    (acc, cur) => acc + cur.calories,
    0
  );
  // const totalCalories = state.goals.reduce(
  //   (acc, cur) => acc + cur.targetCalories,
  //   0
  // );
  console.log(state);
  // const remainingGoal = totalCalories - totalCaloriesConsumed;
  return (
    <>
      {isLoading && <Loader />}
      <div className="summary">
        <InfoCard heading="Total Calories Burned" value={totalCaloriesBurned} />
        <InfoCard
          heading="Total Calories Consumed"
          value={totalCaloriesConsumed}
        />
        <InfoCard heading="Total Calories Goal" value={10} />
        <InfoCard heading="Remaining Calories to Goal" value={0} />
      </div>
    </>
  );
};
