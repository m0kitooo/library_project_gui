import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BasePageLayout from "../../../components/BasePageLayout/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../../../coreApiBaseUrl.js";
import Toast from "../../../components/Toast/Toast.jsx";
import BackButton from "../../../components/BackButton/BackButton.jsx";
import ROUTES from "../../../routes.jsx";
import DefaultForm from "../../../components/DefaultForm/DefaultForm.jsx";
import { isBlank } from "../../../utils/stringUtils.js";
import styles from "./UpdateBook.module.css";

export default function UpdateBook() {
  const [toast, setToast] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const isbnRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const callNumberRef = useRef(null);
  const publisherRef = useRef(null);
  const editionRef = useRef(null);
  const publicationYearRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/books/${id}`, {credentials: 'include'});
        const book = await response.json();

        if (isbnRef.current) isbnRef.current.value = book.isbn || '';
        if (titleRef.current) titleRef.current.value = book.title || '';
        if (authorRef.current) authorRef.current.value = book.author || '';
        if (callNumberRef.current) callNumberRef.current.value = book.callNumber || '';
        if (publisherRef.current) publisherRef.current.value = book.publisher || '';
        if (editionRef.current) editionRef.current.value = book.edition || '';
        if (publicationYearRef.current) publicationYearRef.current.value = book.publicationYear || '';
        
      } catch (error) {
        console.error('Error: ', error);
      }
    })();
  }, [id]);

  const updateBook = async () => {
    const updatedBook = {
      id: id,
      isbn: isbnRef.current?.value || null,
      title: titleRef.current?.value || null,
      author: authorRef.current?.value || null,
      callNumber: callNumberRef.current?.value || null,
      publisher: publisherRef.current?.value || null,
      edition: editionRef.current?.value || null,
      publicationYear: publicationYearRef.current?.value ? parseInt(publicationYearRef.current.value) : null,
    };

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

    try {
      const response = await fetch(`${CORE_API_BASE_URL}/books`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
        credentials: 'include'
      });
      if (response.ok) {
        setToast({ message: "Zaktualizowano książkę!", id: Date.now() });
        // navigate(routes.app.path)
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <BasePageLayout>
      <BackButton fallbackRoute={ROUTES.books.path}/>
      <DefaultForm onSubmit={updateBook}>
        <label className={styles.labelWrapper}>
          <span>ISBN</span>
          <input pattern="^\d{10}$|^\d{13}$" minLength={10} maxLength={13} ref={isbnRef}/>
        </label>
        <label className={styles.labelWrapper}>
          <span>Tytuł <span className="text-red">*</span></span>
          <input type='text' ref={titleRef} required/>
        </label>
        <label className={styles.labelWrapper}>
          <span>Autor <span className="text-red">*</span></span>
          <input type='text' ref={authorRef}/>
        </label>
        <label className={styles.labelWrapper}>
          <span>Sygnatura <span className="text-red">*</span></span>
          <input type='text' ref={callNumberRef}/>
        </label>
        <label className={styles.labelWrapper}>
          <span>Wydawnictwo</span>
          <input type='text' ref={publisherRef}/>
        </label>
        <label className={styles.labelWrapper}>
          <span>Wydanie <span className="text-red">*</span></span>
          <input ref={editionRef} type='text'/>
        </label>
        <label className={styles.labelWrapper}>
          <span>Rok wydania <span className="text-red">*</span></span>
          <input ref={publicationYearRef} type='number' min={0} step={1}/>
        </label>
        <button type="submit" formNoValidate>Zaktualizuj</button>
        {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
      </DefaultForm>
    </BasePageLayout>
  );
}
