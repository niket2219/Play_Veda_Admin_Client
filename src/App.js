import Sessions from "./components/Sessions/Sessions";
import Cards from "./components/Template1/Card";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/cards1" element={<Cards />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
