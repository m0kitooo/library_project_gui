import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import BasePageLayout from "../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";

export default function UpdateBook() {
  const { id } = useParams();

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const descriptionRef = useRef(null);
  const quantityRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/books/${id}`);
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
      await fetch(`${CORE_API_BASE_URL}/books`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook)
      });
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <BasePageLayout>
      <form onSubmit={updateBook} style={{ display: 'flex', flexDirection: 'column' }}>
        <input type="text" placeholder="tytuł" ref={titleRef} />
        <input type="text" placeholder="autor" ref={authorRef} />
        <textarea placeholder="opis" ref={descriptionRef} />
        <input type="number" placeholder="ilość" min={0} ref={quantityRef} />
        <button type="submit">Zaktualizuj</button>
      </form>
    </BasePageLayout>
  );
}
