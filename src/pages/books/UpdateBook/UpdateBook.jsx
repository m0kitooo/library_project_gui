import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BasePageLayout from "../../../components/BasePageLayout/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../../../coreApiBaseUrl.js";
import Toast from "../../../components/Toast/Toast.jsx";
import BackButton from "../../../components/BackButton/BackButton.jsx";
import ROUTES from "../../../routes.jsx";
import DefaultForm from "../../../components/DefaultForm/DefaultForm.jsx";

export default function UpdateBook() {
  const [toast, setToast] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const isbnRef = useRef(null);
  const titleRef = useRef(null);
  const authorRef = useRef(null);
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
        if (publisherRef.current) publisherRef.current.value = book.publisher || '';
        if (editionRef.current) editionRef.current.value = book.edition || '';
        if (publicationYearRef.current) publicationYearRef.current.value = book.publicationYear || '';
        
      } catch (error) {
        console.error('Error: ', error);
      }
    })();
  }, [id]);

  const updateBook = async (e) => {
    e.preventDefault();

    const updatedBook = {
      id: id,
      isbn: isbnRef.current?.value || null,
      title: titleRef.current?.value || '',
      author: authorRef.current?.value || '',
      published: publisherRef.current?.value || null,
      edition: editionRef.current?.value || '',
      publicationYear: publicationYearRef.current?.value ? parseInt(publicationYearRef.current.value) : null,
    };

    if (!updatedBook.title.trim()) {
      alert('Podaj tytuł');
      return;
    }
    if (!updatedBook.author.trim()) {
      alert('Podaj autora');
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
        <button type="submit">Zaktualizuj</button>
        {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
      </DefaultForm>
    </BasePageLayout>
  );
}
