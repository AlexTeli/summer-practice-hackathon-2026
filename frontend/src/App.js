import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/CreateProfile";

import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
    return (
        <BrowserRouter>
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

            </Routes>
        </BrowserRouter>
    );
}