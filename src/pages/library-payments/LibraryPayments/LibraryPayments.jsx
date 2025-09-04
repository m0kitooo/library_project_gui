import BasePageLayout from "../../../components/BasePageLayout/BasePageLayout.jsx";
import SearchBar from "../../../components/SearchBar/SearchBar.jsx";
import {useCallback, useEffect, useState} from "react";
import CORE_API_BASE_URL from "../../../coreApiBaseUrl.js";
import {Link} from "react-router-dom";
import routes from "../../../routes.jsx";
import usePageTitle from "../../../hooks/usePageTitle.js";
import useFetchDynamic from "../../../hooks/useFetchDynamic.js";

export default function LibraryPayments() {
  usePageTitle("Wydatki biblioteczne");
  const {data: libraryPaymentData, loading: libraryPaymentLoading, error: libraryPaymentError, fetcher: libraryPaymentFetcher} = useFetchDynamic();

  const searchLibraryPayments = useCallback((phrase) => {
    const fetchLibraryPayments = async () => {
      await libraryPaymentFetcher(
        `${CORE_API_BASE_URL}/library-payments?phrase=${phrase || ''}`,
        { credentials: 'include' }
      );
    };

    fetchLibraryPayments();
  }, []);

  useEffect(() => {
    searchLibraryPayments();
  }, [searchLibraryPayments]);

  return (
    <>
      <BasePageLayout>
        <SearchBar searchMethod={searchLibraryPayments}/>
        {libraryPaymentLoading && <span>Loading...</span>}
        {!libraryPaymentLoading && !libraryPaymentError && libraryPaymentData && Array.isArray(libraryPaymentData) && (
          <ul style={{listStyle: 'none', padding: 0}}>
            {libraryPaymentData.map(libraryPayment =>
              <li key={libraryPayment.id} className={'base-wrapper'}>
                <span>Nazwa transakcji: {libraryPayment.transactionName}</span>
                <span>Numer faktury: {libraryPayment.invoiceNumber}</span>
                <Link to={routes.libraryPaymentDetails.buildPath(libraryPayment.id)}>
                  <span>Szczegóły</span>
                </Link>
              </li>
            )}
          </ul>
        )}
      </BasePageLayout>
    </>
  );
}
