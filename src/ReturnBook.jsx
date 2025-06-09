import { useState } from "react";

export default function ReturnBook() {
    const [reader, setReader] = useState("");
    const [title, setTitle] = useState("");
    const [damaged, setDamaged] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // tutaj można dodać obsługę wysyłki formularza
        alert(`Czytelnik: ${reader}\nTytuł: ${title}\nUszkodzona: ${damaged ? "Tak" : "Nie"}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Nazwa czytelnika:
                    <input
                        type="text"
                        value={reader}
                        onChange={(e) => setReader(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Tytuł książki:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Czy książka jest uszkodzona?
                    <input
                        type="checkbox"
                        checked={damaged}
                        onChange={(e) => setDamaged(e.target.checked)}
                    />
                </label>
            </div>
            <button type="submit">Zwróć książkę</button>
        </form>
    );
}