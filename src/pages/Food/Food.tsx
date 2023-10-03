import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./Food.scss";
import { FoodCard } from "../../components/FoodCard/FoodCard";
import { Loader } from "../../components/Loader/Loader";
import { AddFoodModal } from "../../components/AddFoodModal/AddFoodModal";

export const Food = (): JSX.Element => {
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const food = useSelector((state) => state.food);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(BASE_URL + "api/food");
        dispatch({ type: "UPDATE_FOOD", payload: response?.data?.food });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="food">
          <button
            className="food__addBtn"
            onClick={() => setShowAddFoodModal(true)}
          >
            Add Food
          </button>
          <div className="food__container">
            {food.length > 0 &&
              food.map((food: Food) => (
                <FoodCard key={food._id} _id={food._id} {...food} />
              ))}
          </div>
        </div>
      )}
      {showAddFoodModal && (
        <AddFoodModal setShowAddFoodModal={setShowAddFoodModal} />
      )}
    </>
  );
};
