import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Loader } from "../Loader/Loader";
import "./FoodCard.scss";

type FoodCardProps = {
  _id: number;
  foodName: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
};

export const FoodCard = ({
  _id,
  foodName,
  calories,
  protein,
  carbohydrates,
  fat,
}: FoodCardProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleRemoveFood = async () => {
    try {
      setIsLoading(true);
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.delete(BASE_URL + "api/food/" + _id);
      dispatch({ type: "UPDATE_FOOD", payload: response?.data?.food });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loader />}

      <div className="foodCard">
        <div className="foodCard__details">
          <b>{foodName}</b>
          <p>Calories: {calories} calories</p>
          <p>Protein: {protein}g</p>
          <p>Carbohydrates: {carbohydrates}g</p>
          <p>Fat: {fat}g</p>
        </div>
        <button className="foodCard__removeBtn" onClick={handleRemoveFood}>
          REMOVE
        </button>
      </div>
    </>
  );
};
