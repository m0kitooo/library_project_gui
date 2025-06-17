import BasePageLayout from "../../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";
import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    quantity: 0
  });

  const fetchBookDetails = useCallback(async () => {
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
  }, [id]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  return (
      <>
        <BasePageLayout>
          <span>{`Tytuł: ${book.title}`}</span>
          <span>{`Autor: ${book.author}`}</span>
          <span>{`Opis: ${book.description}`}</span>
          <span>{`Ilość: ${book.quantity}`}</span>
        </BasePageLayout>
      </>
  )
}