import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import DetailDog from "./components/DetailDog"
import CreateDog from "./components/CreateDog";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<DetailDog />} />
          <Route path="/dog" element={<CreateDog />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
