import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./ExerciseCard.scss";
import { Loader } from "../Loader/Loader";

type ExerciseCardProps = {
  _id: number;
  caloriesBurned: number;
  duration: number;
  exerciseName: string;
};

export const ExerciseCard = ({
  _id,
  caloriesBurned,
  duration,
  exerciseName,
}: ExerciseCardProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleRemoveExercise = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.delete(BASE_URL + "api/exercises/" + _id);
      dispatch({ type: "UPDATE_EXERCISE", payload: response?.data?.exercises });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="exerciseCard">
        <div className="exerciseCard__details">
          <b>{exerciseName}</b>
          <p>Calories Burned: {caloriesBurned} calories</p>
          <p>Duration: {duration}mins</p>
        </div>
        <button
          className="exerciseCard__removeBtn"
          onClick={handleRemoveExercise}
        >
          REMOVE
        </button>
      </div>
    </>
  );
};
