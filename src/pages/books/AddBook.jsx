import {useState, useRef} from "react";
import CORE_API_BASE_URL from "../../coreApiBaseUrl.js";
import BasePageLayout from "../../components/BasePageLayout.jsx";
import Toast from "../../components/Toast/Toast.jsx";
import DefaultForm from "../../components/DefaultForm/DefaultForm.jsx";

export default function AddBook() {
  const [toast, setToast] = useState(null);

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const descriptionRef = useRef(null);
  const quantityRef = useRef(null);

  const handleSubmit = () => {
    if (titleRef.current.value === null || titleRef.current.value === '') {
      alert('Podaj tutuł');
      return;
    }
    if (authorRef.current.value === null || authorRef.current.value === '') {
      alert('Podaj autora');
      return;
    }

    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/books`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: titleRef.current.value,
            author: authorRef.current.value,
            description: descriptionRef.current.value,
            quantity: quantityRef.current.value
          }),
          credentials: 'include'
        });
        if (response.ok) {
          setToast({ message: "Dodano książkę!", id: Date.now() });
          titleRef.current.value = '';
          authorRef.current.value = '';
          descriptionRef.current.value = '';
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
        <input type={'text'} placeholder={'nazwa'} ref={titleRef}/>
        <input type={'text'} placeholder={'autor'} ref={authorRef}/>
        <textarea placeholder={'opis'} ref={descriptionRef}/>
        <input type={'number'} placeholder={'ilość'} min={0} ref={quantityRef}/>
        <button type={'submit'}>Dodaj książkę</button>
        {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
      </DefaultForm>
    </BasePageLayout>
  );
}
