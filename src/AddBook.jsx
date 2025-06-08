import SideNavBar from "./SideNavBar.jsx";
import UpperNavBar from "./UpperNavBar.jsx";

export default function AddBook() {
  return (
    <>
      <UpperNavBar/>
      <SideNavBar/>
      <form>
        <input type={'text'} placeholder={'nazwa'}/>
        <input type={'text'} placeholder={'autor'}/>
        <textarea placeholder={'opis'}></textarea>
        <input type={'number'} min={0} placeholder={'ilość'}/>
        <button>Dodaj książkę</button>
      </form>
    </>
  );
}