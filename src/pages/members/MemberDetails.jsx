import React, {useEffect, useState} from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";
import {useNavigate, useParams} from "react-router-dom";
import DialogBox from "../../components/DialogBox.jsx";

export default function MemberDetails() {
  const { id: memberId } = useParams();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [libraryCardId, setLibraryCardId] = useState(null);
  const [expiryDateArray, setExpiryDateArray] = useState(null);


  const navigate = useNavigate();

  const [dialogMessage, setDialogMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      if (!memberId) return;

      try {
        const response = await fetch(`${CORE_API_BASE_URL}/members/${memberId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setName(data.name);
        setSurname(data.surname);
        setSurname(data.surname);
        setBirthday(data.birthday);
        setLibraryCardId(data.libraryCard.libraryCardId);
        setExpiryDateArray(data.libraryCard.expiryDate);

      } catch (err) {
        setDialogMessage('Nie udało się pobrać informacji');
        console.error('Error fetching proposal details:', err);
      }
    }
    fetchMemberDetails();
    setIsLoading(false);
  }, [name, surname, isLoading]);

  const isCardValid = () => {
    if (!expiryDateArray || expiryDateArray.length !== 3) return false;

    const [year, month, day] = expiryDateArray;
    const expiryDate = new Date(year, month - 1, day);
    const today = new Date();

    return expiryDate >= today;
  };

  if (dialogMessage !== null) {
    return (
      <DialogBox
        message={dialogMessage}
        returnLink='/member'
      />
    )
  }

  if (isLoading) {
    return (
      <p>Ładowanie danych...</p>
    )
  }

  return (
    <>
      <h2>Dane czytelnika</h2>

      <div>
        <p><span>Imię i nazwisko: </span>{name} {surname}</p>
        <p><span>Data urodzenia: </span>{birthday[0]}</p>

        <h3>Karta biblioteczna</h3>
        {libraryCardId != null ? (
          isCardValid() ? (
            <>
              <p>Nr: {libraryCardId}</p>
              <p>Ważna do: {expiryDateArray?.join('-')}</p>
            </>
          ) : (
            <>
              <p style={{ color: 'red' }}>Karta biblioteczna wygasła</p>
              <button
                type="button"
                onClick={() => {
                  navigate(`/libraryCard/create/${memberId}`);
                }}
              >
                Odnów kartę
              </button>
            </>
          )
        ) : (
          <>
            <p style={{ color: 'red' }}>Czytelnik nie posiada karty bibliotecznej</p>
            <button
              type="button"
              onClick={() => {
                navigate(`/libraryCard/create/${memberId}`);
              }}
            >
              Utwórz nową kartę
            </button>
          </>
        )}
      </div>
    </>

  );

}