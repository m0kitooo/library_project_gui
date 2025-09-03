import BasePageLayout from "../../../components/BasePageLayout/BasePageLayout.jsx";
import {useCallback, useEffect, useState} from "react";
import CORE_API_BASE_URL from "../../../coreApiBaseUrl.js";
import {useParams} from "react-router-dom";
import styles from "./LibraryPaymentDetails.module.css";
import BackButton from "../../../components/BackButton/BackButton.jsx";
import ROUTES from "../../../routes.jsx";

export default function LibraryPaymentDetails() {
  const { id } = useParams();
  const [libraryPayment, setLibraryPayment] = useState({
    transactionName: '',
    transactionDate: '',
    vendor: '',
    invoiceNumber: '',
    nip: '',
    bruttoCost: '',
    vat: '',
    currency: '',
    quantity: ''
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
          <div className={styles.mainWrapper}>
            <BackButton fallbackRoute={ROUTES.libraryPayments.path}/>
            <div className={styles.libraryPaymentDetailsWrapper}>
              <span>Nazwa transakcji: {libraryPayment.transactionName}</span>
              <span>Data transakcji: {libraryPayment.transactionDate}</span>
              <span>Dostawca: {libraryPayment.vendor}</span>
              <span>Numer faktury: {libraryPayment.invoiceNumber}</span>
              <span>NIP: {libraryPayment.nip}</span>
              <span>Kwota brutto: {libraryPayment.bruttoCost}</span>
              <span>Stawka VAT(%): {libraryPayment.vat}</span>
              <span>Waluta: {libraryPayment.currency}</span>
              <span>Ilość: {libraryPayment.quantity}</span>
            </div>
          </div>
        </BasePageLayout>
      </>
  );
}
