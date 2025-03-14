import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Me from "./pages/Me";
import Clinics from "./pages/Clinics";
import Treatments from "./pages/Treatments";
import Treatment from "./pages/Treatment";
import Doctors from "./pages/Doctors";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/treatment/:treatmentId" element={<Treatment />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route element={<PrivateRoute />}>
            <Route path="/me/:userId" element={<Me />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
