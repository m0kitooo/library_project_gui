import BasePageLayout from "../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function UpdateBook() {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    quantity: 0
  });

  const getBook = () => {
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/book?id=${id}`);
        const jsonData = await response.json();
        setBook(jsonData);
      } catch (error) {
        console.error('Error: ', error)
      }
    })();
  };

  const updateBook = () => {
    if (book.title === null || book.title === '')
      alert('Podaj tutuł');
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/book/update`, {
            method: 'PUT',
            body: JSON.stringify(
              {
                id: id,
                title: book.title,
                author: book.author,
                description: book.description,
                quantity: book.quantity
              }
            )
          }
        );
        const jsonData = await response.json();
        setBook(jsonData);
      } catch (error) {
        console.error('Error: ', error)
      }
    })();
  }

  useEffect(() => {
    getBook();
  }, []);

  return (
    <>
      <BasePageLayout>
        <form>
          <input
            type={'text'}
            placeholder={'tytuł'}
            value={book.title}
            onChange={e => {
              setBook({
                ...book,
                title: e.target.value
              })
            }}
          />
          <input
            type={'text'}
            placeholder={'autor'}
            value={book.author}
            onChange={e => {
              setBook({
                ...book,
                author: e.target.value
              })
            }}
          />
          <textarea
              placeholder={'opis'}
              value={book.description}
              onChange={e => {
                setBook({
                  ...book,
                  description: e.target.value
                })
              }}
          />
          <input
              type={'number'}
              placeholder={'ilość'}
              min={0}
              value={book.quantity}
              onChange={e => {
                setBook({
                  ...book,
                  quantity: Number(e.target.value)
                })
              }}
          />
          <button type={'submit'} onClick={updateBook}>
            <span>Zaktualizuj</span>
          </button>
        </form>
      </BasePageLayout>
    </>
  )
}