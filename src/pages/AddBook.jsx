import SideNavBar from "../components/SideNavBar.jsx";
import UpperNavBar from "../components/UpperNavBar.jsx";
import {useState} from "react";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";
import BasePageLayout from "../components/BasePageLayout.jsx";

export default function AddBook() {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [bookQuantity, setBookQuantity] = useState(0);

  const handleSubmit = () => {
    (async () => {
      try {
        const response = await fetch(`${CORE_API_BASE_URL}/book/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: bookName,
            author: author,
            description: description,
            quantity: bookQuantity
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
              value={bookName}
              onChange={e => setBookName(e.target.value)}
          />
          <input
              type={'text'}
              placeholder={'autor'}
              value={author}
              onChange={e => setAuthor(e.target.value)}
          />
          <textarea
              placeholder={'opis'}
              value={description}
              onChange={e => setDescription(e.target.value)}
          />
          <input
              type={'number'}
              min={0}
              placeholder={'ilość'}
              value={bookQuantity}
              onChange={e => setBookQuantity(Number(e.target.value))}
          />
          <button type={'submit'}>Dodaj książkę</button>
        </form>
      </BasePageLayout>
    </>
  );
}