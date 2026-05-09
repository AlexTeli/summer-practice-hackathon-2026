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
        const loadSports = async () => {
            const res = await api.get("/sports");
            setAllSports(res.data);
        };

        loadSports();
    }, []);

    const toggleSport = (id) => {
        setSports((prev) =>
            prev.includes(id)
                ? prev.filter((s) => s !== id)
                : [...prev, id]
        );
    };

    const handleSubmit = async () => {
        await api.post("/profile", {
            description,
            skillLevel,
            sports
        });

        navigate("/home");
    };

    return (
        <div>
            <h2>Create Profile</h2>

            <textarea
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                type="number"
                min="1"
                max="10"
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
            />

            <h3>Select Sports</h3>

            {allSports.map((s) => (
                <div key={s.id}>
                    <input
                        type="checkbox"
                        onChange={() => toggleSport(s.id)}
                    />
                    {s.name}
                </div>
            ))}

            <button onClick={handleSubmit}>
                Create Profile
            </button>
        </div>
    );
}