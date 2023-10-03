import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Loader } from "../Loader/Loader";
import "./AddGoalModal.scss";

export const AddGoalModal = ({ setShowAddGoalModal }): JSX.Element => {
  const [formData, setFormData] = useState({
    goalName: "",
    description: "",
    targetDate: "",
    targetCalories: 0,
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { goalName, description, targetDate, targetCalories, status } =
    formData;
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(BASE_URL + "api/goals", {
        ...formData,
      });
      dispatch({ type: "UPDATE_GOAL", payload: response?.data?.goals });
      setShowAddGoalModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputUpdate = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="overlay" onClick={() => setShowAddGoalModal(false)}></div>
      <div className="addGoalModal">
        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="">
            Goal Name <br />{" "}
            <input
              type="text"
              onChange={(e) => handleInputUpdate(e.target.name, e.target.value)}
              name="goalName"
              value={goalName}
            />
          </label>
          <label htmlFor="">
            Description <br />{" "}
            <input
              type="text"
              onChange={(e) => handleInputUpdate(e.target.name, e.target.value)}
              name="description"
              value={description}
            />
          </label>
          <label htmlFor="">
            Target Date <br />{" "}
            <input
              type="date"
              onChange={(e) => handleInputUpdate(e.target.name, e.target.value)}
              name="targetDate"
              value={targetDate}
            />
          </label>{" "}
          <label htmlFor="">
            Target Calories <br />{" "}
            <input
              type="number"
              onChange={(e) => handleInputUpdate(e.target.name, e.target.value)}
              name="targetCalories"
              value={targetCalories}
            />
          </label>{" "}
          <label htmlFor="">
            Status <br />{" "}
            <select
              onChange={(e) => handleInputUpdate(e.target.name, e.target.value)}
              name="status"
              value={status}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="In Progress">In Progress</option>
              <option value="Achieved">Achieved</option>
              <option value="Abandoned">Abandoned</option>
            </select>
          </label>{" "}
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};
