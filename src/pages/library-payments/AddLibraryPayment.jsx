import BasePageLayout from "../../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";
import {useRef, useState} from "react";
import Toast from "../../components/Toast/Toast.jsx";

export default function AddLibraryPayment() {
  const [toast, setToast] = useState(null);

  const transactionNameRef = useRef(null);
  const costRef = useRef(null);
  const descriptionRef = useRef(null);

  return (
      <BasePageLayout>
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={async e => {
          e.preventDefault();

          if (transactionNameRef.current.value === null || transactionNameRef.current.value === '') {
            alert('Podaj nazwę tranzakcji');
            return;
          }

          if (costRef.current.value === '' || isNaN(Number(costRef.current.value)) || costRef.current.value < 0) {
            alert('Podaj koszt tranzakcji')
            return;
          }

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
            else
              setToast({ message: "Dodano płatność biblioteczną!", id: Date.now() });
          } catch (error) {
            console.error(error)
          }
        }}>
          <input type={'text'} placeholder={'nazwa tranzakcji'} ref={transactionNameRef}/>
          <input type={'number'} min={0} step="0.01" placeholder={'koszt tranzakcji'} ref={costRef}/>
          <textarea placeholder={'opis'} ref={descriptionRef}/>
          <button type={'submit'}>Dodaj</button>
          {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
        </form>
      </BasePageLayout>
  );
}
