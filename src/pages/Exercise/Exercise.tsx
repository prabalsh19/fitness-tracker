import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ExerciseCard } from "../../components/ExerciseCard/ExerciseCard";
import "./Exercise.scss";
import { Loader } from "../../components/Loader/Loader";
import { AddExerciseModal } from "../../components/AddExerciseModal/AddExerciseModal";
import { stateType } from "../../redux/reducer";

export const Exercise = (): JSX.Element => {
  const exercises = useSelector((state: stateType) => state.exercises);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(baseUrl + "api/exercises");
        dispatch({
          type: "UPDATE_EXERCISE",
          payload: response?.data?.exercises,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  type Exercise = {
    _id: number;
    duration: number;
    exerciseName: string;
    caloriesBurned: number;
  };

  return (
    <div className="exercise">
      {!isLoading && (
        <>
          <button
            className="exercise__addBtn"
            onClick={() => setShowAddExerciseModal(true)}
          >
            Add Exercise
          </button>
          <div className="exercise__container">
            {exercises.length > 0 &&
              exercises.map(
                ({ _id, duration, caloriesBurned, exerciseName }: Exercise) => (
                  <ExerciseCard
                    key={_id}
                    _id={_id}
                    duration={duration}
                    caloriesBurned={caloriesBurned}
                    exerciseName={exerciseName}
                  />
                )
              )}
          </div>
        </>
      )}
      {showAddExerciseModal && (
        <AddExerciseModal setShowAddExerciseModal={setShowAddExerciseModal} />
      )}

      {isLoading && <Loader />}
    </div>
  );
};
