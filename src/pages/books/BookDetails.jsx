import BasePageLayout from "../../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";
import {useState} from "react";
import {useParams} from "react-router-dom";

export default function BookDetails() {
  const {  } = useParams();
  const [book, setBook] = useState();

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`${CORE_API_BASE_URL}/books/${}`, {
        credentials: 'include'
      });
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.error('Error: ', error)
    }
  };

  return (
      <>
        <BasePageLayout>

        </BasePageLayout>
      </>
  )
}