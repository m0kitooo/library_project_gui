import { useState, useCallback } from 'react';
import BasePageLayout from "../../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";
import DialogBox from "../../components/DialogBox.jsx";
import SearchBar from "../../components/SearchBar.jsx";

const MEMBERS_URL = `${CORE_API_BASE_URL}/members`;
const BOOKS_URL = `${CORE_API_BASE_URL}/books`;
const BOOK_LOANS_URL = `${CORE_API_BASE_URL}/book-loans`;
const RESERVATIONS_URL = `${CORE_API_BASE_URL}/reservations`;

export default function LoanBook() {
    const [cardId, setCardId] = useState('');
    const [searchedMember, setSearchedMember] = useState(null);
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [dialog, setDialog] = useState({ message: null, returnLink: null });
    const [error, setError] = useState(null);
    const [memberSearchError, setMemberSearchError] = useState(null);
    const [bookSearchError, setBookSearchError] = useState(null);
    const [currentBookFilter, setCurrentBookFilter] = useState('');

    const fetchBooks = useCallback(async (title = '') => {
        setCurrentBookFilter(title);
        setBookSearchError(null);
        try {
            const response = await fetch(`${BOOKS_URL}?title=${encodeURIComponent(title)}`, { credentials: 'include' });
            if (!response.ok) {
                throw new Error('Nie udało się wyszukać książek.');
            }
            const data = await response.json();
            setSearchedBooks(data);
        } catch (err) {
            setBookSearchError(err.message);
            setSearchedBooks([]);
        }
    }, []);

    const handleMemberSearch = async () => {
        if (!cardId.trim()) {
            setMemberSearchError('Proszę wprowadzić ID karty.');
            setSearchedMember(null);
            setSearchedBooks([]);
            return;
        }
        setMemberSearchError('');
        setSearchedMember(null);
        setSearchedBooks([]);

        try {
            const response = await fetch(`${MEMBERS_URL}?cardId=${cardId}`, { credentials: 'include' });
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Nie znaleziono czytelnika o podanym ID karty.');
                }
                const errorData = await response.text();
                throw new Error(errorData || 'Nie udało się wyszukać czytelnika.');
            }
            const data = await response.json();
            const member = Array.isArray(data) ? data[0] : data;

            if (member) {
                setSearchedMember(member);
                fetchBooks(); // Fetch all books initially
            } else {
                throw new Error('Nie znaleziono czytelnika o podanym ID karty.');
            }
        } catch (err) {
            setMemberSearchError(err.message);
        }
    };

    const handleLoanBook = async (bookId) => {
        if (!searchedMember) {
            setError("Najpierw wyszukaj czytelnika.");
            return;
        }

        try {
            const response = await fetch(BOOK_LOANS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookId: bookId,
                    memberId: searchedMember.id,
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Błąd podczas wypożyczania książki.');
            }

            const responseData = await response.json();
            setDialog({ message: `Książka "${responseData.book.title}" została pomyślnie wypożyczona.`, returnLink: '/loan' });

            fetchBooks(currentBookFilter);

        } catch (err) {
            setDialog({ message: err.message, returnLink: '/loan' });
        }
    };

    const handleReserveBook = async (bookId) => {
        if (!searchedMember) {
            setError("Najpierw wyszukaj czytelnika.");
            return;
        }

        try {
            const response = await fetch(RESERVATIONS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookId: bookId,
                    memberId: searchedMember.id,
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Błąd podczas rezerwacji książki.');
            }

            const responseData = await response.json();
            setDialog({ message: `Książka "${responseData.book.title}" została pomyślnie zarezerwowana.`, returnLink: '/loan' });
        } catch (err) {
            setDialog({ message: err.message, returnLink: '/loan' });
        }
    };

    if (dialog.message) {
        return <DialogBox message={dialog.message} returnLink={dialog.returnLink} />;
    }

    return (
        <BasePageLayout>
            <div style={{ padding: '1rem' }}>
                <h2>Wypożycz lub zarezerwuj książkę</h2>

                <div style={{ marginBottom: '2rem' }}>
                    <label htmlFor="card-id-input">Krok 1: Wyszukaj czytelnika po ID karty bibliotecznej</label>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        <input
                            id="card-id-input"
                            type="text"
                            value={cardId}
                            onChange={(e) => setCardId(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleMemberSearch()}
                            style={{ padding: '8px', flex: 1 }}
                            placeholder="Wpisz ID karty..."
                        />
                        <button onClick={handleMemberSearch}>Szukaj</button>
                    </div>
                    {memberSearchError && <p style={{ color: 'red' }}>{memberSearchError}</p>}
                </div>

                {searchedMember && (
                    <div className={'base-wrapper'} style={{ padding: '1rem', marginBottom: '2rem' }}>
                        <h4>Znaleziony czytelnik:</h4>
                        <p><strong>Imię:</strong> {searchedMember.name}</p>
                        <p><strong>Nazwisko:</strong> {searchedMember.surname}</p>
                    </div>
                )}

                {searchedMember && (
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Krok 2: Wybierz książkę z listy (możesz filtrować po tytule)</label>
                        <div style={{ marginTop: '8px' }}>
                            <SearchBar searchMethod={fetchBooks} />
                        </div>
                        {bookSearchError && <p style={{ color: 'red' }}>{bookSearchError}</p>}
                    </div>
                )}

                {searchedMember && (
                    <div>
                        {searchedBooks.length > 0 ? (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {searchedBooks.map(book => (
                                    <li key={book.id} className={'base-wrapper'} style={{ marginBottom: '1rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p><strong>Tytuł:</strong> {book.title}</p>
                                            <p><strong>Autor:</strong> {book.author}</p>
                                            <p><strong>Dostępna ilość:</strong> {book.quantity}</p>
                                        </div>
                                        {book.quantity > 0 ? (
                                            <button
                                                onClick={() => handleLoanBook(book.id)}
                                                style={{ marginTop: '0.5rem' }}
                                            >
                                                Wypożycz
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleReserveBook(book.id)}
                                                style={{ marginTop: '0.5rem', backgroundColor: '#f0ad4e', color: 'white' }}
                                            >
                                                Zarezerwuj
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Brak książek spełniających podane kryteria.</p>
                        )}
                    </div>
                )}

                {!searchedMember && !error && <p>Zacznij od wyszukania czytelnika.</p>}
            </div>
        </BasePageLayout>
    );
}