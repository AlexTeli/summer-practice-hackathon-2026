import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <div className="main-card" style={{ maxWidth: "800px", textAlign: "center" }}>
                <h1>Bine ai venit în Hackathon 2026! 🚀</h1>
                <p className="subtitle">Aceasta este platforma ta pentru sport și comunitate.</p>
                <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "40px" }}>
                    <button className="btn-primary" onClick={() => navigate("/profile")}>Vezi Profilul</button>
                    <button className="btn-primary" onClick={() => navigate("/create-profile")}>Creează Profil</button>
                </div>
            </div>
        </div>
    );
}