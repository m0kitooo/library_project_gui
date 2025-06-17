import { useState, useEffect, useCallback } from 'react';
import BasePageLayout from "../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import DialogBox from "../components/DialogBox.jsx";
import SearchBar from "../components/SearchBar.jsx";

const buildMemberLoansUrl = (memberId) => `${CORE_API_BASE_URL}/book-loans/member/${memberId}`;
const MEMBERS_URL = `${CORE_API_BASE_URL}/members`;
const BOOK_RETURNS_URL = `${CORE_API_BASE_URL}/book-returns`;

export default function ReturnBook() {
    const [searchedMember, setSearchedMember] = useState(null);
    const [loanedBooks, setLoanedBooks] = useState([]);
    const [damageStatus, setDamageStatus] = useState({}); // { bookId: isDamaged }
    const [dialog, setDialog] = useState({ message: null, returnLink: null });
    const [error, setError] = useState(null);

    const handleMemberSearch = useCallback(async (cardId) => {
        if (!cardId.trim()) {
            setError('Proszę wprowadzić ID karty.');
            setSearchedMember(null);
            setLoanedBooks([]);
            return;
        }
        setError('');
        setSearchedMember(null);
        setLoanedBooks([]);

        try {
            const response = await fetch(`${MEMBERS_URL}?cardId=${cardId}`, {credentials: 'include'});
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Nie znaleziono czytelnika o podanym ID karty.');
                }
                throw new Error('Nie udało się wyszukać czytelnika.');
            }
            const data = await response.json();
            const member = Array.isArray(data) ? data[0] : data;

            if (member) {
                setSearchedMember(member);
            } else {
                throw new Error('Nie znaleziono czytelnika o podanym ID karty.');
            }
        } catch (err) {
            setError(err.message);
        }
    }, []);

    useEffect(() => {
        if (!searchedMember) {
            setLoanedBooks([]);
            return;
        }

        const fetchLoanedBooks = async () => {
            setError(null);
            try {
                const response = await fetch(buildMemberLoansUrl(searchedMember.id), {credentials: 'include'});
                if (!response.ok) throw new Error('Nie udało się pobrać książek dla tego czytelnika.');
                const data = await response.json();
                setLoanedBooks(data);
                setDamageStatus({});
            } catch (err) {
                setError(err.message);
                setLoanedBooks([]);
            }
        };
        fetchLoanedBooks();
    }, [searchedMember]);

    const handleReturnBook = async (bookId) => {
        if (!searchedMember) return;

        const isDamaged = !!damageStatus[bookId];

        try {
            const response = await fetch(BOOK_RETURNS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookId: bookId,
                    memberId: searchedMember.id,
                    isDamaged: isDamaged,
                }),
                credentials: 'include'
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Błąd podczas zwrotu książki.');
            }

            setDialog({ message: responseData.message, returnLink: '/return' });
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

                <div style={{ marginBottom: '1rem' }}>
                    <label>Wyszukaj czytelnika po ID karty bibliotecznej:</label>
                    <div style={{ marginTop: '8px' }}>
                        <SearchBar
                            searchMethod={handleMemberSearch}
                            placeholder="Wpisz ID karty..."
                        />
                    </div>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {searchedMember && (
                    <div className={'base-wrapper'} style={{ padding: '1rem', marginBottom: '1rem' }}>
                        <p><strong>Imię:</strong> {searchedMember.name}</p>
                        <p><strong>Nazwisko:</strong> {searchedMember.surname}</p>
                    </div>
                )}

                {searchedMember && (
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
                            <p>Ten czytelnik nie ma wypożyczonych żadnych książek.</p>
                        )}
                    </div>
                )}
                {!searchedMember && !error && <p>Wyszukaj czytelnika, aby zobaczyć jego wypożyczenia.</p>}
            </div>
        </BasePageLayout>
    );
}