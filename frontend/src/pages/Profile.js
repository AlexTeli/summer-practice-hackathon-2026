import { useEffect, useState } from "react";
import api from "../api";

export default function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const load = async () => {
            const res = await api.get("/profile/me");
            setProfile(res.data);
        };

        load();
    }, []);

    if (!profile) return <p>Loading...</p>;

    return (
        <div>
            <h2>My Profile</h2>

            <p>{profile.description}</p>
            <p>Skill: {profile.skillLevel}/10</p>

            <h3>Sports</h3>
            <ul>
                {profile.sports.map((s) => (
                    <li key={s.id}>{s.name}</li>
                ))}
            </ul>
        </div>
    );
}