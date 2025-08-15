import { useState, useEffect } from 'react';
import BasePageLayout from "../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../coreApiBaseUrl.js";
import DialogBox from "../components/DialogBox.jsx";

const DISPOSED_BOOKS_URL = `${CORE_API_BASE_URL}/disposed-books`;

export default function DisposedBooks() {
    const [disposedBooks, setDisposedBooks] = useState([]);
    const [dialog, setDialog] = useState({ message: null, returnLink: null });
    const [error, setError] = useState(null);

    // Pobieranie listy książek do utylizacji
    useEffect(() => {
        const fetchDisposedBooks = async () => {
            setError(null);
            try {
                const response = await fetch(DISPOSED_BOOKS_URL, { credentials: 'include' });
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać listy książek do utylizacji.');
                }
                const data = await response.json();
                setDisposedBooks(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchDisposedBooks();
    }, []);

    // Obsługa oznaczenia jednej książki jako zutylizowanej
    const handleMarkAsUtilized = async (bookId) => {
        try {
            const response = await fetch(`${DISPOSED_BOOKS_URL}/${bookId}/utilize`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Błąd podczas oznaczania książki jako zutylizowanej.');
            }

            // Odświeżanie listy po pomyślnej operacji
            const updatedBooks = disposedBooks.map(book => {
                if (book.id === bookId) {
                    const newQuantity = book.quantityToDispose - 1;
                    return newQuantity > 0 ? { ...book, quantityToDispose: newQuantity } : null;
                }
                return book;
            }).filter(Boolean); // Usuwa null (książki, które się skończyły)

            setDisposedBooks(updatedBooks);
            setDialog({ message: "Oznaczono jedną sztukę jako zutylizowaną.", returnLink: "/disposed-books" });

        } catch (err) {
            setDialog({ message: err.message, returnLink: "/disposed-books" });
        }
    };

    // Obsługa oznaczenia wszystkich książek jako zutylizowanych
    const handleUtilizeAll = async (bookId) => {
        try {
            const response = await fetch(`${DISPOSED_BOOKS_URL}/${bookId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Błąd podczas usuwania wszystkich egzemplarzy książki.');
            }

            // Usuń książkę z listy w stanie komponentu
            setDisposedBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
            setDialog({ message: "Wszystkie egzemplarze książki zostały oznaczone jako zutylizowane.", returnLink: "/disposed-books" });

        } catch (err) {
            setDialog({ message: err.message, returnLink: "/disposed-books" });
        }
    };

    if (dialog.message) {
        return <DialogBox message={dialog.message} returnLink={dialog.returnLink} />;
    }

    return (
        <BasePageLayout>
            <div style={{ padding: '1rem' }}>
                <h2>Książki do utylizacji</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {disposedBooks.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {disposedBooks.map(book => (
                            <li key={book.id} className={'base-wrapper'} style={{ marginBottom: '1rem', padding: '1rem' }}>
                                <p><strong>Tytuł:</strong> {book.title}</p>
                                <p><strong>Autor:</strong> {book.author}</p>
                                <p><strong>Liczba do utylizacji:</strong> {book.quantityToDispose}</p>
                                <p><strong>Data dodania:</strong> {book.dateAdded}</p>
                                <div style={{ marginTop: '1rem', display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleMarkAsUtilized(book.id)}>
                                        Zutylizowano jedną
                                    </button>
                                    <button onClick={() => handleUtilizeAll(book.id)} style={{ backgroundColor: '#f44336' }}>
                                        Zutylizowano wszystkie
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Brak książek do utylizacji.</p>
                )}
            </div>
        </BasePageLayout>
    );
}