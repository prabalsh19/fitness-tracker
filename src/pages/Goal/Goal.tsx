import { useState, useEffect } from "react";
import "./Goal.scss";
import axios from "axios";
import { Loader } from "../../components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { GoalCard } from "../../components/GoalCard/GoalCard";
import { AddGoalModal } from "../../components/AddGoalModal/AddGoalModal";

export const Goal = (): JSX.Element => {
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const goals = useSelector((state) => state.goals);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(BASE_URL + "api/goals");
        dispatch({ type: "UPDATE_GOAL", payload: response?.data?.goal });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  type Goal = {
    _id: number;
    goalName: string;
    description: string;
    targetDate: Date;
    targetCalories: number;
    status: "In Progress" | "Achieved" | "Abandoned";
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="goal">
          <button
            className="goal__addBtn"
            onClick={() => setShowAddGoalModal(true)}
          >
            Add Goal
          </button>
          <div className="food__container">
            {goals?.length > 0 &&
              goals?.map((goal: Goal) => (
                <GoalCard key={goal._id} _id={goal._id} {...goal} />
              ))}
          </div>
        </div>
      )}
      {showAddGoalModal && (
        <AddGoalModal setShowAddGoalModal={setShowAddGoalModal} />
      )}
    </>
  );
};
