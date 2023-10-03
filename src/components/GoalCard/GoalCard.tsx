import { useState } from "react";
import { Loader } from "../Loader/Loader";
import "./GoalCard.scss";
import axios from "axios";
import { useDispatch } from "react-redux";

type GoalProps = {
  _id: number;
  goalName: string;
  description: string;
  targetDate: Date;
  targetCalories: number;
  status: "In Progress" | "Achieved" | "Abandoned";
};

export const GoalCard = ({
  _id,
  goalName,
  description,
  targetDate,
  targetCalories,
  status,
}: GoalProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleRemoveGoal = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.delete(BASE_URL + "api/goals/" + _id);
      dispatch({ type: "UPDATE_GOAL", payload: response?.data?.goals });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="goalCard">
        <div className="goalCard__details">
          <b>{goalName}</b>
          <p>Description: {description}</p>
          <p>Target Date: {new Date(targetDate).toDateString()}</p>
          <p>Target Calories: {targetCalories}</p>
          <p>Status: {status}</p>
        </div>
        <button className="goalCard__removeBtn" onClick={handleRemoveGoal}>
          REMOVE
        </button>
      </div>
    </>
  );
};
