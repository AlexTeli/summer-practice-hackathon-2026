import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", { username, password });
            localStorage.setItem("token", res.data.token);
            navigate("/home");
        } catch (e) { alert("Login failed"); }
    };

    return (
        <div className="page-container">
            <div className="main-card" style={{ maxWidth: "400px" }}>
                <h1>Autentificare</h1>
                <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>Bine ai revenit!</p>
                <div className="form-group">
                    <label>Utilizator</label>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Parolă</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="btn-primary" style={{ width: "100%" }} onClick={handleLogin}>LOG IN</button>
            </div>
        </div>
    );
}