import BasePageLayout from "../components/BasePageLayout.jsx";

export default function AddLibraryPayment() {
  return (
      <BasePageLayout>
        <form>
          <input type={'text'} placeholder={'nazwa tranzakcji'}/>
          <input type={'number'} placeholder={'koszt tranzakcji'}/>
          <textarea placeholder={'opis'}/>
          <button>Dodaj</button>
        </form>
      </BasePageLayout>
  );
}