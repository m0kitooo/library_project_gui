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
  const invoiceNumberRef = useRef(null);
  const nipRef = useRef(null);
  const bruttoCostRef = useRef(null);
  const vatRateRef = useRef(null);
  const currencyRef = useRef(null);
  const quantityRef = useRef(null);

  return (
      <BasePageLayout>
        <DefaultForm onSubmit={async () => {
          const CURRENCY_REGEX = /^[A-Z]{3}$/;

          if (
            isBlank(transactionNameRef.current.value) ||
            isBlank(transactionDateRef.current.value) ||
            isBlank(vendorRef.current.value) ||
            isBlank(invoiceNumberRef.current.value) ||
            isBlank(nipRef.current.value) ||
            isBlank(bruttoCostRef.current.value) ||
            isBlank(vatRateRef.current.value) ||
            isBlank(currencyRef.current.value) ||
            isBlank(quantityRef.current.value)
          ) {
            alert('Wszystkie pola są wymagane');
            return;
          }

          if (isNaN(Number(bruttoCostRef.current.value)) || bruttoCostRef.current.value < 0) {
            alert('Podaj poprawny koszt tranzakcji');
            return;
          }

          if (!isNaN(Number(vatRateRef.current.value)) && (vatRateRef.current.value < 0 || vatRateRef.current.value > 100)) {
            alert('Podaj poprawną stawkę VAT');
            return;
          }

          if (currencyRef.current.value && !CURRENCY_REGEX.test(currencyRef.current.value)) {
            alert('Podaj poprawną walutę (3 wielkie litery, np. PLN)');
            return;
          }

          if (isNaN(Number(quantityRef.current.value)) || quantityRef.current.value <= 0) {
            alert('Podaj poprawną ilość (liczba całkowita większa od 0)');
            return;
          }

          try {
            const response = await fetch(`${CORE_API_BASE_URL}/library-payments`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                transactionName: transactionNameRef.current.value,
                transactionDate: transactionDateRef.current.value,
                vendor: vendorRef.current.value,
                invoiceNumber: invoiceNumberRef.current.value,
                nip: nipRef.current.value,
                bruttoCost: parseFloat(bruttoCostRef.current.value),
                vat:  parseInt(vatRateRef.current.value, 10),
                currency: currencyRef.current.value,
                quantity: parseInt(quantityRef.current.value, 10),
              }),
              credentials: 'include'
            });
            if (!response.ok)
              alert('Nie udało się zarchiwizować płatności')
            else
              setToast({ message: "Zarchiwizowano płatność biblioteczną!", id: Date.now() });
          } catch (error) {
            console.error(error)
          }
        }}>
          <label className={styles.labelWrapper}>
            <span>Nazwa transakcji <span className={styles.textRed}>*</span></span>
            <input type='text' ref={transactionNameRef}/>
          </label>
          <label className={styles.labelWrapper}>
            <span>Data tranzakcji <span className={styles.textRed}>*</span></span>
            <input type="date" ref={transactionDateRef} />
          </label>
          <label className={styles.labelWrapper}>
            <span>Dostawca <span className={styles.textRed}>*</span></span>
            <input type="text" ref={vendorRef} />
          </label>
          <label className={styles.labelWrapper}>
            <span>Numer faktury <span className={styles.textRed}>*</span></span>
            <input ref={invoiceNumberRef} type="text" inputMode="numeric" pattern="[0-9]{50}" maxLength={50}/>
          </label>
          <label className={styles.labelWrapper}>
            <span>NIP <span className={styles.textRed}>*</span></span>
            <input ref={nipRef} type="text" inputMode="numeric" pattern="[0-9]{10}" maxLength={10}/>
          </label>
          <label className={styles.labelWrapper}>
            <span>Koszt transakcji (brutto) <span className={styles.textRed}>*</span></span>
            <input type={'number'} min={0} step="0.01" ref={bruttoCostRef}/>
          </label>
          <label className={styles.labelWrapper}>
            <span>Stawka VAT(%) <span className={styles.textRed}>*</span></span>
            <input type={'number'} min={0} step="1" max={100} ref={vatRateRef}/>
          </label>
          <label className={styles.labelWrapper}>
            <span>Waluta <span className={styles.textRed}>*</span></span>
            <input type={'text'} maxLength={3} ref={currencyRef}/>
          </label>
          <label className={styles.labelWrapper}>
            <span>Ilość <span className={styles.textRed}>*</span></span>
            <input type={'number'} ref={quantityRef}/>
          </label>
          <button formNoValidate type={'submit'}>Zarchiwizuj</button>
          {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
        </DefaultForm>
      </BasePageLayout>
  );
}