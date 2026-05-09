import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/CreateProfile";
import SearchProfiles from "./pages/SearchProfiles";

import PrivateRoute from "./routes/PrivateRoute";
// 1. Am adăugat importul pentru Navbar
import Navbar from "./components/NavBar";

export default function App() {
    return (
        <BrowserRouter>
            {/* 2. Navbar-ul pus aici va apărea pe absolut toate paginile */}
            <Navbar />

            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/home" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />

                <Route path="/profile" element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                } />

                <Route path="/create-profile" element={
                    <PrivateRoute>
                        <CreateProfile />
                    </PrivateRoute>
                } />

                {/* Opțional: Poți să pui și SearchProfiles în PrivateRoute dacă vrei să poată căuta doar cei logați */}
                <Route path="/search" element={<SearchProfiles />} />

            </Routes>
        </BrowserRouter>
    );
}