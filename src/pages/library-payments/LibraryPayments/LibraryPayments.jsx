import BasePageLayout from "../../../components/BasePageLayout/BasePageLayout.jsx";
import SearchBar from "../../../components/SearchBar/SearchBar.jsx";
import {useCallback, useEffect, useState} from "react";
import CORE_API_BASE_URL from "../../../coreApiBaseUrl.js";
import {Link} from "react-router-dom";
import routes from "../../../routes.jsx";

export default function LibraryPayments() {
  const [libraryPayments, setLibraryPayments] = useState([]);

  const fetchLibraryPayments = useCallback(
      (transactionName) => {
        transactionName = typeof transactionName === 'string' ? transactionName : '';

        (async () => {
          try {
            const response = await fetch(
                `${CORE_API_BASE_URL}/library-payments?transaction_name=${transactionName}`,
                {credentials: 'include'}
            );
            setLibraryPayments(await response.json());
          } catch (error) {
            console.error('Error: ', error)
          }
        })();
      }, []
  );

  useEffect(() => {
    fetchLibraryPayments();
  }, [fetchLibraryPayments]);

  return (
    <>
      <BasePageLayout>
        <SearchBar searchMethod={fetchLibraryPayments}/>
        <ul style={{listStyle: 'none', padding: 0}}>
          {libraryPayments.map(libraryPayment =>
            <li key={libraryPayment.id} className={'base-wrapper'}>
              <Link to={routes.libraryPaymentDetails.buildPath(libraryPayment.id)}>
                <span>{libraryPayment.transactionName}</span>
              </Link>
            </li>
          )}
        </ul>
      </BasePageLayout>
    </>
  );
}
