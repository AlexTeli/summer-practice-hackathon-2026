import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await api.post("/auth/register", form);
            navigate("/login");
        } catch (e) { alert("Registration failed"); }
    };

    return (
        <div className="page-container">
            <div className="main-card" style={{ maxWidth: "400px" }}>
                <h1>Cont Nou</h1>
                <div className="form-group">
                    <label>Utilizator</label>
                    <input type="text" onChange={e => setForm({...form, username: e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Parolă</label>
                    <input type="password" onChange={e => setForm({...form, password: e.target.value})} />
                </div>
                <button className="btn-primary" style={{ width: "100%" }} onClick={handleRegister}>SIGN UP</button>
            </div>
        </div>
    );
}