import BasePageLayout from "../components/BasePageLayout.jsx";
import DefaultForm from "../components/DefaultForm/DefaultForm.jsx";

export default function AddLibraryCard() {
  return (
    <BasePageLayout>
      <DefaultForm>
        <input type={'text'} placeholder={'imie'}/>
        <input type={'text'} placeholder={'nazwisko'}/>
        <input type={'text'} inputMode={'numeric'} pattern={'\\d{11}'} maxLength={11} placeholder={'pesel'}/>
        <input type={'date'} placeholder={'data urodzenia'}/>
        <button type="submit">Stwórz karte biblioteczną</button>
      </DefaultForm>
    </BasePageLayout>
  )
}