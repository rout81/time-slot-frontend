import { Route, Routes, useLocation } from "react-router-dom";
import { Timing } from "./screens/timing";
import { Booking } from "./screens/booking";
import "./App.css";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Timing />} />
        <Route path="/book" element={<Booking />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
