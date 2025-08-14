import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BasePageLayout from "../../../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../../../coreApiBaseUrl.jsx";
import styles from "./UpdateBook.module.css";
import Toast from "../../../components/Toast/Toast.jsx";
import arrowIcon from '../../../assets/arrow-icon.svg';
import BackButton from "../../../components/BackButton/BackButton.jsx";
import ROUTES from "../../../routes.jsx";

export default function UpdateBook() {
  const [toast, setToast] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const descriptionRef = useRef(null);
  const quantityRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/books/${id}`, {credentials: 'include'});
        const book = await response.json();

        if (titleRef.current) titleRef.current.value = book.title || '';
        if (authorRef.current) authorRef.current.value = book.author || '';
        if (descriptionRef.current) descriptionRef.current.value = book.description || '';
        if (quantityRef.current) quantityRef.current.value = book.quantity || 0;
      } catch (error) {
        console.error('Error: ', error);
      }
    })();
  }, [id]);

  const updateBook = async (e) => {
    e.preventDefault();

    const updatedBook = {
      id: id,
      title: titleRef.current?.value || '',
      author: authorRef.current?.value || '',
      description: descriptionRef.current?.value || '',
      quantity: Number(quantityRef.current?.value) || 0
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
      <div>
        <BackButton fallbackRoute={ROUTES.books.path}/>
        <form onSubmit={updateBook} className={styles.formWrapper}>
          <input type="text" placeholder="tytuł" ref={titleRef} />
          <input type="text" placeholder="autor" ref={authorRef} />
          <textarea placeholder="opis" ref={descriptionRef} />
          <input type="number" placeholder="ilość" min={0} ref={quantityRef} />
          <button type="submit">Zaktualizuj</button>
          {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
        </form>
      </div>
    </BasePageLayout>
  );
}
