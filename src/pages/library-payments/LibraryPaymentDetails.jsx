import BasePageLayout from "../../components/BasePageLayout.jsx";
import {useCallback, useEffect, useState} from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.jsx";
import {useParams} from "react-router-dom";

export default function LibraryPaymentDetails() {
  const { id } = useParams();
  const [libraryPayment, setLibraryPayment] = useState({
    transactionName: '',
    cost: 0,
    description: ''
  });

  const fetchLibraryPaymentDetails = useCallback(async () => {
    try {
      const response = await fetch(`${CORE_API_BASE_URL}/library-payments/${id}`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setLibraryPayment(await response.json());
    } catch (error) {
      console.error('Error fetching book details: ', error);
    }
  }, [id]);

  useEffect(() => {
    fetchLibraryPaymentDetails();
  }, [fetchLibraryPaymentDetails]);

  return (
      <>
        <BasePageLayout>
          <span>{libraryPayment.transactionName}</span>
          <span>{libraryPayment.cost}</span>
          <span>{libraryPayment.description}</span>
        </BasePageLayout>
      </>
  );
}