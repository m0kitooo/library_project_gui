import {useState, useRef} from "react";
import CORE_API_BASE_URL from "../../../coreApiBaseUrl.js";
import BasePageLayout from "../../../components/BasePageLayout/BasePageLayout.jsx";
import Toast from "../../../components/Toast/Toast.jsx";
import DefaultForm from "../../../components/DefaultForm/DefaultForm.jsx";
import { isBlank } from "../../../utils/stringUtils.js";
import styles from "./AddBook.module.css";
import usePageTitle from "../../../hooks/usePageTitle.js";

export default function AddBook() {
  usePageTitle("Zarejestruj książkę");
  const [toast, setToast] = useState(null);

  const isbnRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const callNumberRef = useRef(null);
  const publisherRef = useRef(null);
  const editionRef = useRef(null);
  const publicationYearRef = useRef(null);

  const handleSubmit = () => {
    const isbnPattern = /^\d{10}$|^\d{13}$/;
    const isbn = isbnRef.current.value;
    
    if (isbn && !isbnPattern.test(isbn)) {
      alert("ISBN musi mieć 10 lub 13 cyfr");
      return;
    }
    
    if (isBlank(titleRef.current.value) ||
        isBlank(authorRef.current.value) ||
        isBlank(callNumberRef.current.value) ||
        isBlank(editionRef.current.value) ||
        isBlank(publicationYearRef.current.value)) {
      alert('Uzupełnij wszystkie wymagane pola');
      return;
    }
    
    if (isNaN(publicationYearRef.current.value) || 
        parseInt(publicationYearRef.current.value) <= 0 ||
        parseInt(publicationYearRef.current.value) > new Date().getFullYear()) {
      alert('Niepoprawny rok wydania');
      return;
    }

    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/books`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            isbn: isbnRef.current.value ? isbnRef.current.value : null,
            title: titleRef.current.value ? titleRef.current.value : null,
            author: authorRef.current.value ? authorRef.current.value : null,
            callNumber: callNumberRef.current.value ? callNumberRef.current.value : null,
            publisher: publisherRef.current.value ? publisherRef.current.value : null,
            edition: editionRef.current.value ? editionRef.current.value : null,
            publicationYear: publicationYearRef.current.value ? parseInt(publicationYearRef.current.value) : null,
          }),
          credentials: 'include'
        });
        if (response.ok) {
          setToast({ message: "Zarejestrowano książkę!", id: Date.now() });
          isbnRef.current.value = '';
          titleRef.current.value = '';
          authorRef.current.value = '';
          callNumberRef.current.value = '';
          publisherRef.current.value = '';
          editionRef.current.value = '';
          publicationYearRef.current.value = '';
        }
      } catch (error) {
        console.error('Error: ', error)
      }
    })();
  };

  return (
    <BasePageLayout>
      <DefaultForm onSubmit={handleSubmit}>
        <label className={styles.labelWrapper}>
          <span>ISBN</span>
          <input pattern="^\d{10}$|^\d{13}$" minLength={10} maxLength={13} ref={isbnRef}/>
        </label>
        <label className={styles.labelWrapper}>
          <span>Tytuł <span className={styles.textRed}>*</span></span>
          <input type='text' ref={titleRef} required/>
        </label>
        <label className={styles.labelWrapper}>
          <span>Autor <span className={styles.textRed}>*</span></span>
          <input type='text' ref={authorRef}/>
        </label>
        <label className={styles.labelWrapper}>
          <span>Sygnatura <span className={styles.textRed}>*</span></span>
          <input type='text' ref={callNumberRef}/>
        </label>
        <label className={styles.labelWrapper}>
          <span>Wydawnictwo</span>
          <input type='text' ref={publisherRef}/>
        </label>
        <label className={styles.labelWrapper}>
          <span>Wydanie <span className={styles.textRed}>*</span></span>
          <input ref={editionRef} type='text'/>
        </label>
        <label className={styles.labelWrapper}>
          <span>Rok wydania <span className={styles.textRed}>*</span></span>
          <input ref={publicationYearRef} type='number' min={0} step={1}/>
        </label>
        <button type={'submit'} formNoValidate>Zarejestruj książkę</button>
        {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
      </DefaultForm>
    </BasePageLayout>
  );
}