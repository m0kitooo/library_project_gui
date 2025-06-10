import UpperNavBar from "./UpperNavBar.jsx";
import SideNavBar from "./SideNavBar.jsx";

export default function BasePageLayout({ children }) {
  return (
    <>
      <div>
        <UpperNavBar/>
        <div style={{margin: '10px', height: '5px', backgroundColor: 'red', borderRadius: '25px'}}></div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 3fr'}}>
          <SideNavBar/>
          <main style={{display: 'flex'}}>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}