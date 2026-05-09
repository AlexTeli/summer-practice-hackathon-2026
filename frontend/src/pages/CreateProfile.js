import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
    const [description, setDescription] = useState("");
    const [skillLevel, setSkillLevel] = useState(5);
    const [sports, setSports] = useState([]);
    const [allSports, setAllSports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/sports").then(res => setAllSports(res.data));
    }, []);

    const handleSubmit = async (e) => {
        // Oprește comportamentul implicit al browserului de a reîncărca pagina
        if (e) e.preventDefault();

        try {
            await api.post("/profile/create", {
                bio: description,
                skillLevel: parseInt(skillLevel),
                sportIds: sports
            });
            // Navigăm către ruta de profil din React
            navigate("/profile");
        } catch (error) {
            console.error("Eroare la salvare:", error);
            alert("Error saving profile. Verifică dacă ești logat!");
        }
    };

    return (
        <div className="page-container">
            <div className="main-card" style={{ maxWidth: "800px" }}>
                <h1>CREARE PROFIL</h1>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginTop: "30px" }}>
                    <div className="form-group">
                        <label>Descriere</label>
                        <textarea rows="4" onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Skill Level (1-10): {skillLevel}</label>
                        <input type="range" min="1" max="10" value={skillLevel} onChange={e => setSkillLevel(e.target.value)} />
                    </div>
                </div>
                <h3 style={{ marginTop: "20px" }}>Alege Sporturile</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", margin: "20px 0" }}>
                    {allSports.map(s => (
                        <div key={s.id} style={{ border: "1px solid var(--border-color)", padding: "10px", borderRadius: "8px" }}>
                            <input
                                type="checkbox"
                                checked={sports.includes(s.id)}
                                onChange={() => setSports(prev => prev.includes(s.id) ? prev.filter(id => id !== s.id) : [...prev, s.id])}
                            />
                            <span style={{ marginLeft: "10px" }}>{s.name}</span>
                        </div>
                    ))}
                </div>
                {/* Important: type="button" previne submit-ul accidental al paginii */}
                <button type="button" className="btn-primary" onClick={handleSubmit}>
                    SALVEAZĂ PROFILUL
                </button>
            </div>
        </div>
    );
}