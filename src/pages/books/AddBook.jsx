import {useState, useRef} from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";
import BasePageLayout from "../../components/BasePageLayout/BasePageLayout.jsx";
import Toast from "../../components/Toast/Toast.jsx";
import DefaultForm from "../../components/DefaultForm/DefaultForm.jsx";
import { isBlank } from "../../utils/stringUtils.js";

export default function AddBook() {
  const [toast, setToast] = useState(null);

  const isbnRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const publisherRef = useRef(null);
  const editionRef = useRef(null);
  const publicationYearRef = useRef(null);

  const handleSubmit = () => {
    const isbnPattern = /^\d{10}$|^\d{13}$/;
    const isbn = isbnRef.current.value;
    console.log('ISBN:', isbnRef.current.value);
    if (isbn && !isbnPattern.test(isbn)) {
      alert("ISBN musi mieć 10 lub 13 cyfr");
      return;
    }
    
    if (isBlank(titleRef.current.value) ||
        isBlank(authorRef.current.value) ||
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
            publisher: publisherRef.current.value ? publisherRef.current.value : null,
            edition: editionRef.current.value ? editionRef.current.value : null,
            publicationYear: publicationYearRef.current.value ? parseInt(publicationYearRef.current.value) : null,
          }),
          credentials: 'include'
        });
        if (response.ok) {
          setToast({ message: "Dodano książkę!", id: Date.now() });
          isbnRef.current.value = '';
          titleRef.current.value = '';
          authorRef.current.value = '';
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
        <label>
          <span>ISBN</span>
          <input pattern="^\d{10}$|^\d{13}$" ref={isbnRef}/>
        </label>
        <label>
          <span>Tytuł <span style={{ color: 'red' }}>*</span></span>
          <input type='text' ref={titleRef} required/>
        </label>
        <label>
          <span>Autor <span style={{ color: 'red' }}>*</span></span>
          <input type='text' ref={authorRef}/>
        </label>
        <label>
          <span>Wydawnictwo</span>
          <input type='text' ref={publisherRef}/>
        </label>
        <label>
          <span>Wydanie <span style={{ color: 'red' }}>*</span></span>
          <input ref={editionRef} type='text'/>
        </label>
        <label>
          <span>Rok wydania <span style={{ color: 'red' }}>*</span></span>
          <input ref={publicationYearRef} type='number' min={0} step={1}/>
        </label>
        <button type={'submit'} formNoValidate>Zarejestruj książkę</button>
        {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
      </DefaultForm>
    </BasePageLayout>
  );
}