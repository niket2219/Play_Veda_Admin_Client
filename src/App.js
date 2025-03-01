import Sessions from "./components/Sessions/Sessions";
import Cards from "./components/Template1/Card";
import CardList2 from "./components/Template2/Cards";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home";
import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/cards1" element={<Cards />} />
        <Route path="/cards2" element={<CardList2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
