import BasePageLayout from "../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import {useRef} from "react";

export default function AddLibraryPayment() {
  const transactionNameRef = useRef(null);
  const costRef = useRef(null);
  const descriptionRef = useRef(null);

  return (
      <BasePageLayout>
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={async () => {
          try {
            const response = await fetch(`${CORE_API_BASE_URL}/library-payments`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                transactionName: transactionNameRef.current.value,
                cost: costRef.current.value,
                description: descriptionRef.current.value
              }),
              credentials: 'include'
            });
            if (!response.ok)
              alert('Nie udało się dodać płatności')
          } catch (error) {
            console.error(error)
          }
        }}>
          <input type={'text'} placeholder={'nazwa tranzakcji'} ref={transactionNameRef}/>
          <input type={'number'} step="0.01" placeholder={'koszt tranzakcji'} ref={costRef}/>
          <textarea placeholder={'opis'} ref={descriptionRef}/>
          <button type={'submit'}>Dodaj</button>
        </form>
      </BasePageLayout>
  );
}