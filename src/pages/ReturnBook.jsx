import { useState, useEffect } from 'react';
import BasePageLayout from "../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import DialogBox from "../components/DialogBox.jsx";

// Załóżmy, że istnieje endpoint do pobierania wypożyczeń dla danego czytelnika
// Jeśli nie, trzeba go będzie dodać w backendzie.
const buildMemberLoansUrl = (memberId) => `${CORE_API_BASE_URL}/book-loans/member/${memberId}`;
const MEMBERS_URL = `${CORE_API_BASE_URL}/members`;
const BOOK_RETURNS_URL = `${CORE_API_BASE_URL}/book-returns`;

export default function ReturnBook() {
    const [members, setMembers] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState('');
    const [loanedBooks, setLoanedBooks] = useState([]);
    const [damageStatus, setDamageStatus] = useState({}); // { bookId: isDamaged }
    const [dialog, setDialog] = useState({ message: null, returnLink: null });
    const [error, setError] = useState(null);

    // Pobieranie listy czytelników przy pierwszym renderowaniu
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(MEMBERS_URL);
                if (!response.ok) throw new Error('Nie udało się pobrać listy czytelników.');
                const data = await response.json();
                setMembers(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchMembers();
    }, []);

    // Pobieranie wypożyczonych książek po wybraniu czytelnika
    useEffect(() => {
        if (!selectedMemberId) {
            setLoanedBooks([]);
            return;
        }

        const fetchLoanedBooks = async () => {
            try {
                const response = await fetch(buildMemberLoansUrl(selectedMemberId));
                if (!response.ok) throw new Error('Nie udało się pobrać książek dla tego czytelnika.');
                const data = await response.json();
                setLoanedBooks(data);
                // Resetowanie statusu uszkodzeń przy zmianie czytelnika
                setDamageStatus({});
            } catch (err) {
                setError(err.message);
                setLoanedBooks([]);
            }
        };
        fetchLoanedBooks();
    }, [selectedMemberId]);

    const handleReturnBook = async (bookId) => {
        if (!selectedMemberId) return;

        const isDamaged = !!damageStatus[bookId];

        try {
            const response = await fetch(BOOK_RETURNS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookId: bookId,
                    memberId: selectedMemberId,
                    isDamaged: isDamaged,
                }),
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Błąd podczas zwrotu książki.');
            }

            // Wyświetl komunikat o sukcesie i odśwież listę książek
            setDialog({ message: responseData.message, returnLink: '/return' });
            // Odświeżenie listy wypożyczonych książek
            setLoanedBooks(prevBooks => prevBooks.filter(book => book.book.id !== bookId));

        } catch (err) {
            setDialog({ message: err.message, returnLink: '/return' });
        }
    };

    const handleDamageToggle = (bookId) => {
        setDamageStatus(prev => ({
            ...prev,
            [bookId]: !prev[bookId],
        }));
    };

    if (dialog.message) {
        return <DialogBox message={dialog.message} returnLink={dialog.returnLink} />;
    }

    return (
        <BasePageLayout>
            <div style={{ padding: '1rem' }}>
                <h2>Zwróć książkę</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Wybór czytelnika */}
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="member-select">Wybierz czytelnika:</label>
                    <select
                        id="member-select"
                        value={selectedMemberId}
                        onChange={(e) => setSelectedMemberId(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="">-- Wybierz --</option>
                        {members.map(member => (
                            <option key={member.id} value={member.id}>
                                {member.name} {member.surname} (ID: {member.id})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Lista wypożyczonych książek */}
                <div>
                    <h3>Książki do zwrotu:</h3>
                    {loanedBooks.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {loanedBooks.map(loan => (
                                <li key={loan.book.id} className={'base-wrapper'} style={{ marginBottom: '1rem', padding: '1rem' }}>
                                    <p><strong>Tytuł:</strong> {loan.book.title}</p>
                                    <p><strong>Autor:</strong> {loan.book.author}</p>
                                    <p><strong>Data wypożyczenia:</strong> {loan.loanDate}</p>
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={!!damageStatus[loan.book.id]}
                                                onChange={() => handleDamageToggle(loan.book.id)}
                                            />
                                            Książka uszkodzona
                                        </label>
                                    </div>
                                    <button
                                        onClick={() => handleReturnBook(loan.book.id)}
                                        style={{ marginTop: '0.5rem' }}
                                    >
                                        Zwróć
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{selectedMemberId ? 'Ten czytelnik nie ma wypożyczonych żadnych książek.' : 'Wybierz czytelnika, aby zobaczyć jego wypożyczenia.'}</p>
                    )}
                </div>
            </div>
        </BasePageLayout>
    );
}