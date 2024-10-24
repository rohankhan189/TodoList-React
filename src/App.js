import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgetPass from "./Pages/ForgetPassword";
import PaymentPlan from "./Pages/PaymentPlanScreen";
import Success from "./Components/Success";
import Cancel from "./Components/Cancel";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/plans" element={<PaymentPlan />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget" element={<ForgetPass />} />
      </Routes>
    </Router>
  );
};

export default App;
