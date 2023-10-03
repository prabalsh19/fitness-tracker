import { useState } from "react";
import "./AddFoodModal.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Loader } from "../Loader/Loader";

export const AddFoodModal = ({ setShowAddFoodModal }): JSX.Element => {
  const [formData, setFormData] = useState({
    foodName: "",
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { foodName, carbohydrates, protein, fat, calories } = formData;
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(BASE_URL + "api/food", { ...formData });
      dispatch({ type: "UPDATE_FOOD", payload: response?.data?.food });
      setShowAddFoodModal(false);
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
      <div className="overlay" onClick={() => setShowAddFoodModal(false)}></div>
      <div className="addFoodModal">
        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="">
            Food Name <br />{" "}
            <input
              type="text"
              onChange={(e) => handleInputUpdate(e.target.name, e.target.value)}
              name="foodName"
              value={foodName}
            />
          </label>
          <label htmlFor="">
            Calories <br />{" "}
            <input
              type="number"
              onChange={(e) => handleInputUpdate(e.target.name, e.target.value)}
              name="calories"
              value={calories}
            />
          </label>
          <label htmlFor="">
            Protein (in grams) <br />{" "}
            <input
              type="number"
              onChange={(e) => handleInputUpdate(e.target.name, e.target.value)}
              name="protein"
              value={protein}
            />
          </label>
          <label htmlFor="">
            Carbohydrates (in grams) <br />{" "}
            <input
              type="number"
              onChange={(e) => handleInputUpdate(e.target.name, e.target.value)}
              name="carbohydates"
              value={carbohydrates}
            />
          </label>
          <label htmlFor="">
            Fat (in grams) <br />{" "}
            <input
              type="number"
              onChange={(e) => handleInputUpdate(e.target.name, e.target.value)}
              name="fat"
              value={fat}
            />
          </label>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};
