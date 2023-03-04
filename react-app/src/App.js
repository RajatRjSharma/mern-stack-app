import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.esm.js";

import Navbar from "./components/Navbar";
import ExerciseList from "./components/ExerciseList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";

function App() {
  const URL = "http://localhost:5000";

  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" exact element={<ExerciseList url={URL} />} />
        <Route path="/edit/:id" exact element={<EditExercise url={URL} />} />
        <Route path="/create" exact element={<CreateExercise url={URL} />} />
        <Route path="/user" exact element={<CreateUser url={URL} />} />
      </Routes>
    </Router>
  );
}

export default App;
