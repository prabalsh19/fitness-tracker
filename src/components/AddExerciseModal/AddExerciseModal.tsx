import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./AddExerciseModal.scss";

export const AddExerciseModal = ({ setShowAddExerciseModal }): JSX.Element => {
  const [exerciseName, setExerciseName] = useState("");
  const [duration, setDuration] = useState(0);

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    console.log(BASE_URL);
    const response = await axios.post(BASE_URL + "api/exercises", {
      exerciseName,
      duration,
    });

    dispatch({ type: "UPDATE_EXERCISE", payload: response?.data?.exercises });

    setShowAddExerciseModal(false);
  };
  return (
    <>
      <div
        className="overlay"
        onClick={() => setShowAddExerciseModal(false)}
      ></div>
      <div className="addExerciseModal">
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            Exercise Name <br />{" "}
            <input
              type="text"
              onChange={(e) => setExerciseName(e.target.value)}
              value={exerciseName}
            />
          </label>
          <label htmlFor="">
            Duration (in minutes) <br />{" "}
            <input
              type="number"
              onChange={(e) => setDuration(Number(e.target.value))}
              value={duration}
            />
          </label>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};
