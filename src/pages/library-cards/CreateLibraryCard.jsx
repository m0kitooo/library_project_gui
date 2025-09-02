import { useEffect, useState } from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";
import Toast from "../../components/Toast/Toast.jsx";
import BasePageLayout from "../../components/BasePageLayout.jsx";
import {useNavigate} from "react-router-dom";

export default function MemberList() {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [pesel, setPesel] = useState("");
    const [birthday, setBirthday] = useState("");

    useEffect(() => {
        fetchAllMembers();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (name || surname || pesel) {
                fetchParticularMembers();
            } else {
                fetchAllMembers();
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [name, surname, pesel]);

    const fetchAllMembers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${CORE_API_BASE_URL}/members`, {
                credentials: "include"
            });
            if (!res.ok) throw new Error("Błąd pobierania listy członków");
            const data = await res.json();
            setMembers(data);
        } catch (err) {
            setToast({ message: err.message });
        } finally {
            setLoading(false);
        }
    };

    const fetchParticularMembers = async () => {
        try {
            const query = new URLSearchParams();
            if (name) query.append("name", name);
            if (surname) query.append("surname", surname);
            if (pesel) query.append("pesel", pesel);

            const res = await fetch(`${CORE_API_BASE_URL}/members/search?${query.toString()}`, {
                credentials: "include"
            });

            if (!res.ok) throw new Error("Błąd wyszukiwania");
            const data = await res.json();
            setMembers(data);
        } catch (err) {
            setToast({ message: err.message });
        }
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${CORE_API_BASE_URL}/members`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, surname, pesel, birthday }),
                credentials: "include"
            });
            if (!res.ok) throw new Error("Błąd dodawania członka");
            setToast({ message: "Dodano członka!" });
            fetchAllMembers();

            setName("");
            setSurname("");
            setPesel("");
            setBirthday("");
        } catch (err) {
            setToast({ message: err.message });
        }
    };

    return (
        <BasePageLayout>
            <h3>Wyszukiwanie</h3>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Imię" />
            <input value={surname} onChange={e => setSurname(e.target.value)} type="text" placeholder="Nazwisko" />
            <input value={pesel} onChange={e => setPesel(e.target.value)} type="text" placeholder="PESEL" />

            <h2>Sugerowani członkowie</h2>
            {loading ? <p>Ładowanie...</p> : (
                <ul>
                    {members.map((m) => (
                        <li key={m.id}>
                            {m.name} {m.surname} ({m.pesel}){" "}
                            <button onClick={() => navigate(`/member/${m.id}`)}>
                                Szczegóły
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <h3>Dodaj nowego członka</h3>
            <form onSubmit={handleAddMember}>
                <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Imię" required />
                <input value={surname} onChange={e => setSurname(e.target.value)} type="text" placeholder="Nazwisko" required />
                <input value={pesel} onChange={e => setPesel(e.target.value)} type="text" placeholder="PESEL" required />
                <input value={birthday} onChange={e => setBirthday(e.target.value)} type="date" placeholder="Data urodzenia" required />
                <button type="submit">Dodaj</button>
            </form>

            {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
        </BasePageLayout>
    );
}
