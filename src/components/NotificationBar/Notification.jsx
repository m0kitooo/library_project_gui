import { useEffect, useState } from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";

export default function Notification({ role, username }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${CORE_API_BASE_URL}/notifications?role=${role}&username=${username}`,
                    { credentials: "include" }
                );
                if (!res.ok) {
                    setItems([]);
                    return;
                }
                const data = await res.json();
                setItems(data || []);
            } catch (e) {
                setItems([]);
            } finally {
                setLoading(false);
            }
        };
        if (role && username) {
            fetchNotifications();
        }
    }, [role, username]);

    if (loading) return <div>Ładowanie powiadomień...</div>;

    return (
        <div style={{ padding: 8, borderBottom: "1px solid #eee" }}>
            {items.length === 0 && <p>Brak nowych powiadomień.</p>}
            {items.map((n) => (
                <div key={n.id} style={{ padding: 6, borderBottom: "1px solid #ddd" }}>
                    <div><strong>{n.username}</strong> — <small>{new Date(n.createdAt).toLocaleString()}</small></div>
                    <div>{n.content}</div>
                </div>
            ))}
        </div>
    );
}
