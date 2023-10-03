import { NavLink } from "react-router-dom";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Fitrack</h1>
      <div className="navbar__greeting">
        <p>
          Hello, <span className="navbar__greeting__name">There!</span>{" "}
        </p>
      </div>
      <nav className="navbar__actions">
        <NavLink to={"/"}>Summary</NavLink>
        <NavLink to={"/exercise"}>Exercise</NavLink>
        <NavLink to={"/food"}>Food</NavLink>
        <NavLink to={"/goal"}>Goal</NavLink>
      </nav>
    </div>
  );
};
