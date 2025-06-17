import { useState, useEffect } from 'react';
import BasePageLayout from "../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import DialogBox from "../components/DialogBox.jsx";
import SearchBar from "../components/SearchBar.jsx";

const RESERVATIONS_URL = `${CORE_API_BASE_URL}/reservations`;

export default function BookReservations() {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [memberIdFilter, setMemberIdFilter] = useState('');
    const [titleFilter, setTitleFilter] = useState('');
    const [dialog, setDialog] = useState({ message: null, returnLink: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(RESERVATIONS_URL , {credentials: 'include'});
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać rezerwacji.');
                }
                const data = await response.json();
                setReservations(data);
                setFilteredReservations(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchReservations();
    }, []);

    useEffect(() => {
        let result = reservations;

        if (memberIdFilter) {
            result = result.filter(r => r.member.id.toString().includes(memberIdFilter));
        }

        if (titleFilter) {
            result = result.filter(r => r.book.title.toLowerCase().includes(titleFilter.toLowerCase()));
        }

        setFilteredReservations(result);
    }, [memberIdFilter, titleFilter, reservations]);

    const handleCancelReservation = async (reservationId, memberId) => {
        try {
            const response = await fetch(`${RESERVATIONS_URL}/${reservationId}/member/${memberId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Błąd podczas anulowania rezerwacji.');
            }

            setDialog({ message: 'Rezerwacja została anulowana.', returnLink: '/reservations' });
            setReservations(prev => prev.filter(r => r.id !== reservationId));

        } catch (err) {
            setDialog({ message: err.message, returnLink: '/reservations' });
        }
    };

    if (dialog.message) {
        return <DialogBox message={dialog.message} returnLink={dialog.returnLink} />;
    }

    return (
        <BasePageLayout>
            <div style={{ padding: '1rem' }}>
                <h2>Zarządzaj rezerwacjami książek</h2>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{flex: 1}}>
                        <SearchBar
                            searchMethod={setMemberIdFilter}
                            placeholder="Filtruj po ID członka..."
                        />
                    </div>
                    <div style={{flex: 1}}>
                        <SearchBar
                            searchMethod={setTitleFilter}
                            placeholder="Filtruj po tytule książki..."
                        />
                    </div>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div>
                    <h3>Wszystkie rezerwacje:</h3>
                    {filteredReservations.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {filteredReservations.map(res => (
                                <li key={res.id} className={'base-wrapper'} style={{ marginBottom: '1rem', padding: '1rem' }}>
                                    <p><strong>Tytuł:</strong> {res.book.title}</p>
                                    <p><strong>Autor:</strong> {res.book.author}</p>
                                    <p><strong>Zarezerwowane dla:</strong> {res.member.name} {res.member.surname} (ID: {res.member.id})</p>
                                    <p><strong>Status:</strong> {res.status}</p>
                                    <p><strong>Data rezerwacji:</strong> {res.reservationDate}</p>
                                    {res.pickupDeadline && <p><strong>Odbiór do:</strong> {res.pickupDeadline}</p>}
                                    <button
                                        onClick={() => handleCancelReservation(res.id, res.member.id)}
                                        style={{ marginTop: '0.5rem' }}
                                    >
                                        Anuluj rezerwację
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Brak rezerwacji spełniających kryteria.</p>
                    )}
                </div>
            </div>
        </BasePageLayout>
    );
}