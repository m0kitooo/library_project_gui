import BasePageLayout from "../../../components/BasePageLayout/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../../../coreApiBaseUrl.js";
import {useRef, useState} from "react";
import Toast from "../../../components/Toast/Toast.jsx";
import DefaultForm from "../../../components/DefaultForm/DefaultForm.jsx";
import styles from "./AddLibraryPayment.module.css";
import { isBlank } from "../../../utils/stringUtils.js";

export default function AddLibraryPayment() {
  const [toast, setToast] = useState(null);

  const transactionNameRef = useRef(null);
  const transactionDateRef = useRef(null);
  const vendorRef = useRef(null);
  const costRef = useRef(null);
  const descriptionRef = useRef(null);

  return (
      <BasePageLayout>
        <DefaultForm onSubmit={async () => {

          if (isBlank(transactionNameRef.current.value) ||
              isBlank(transactionDateRef.current.value) || 
              isBlank(vendorRef.current.value) || 
              isBlank(costRef.current.value) || 
              isBlank(descriptionRef.current.value)) {
            alert('Wszystkie pola są wymagane');
            return;
          }

          if (isNaN(Number(costRef.current.value)) || costRef.current.value < 0) {
            alert('Podaj poprawny koszt tranzakcji');
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
          <label>
            Nazwa transakcji <span className={styles.textRed}>*</span>
            <input type='text' ref={transactionNameRef}/>
          </label>
          <label>
            Data tranzakcji <span className={styles.textRed}>*</span>
            <input type="date" ref={transactionDateRef} />
          </label>
          <label>
            Dostawca <span className={styles.textRed}>*</span>
            <input type="text" ref={vendorRef} />
          </label>
          <label>
            Numer faktury <span className={styles.textRed}>*</span>
            <input type="text" inputMode="numeric" pattern="[0-9]{50}" maxLength={50}/>
          </label>
          <label>
            NIP <span className={styles.textRed}>*</span>
            <input type="text" inputMode="numeric" pattern="[0-9]{10}" maxLength={10}/>
          </label>
          <label>
            Koszt transakcji <span className={styles.textRed}>*</span>
            <input type={'number'} min={0} step="0.01" ref={costRef}/>
          </label>
          <button type={'submit'}>Dodaj</button>
          {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
        </DefaultForm>
      </BasePageLayout>
  );
}