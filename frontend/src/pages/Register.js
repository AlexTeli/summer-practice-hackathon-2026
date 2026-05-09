import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await api.post("/auth/register", {
                username,
                password
            });

            navigate("/login");

        } catch {
            alert("Register error");
        }
    };

    return (
        <div>
            <h2>Register</h2>

            <input
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}