import { useEffect, useState } from "react";
import api from "../api";

export default function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get("/profile/me").then(res => setProfile(res.data));
    }, []);

    if (!profile) return <div className="page-container">Încărcare...</div>;

    return (
        <div className="page-container">
            <div className="main-card" style={{ maxWidth: "600px" }}>
                <h1>Profilul Meu</h1>
                <hr style={{ border: "none", height: "1px", backgroundColor: "var(--border-color)", margin: "20px 0" }} />
                <div className="form-group">
                    <label>Bio</label>
                    <p>{profile.bio || "Nicio descriere adăugată."}</p>
                </div>
                <div className="form-group">
                    <label>Nivel Skill</label>
                    <p>⭐ {profile.skillLevel} / 10</p>
                </div>
                <div className="form-group">
                    <label>Sporturi Selectate</label>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {profile.sports?.map(s => (
                            <span key={s.id} style={{ background: "#e2e8f0", padding: "5px 15px", borderRadius: "20px", fontSize: "12px" }}>
                                {s.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}