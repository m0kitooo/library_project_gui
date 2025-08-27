import {useState, useRef} from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";
import BasePageLayout from "../../components/BasePageLayout/BasePageLayout.jsx";
import Toast from "../../components/Toast/Toast.jsx";
import DefaultForm from "../../components/DefaultForm/DefaultForm.jsx";

export default function AddBook() {
  const [toast, setToast] = useState(null);

  const isbnRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const publicationYearRef = useRef(null);
  const quantityRef = useRef(null);

  const handleSubmit = () => {
    const isbnPattern = /^\d{10}$|^\d{13}$/;
    const isbn = isbnRef.current.value;

    if (isbn && !isbnPattern.test(isbn)) {
      alert("ISBN musi mieć 10 lub 13 cyfr");
      return;
    }
    
    if (titleRef.current.value === null || titleRef.current.value === '') {
      alert('Podaj tutuł');
      return;
    }
    if (authorRef.current.value === null || authorRef.current.value === '') {
      alert('Podaj autora');
      return;
    }
    if (publicationYearRef.current.value === null || publicationYearRef.current.value === '') {
      alert('Podaj rok wydania');
      return;
    }

    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/books`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            isbn: isbnRef.current ? isbnRef.current.value : null,
            title: titleRef.current.value,
            author: authorRef.current.value,
            publicationYear: publicationYearRef.current.value,
            quantity: quantityRef.current.value
          }),
          credentials: 'include'
        });
        if (response.ok) {
          setToast({ message: "Dodano książkę!", id: Date.now() });
          if (isbnRef.current) isbnRef.current.value = '';
          if (publicationYearRef.current) publicationYearRef.current.value = '';
          titleRef.current.value = '';
          authorRef.current.value = '';
          quantityRef.current.value = '';
        }
      } catch (error) {
        console.error('Error: ', error)
      }
    })();
  };

  return (
    <BasePageLayout>
      <DefaultForm onSubmit={handleSubmit}>
        <input placeholder='ISBN (opcjonalne)' pattern="^\d{10}$|^\d{13}$" ref={isbnRef}></input>
        <input type={'text'} placeholder={'nazwa'} ref={titleRef}/>
        <input type={'text'} placeholder={'autor'} ref={authorRef}/>
        <input type='text' placeholder='wydawnictwo' ref={publisherRef}></input>
        <input type='text' placeholder='wydanie'> </input>
        <input type='number' min={0} step={1} placeholder='rok wydania' ref={publicationYearRef}></input>
        <input type={'number'} placeholder={'ilość'} min={0} ref={quantityRef}/>
        <button type={'submit'} formNoValidate>Dodaj książkę</button>
        {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
      </DefaultForm>
    </BasePageLayout>
  );
}