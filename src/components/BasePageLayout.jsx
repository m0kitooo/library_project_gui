import UpperNavBar from "./UpperNavBar.jsx";
import SideNavBar from "./SideNavBar.jsx";

export default function BasePageLayout({ children }) {
  return (
    <>
      <div>
        <UpperNavBar/>
        <div
            style={{margin: '10px 0', height: '5px', backgroundColor: 'var(--primary-700)', borderRadius: 'var(--radius-lg)'}}>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 3fr'}}>
          <SideNavBar/>
          <main style={{display: 'flex', flexDirection: 'column'}}>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}