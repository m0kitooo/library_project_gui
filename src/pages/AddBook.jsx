import {useRef} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import BasePageLayout from "../components/BasePageLayout.jsx";

export default function AddBook() {
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const descriptionRef = useRef(null);
  const quantityRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

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
        await fetch(`${CORE_API_BASE_URL}/books`, {
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
      } catch (error) {
        console.error('Error: ', error)
      }
    })();
  };

  return (
    <>
      <BasePageLayout>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input type={'text'} placeholder={'nazwa'} ref={titleRef}/>
          <input type={'text'} placeholder={'autor'} ref={authorRef}/>
          <textarea placeholder={'opis'} ref={descriptionRef}/>
          <input type={'number'} placeholder={'ilość'} min={0} ref={quantityRef}/>
          <button type={'submit'}>Dodaj książkę</button>
        </form>
      </BasePageLayout>
    </>
  );
}