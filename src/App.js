import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index";
import Art from "./pages/art";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="art/:id" element={<Art />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
