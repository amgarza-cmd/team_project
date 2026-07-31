import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Reserve from "./pages/Reserve";
import Login from "./pages/Login";
import ProtectedRoute from './pages/ProtectedRoute';
import MyReservations from "./pages/MyReservations";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/reserve" element={<ProtectedRoute><Reserve /></ProtectedRoute>} />
        <Route path="/my-reservations" element={<ProtectedRoute> <MyReservations /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}