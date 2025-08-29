import BasePageLayout from "../../../components/BasePageLayout/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../../../coreApiBaseUrl.js";
import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./BookDetails.module.css";
import BackButton from "../../../components/BackButton/BackButton.jsx";
import ROUTES from "../../../routes.jsx";
import useFetchDynamic from "../../../hooks/useFetchDynamic.js";
import DefaultNavLink from "../../../components/DefaultNavLink/DefaultNavLink.jsx";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    edition: '',
    publicationYear: null,
  });
  const { 
    data: loanData,
    loading: loanLoading, 
    error: loanError, fetcher: loanFetcher 
  } = useFetchDynamic();

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`${CORE_API_BASE_URL}/books/${id}`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setBook(await response.json());
    } catch (error) {
      console.error('Error fetching book details: ', error);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    if (book?.status === "LOANED") {
      loanFetcher(
        `${CORE_API_BASE_URL}/books/${id}/book-loans`,
        { credentials: 'include' }
      );
    }
  }, [book?.status]);

  return (
      <>
        <BasePageLayout>
          <div className={styles.mainWrapper}>
            <BackButton fallbackRoute={ROUTES.books.path}/>
            <div className={styles.bookDetailsWrapper}>
              <span>Numer inwentarzowy: {book.accessionNumber}</span>
              <span>
                {`ISBN: `}
                {book.isbn || <span className={styles.redText}>Brak</span>}
              </span>
              <span>{`Tytuł: ${book.title}`}</span>
              <span>{`Autor: ${book.author}`}</span>
              <span>{`Sygnatura: ${book.callNumber}`}</span>
              <span>Wydawnictwo: {book.publisher || <span className={styles.redText}>Brak</span>}</span>
              <span>{`Wydanie: ${book.edition}`}</span>
              <span>{`Rok wydania: ${book.publicationYear || 'Brak'}`}</span>
              <span>
                Status: {
                  book?.status === "LOANED" ? (
                    <span>
                      <span className={styles.redText}>Wypożyczona </span>
                      {loanLoading && <span>Ładowanie danych wypożyczenia...</span>}
                      {!loanError && loanData && (
                        <span>przez
                          <DefaultNavLink to={ROUTES.memberDetails.buildPath(loanData.member.id)}>
                            <span> {loanData.member.name} {loanData.member.surname}</span>
                          </DefaultNavLink>
                        </span>
                      )}
                    </span>
                  ) : book?.status === "RESERVED" ? (
                    <span className={styles.redText}>Zarezerwowana</span>
                  ) : (
                    <span className={styles.greenText}>Dostępna</span>
                  )
                }
              </span>
              {/* <span>{`Ilość wypożyczeń: ${loanData?.length || 0}`}</span>
              <span>{`Ilość rezerwacji: `}</span>
              <span>{`Dostępna ilość: `}</span>
              <span>{`Ilość całkowita: ${book.quantity}`}</span> */}
            </div>
          </div>
        </BasePageLayout>
      </>
  )
}