import BasePageLayout from "../components/BasePageLayout.jsx";
import CORE_API_BASE_URL from "../coreApiBaseUrl.jsx";

export default function AddLibraryPayment() {
  return (
      <BasePageLayout>
        <form>
          <input type={'text'} placeholder={'nazwa tranzakcji'}/>
          <input type={'number'} placeholder={'koszt tranzakcji'}/>
          <textarea placeholder={'opis'}/>
          <button onClick={
            () => {
              const response = fetch(`${CORE_API_BASE_URL}/`, {
                method: 'POST',
                headers: {}
              })
            }
          }>Dodaj</button>
        </form>
      </BasePageLayout>
  );
}