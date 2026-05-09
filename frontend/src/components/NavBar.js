import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Ștergem token-ul ca să delogăm utilizatorul
        localStorage.removeItem("token");
        // Îl trimitem înapoi la pagina de login
        navigate("/login");
    };

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", padding: "15px 30px", backgroundColor: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Hackathon App
            </div>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <Link to="/profile" style={{ textDecoration: "none", color: "#333" }}>Profilul Meu</Link>
                <Link to="/search" style={{ textDecoration: "none", color: "#333" }}>Găsește Colegi</Link>
                <button
                    onClick={handleLogout}
                    style={{ padding: "5px 15px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    Log Out
                </button>
            </div>
        </nav>
    );
}