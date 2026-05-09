import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const res = await api.get("/profile/me");
                setProfile(res.data);

            } catch {
                navigate("/create-profile");
            }
        };

        load();
    }, []);

    return (
        <div>
            <h2>Home</h2>

            {profile ? (
                <>
                    <h3>Welcome</h3>
                    <p>{profile.description}</p>
                    <p>Skill: {profile.skillLevel}</p>

                    <button onClick={() => navigate("/profile")}>
                        View Profile
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}