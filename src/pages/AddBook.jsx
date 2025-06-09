import {useState} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import BasePageLayout from "../components/BasePageLayout.jsx";

export default function AddBook() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    quantity: 0
  });

  const handleSubmit = () => {
    if (book.title === null || book.title === '')
      alert('Podaj tutuł');
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/book/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: book.title,
            author: book.author,
            description: book.description,
            quantity: book.quantity
          })
        });
        const jsonData = await response.json();
        console.log(jsonData);
      } catch (error) {
        console.error('Error: ', error)
      }
    })();
  };

  return (
    <>
      <BasePageLayout>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input
              type={'text'}
              placeholder={'nazwa'}
              value={book.title}
              onChange={e => {setBook({...book, title: e.target.value})}}
          />
          <input
              type={'text'}
              placeholder={'autor'}
              value={book.author}
              onChange={e => {setBook({...book, author: e.target.value})}}
          />
          <textarea
              placeholder={'opis'}
              value={book.description}
              onChange={e => {setBook({...book, description: e.target.value})}}
          />
          <input
              type={'number'}
              placeholder={'ilość'}
              min={0}
              value={book.quantity}
              onChange={e => {setBook({...book, quantity: Number(e.target.value)})}}
          />
          <button type={'submit'}>Dodaj książkę</button>
        </form>
      </BasePageLayout>
    </>
  );
}