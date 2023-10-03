import { Outlet } from "react-router-dom";
import "./App.scss";
import { Navbar } from "./components/Navbar/Navbar";

function App(): JSX.Element {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
