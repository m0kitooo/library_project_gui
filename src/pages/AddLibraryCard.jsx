import BasePageLayout from "../components/BasePageLayout.jsx";

export default function AddLibraryCard() {
  return (
    <>
      <BasePageLayout>
        <form>
          <input type={'text'} placeholder={'imie'}/>
          <input type={'text'} placeholder={'nazwisko'}/>
          <input type={'text'} inputMode={'numeric'} pattern={'\\d{11}'} maxLength={11} placeholder={'pesel'}/>
          <input type={'date'} placeholder={'data urodzenia'}/>
          <button>Stwórz karte biblioteczną</button>
        </form>
      </BasePageLayout>
    </>
  )
}