import BasePageLayout from "../../../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../../../coreApiBaseUrl.js";
import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styles from "./BookDetails.module.css";
import BackButton from "../../../components/BackButton/BackButton.jsx";
import ROUTES from "../../../routes.jsx";
import useFetch from "../../../hooks/useFetch.js";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    quantity: 0
  });
  const { data: loanData, loading, error } = useFetch(`${CORE_API_BASE_URL}/book-loans/books/${id}`, { credentials: 'include' });

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

  return (
      <>
        <BasePageLayout>
          <div className={styles.mainWrapper}>
            <BackButton fallbackRoute={ROUTES.books.path}/>
            <div className={styles.bookDetailsWrapper}>
              <span>{`Tytuł: ${book.title}`}</span>
              <span>{`Autor: ${book.author}`}</span>
              <span>{`Opis: ${book.description}`}</span>
              <span>{`Ilość wypożyczeń: ${loanData?.length || 0}`}</span>
              <span>{`Ilość rezerwacji: `}</span>
              <span>{`Dostępna ilość: `}</span>
              <span>{`Ilość całkowita: ${book.quantity}`}</span>
            </div>
          </div>
        </BasePageLayout>
      </>
  )
}