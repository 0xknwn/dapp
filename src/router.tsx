import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Menu from "./menu";
import Contracts from "./contracts.tsx";

const Routers = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contracts" element={<Contracts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
