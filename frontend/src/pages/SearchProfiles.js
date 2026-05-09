import { useEffect, useState } from "react";
import api from "../api";

export default function SearchProfiles() {
    const [profiles, setProfiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Aducem toate profilele folosind noua rută creată în backend
        api.get("/profile/all")
            .then(res => setProfiles(res.data))
            .catch(err => console.error("Eroare la aducerea profilelor:", err));
    }, []);

    // Funcție pentru a filtra profilele în funcție de ce scriem în bara de search
    const filteredProfiles = profiles.filter(p =>
        p.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>

            <div className="page-container" style={{ padding: "40px" }}>
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Găsește Parteneri de Sport</h1>

                {/* Bara de search */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
                    <input
                        type="text"
                        placeholder="Caută după nume sau descriere..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: "100%", maxWidth: "500px", padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
                    />
                </div>

                {/* Lista de carduri cu profile */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", maxWidth: "1200px", margin: "0 auto" }}>
                    {filteredProfiles.map(p => (
                        <div key={p.id} style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                            <h3>{p.user?.username || "Anonim"}</h3>
                            <p style={{ color: "gray", fontStyle: "italic" }}>{p.bio || "Nicio descriere adăugată."}</p>
                            <p><strong>Nivel skill:</strong> {p.skillLevel} / 10</p>

                            <div style={{ marginTop: "15px" }}>
                                <strong>Sporturi:</strong>
                                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginTop: "5px" }}>
                                    {p.sports && p.sports.map(s => (
                                        <span key={s.id} style={{ backgroundColor: "#e9ecef", padding: "3px 8px", borderRadius: "12px", fontSize: "0.85rem" }}>
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}