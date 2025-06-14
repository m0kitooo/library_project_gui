import { Link } from "react-router-dom";
import ProposalList from "../../components/proposals/ProposalList.jsx";
import BasePageLayout from "../../components/BasePageLayout.jsx";

export default function Proposals() {
  return (
    <>
      <BasePageLayout>
        <Link to={"/proposal/sendProposal"}><button>Wyślij propozycję</button></Link>
        <ProposalList limit={20} status={"PENDING"}/>
      </BasePageLayout>
    </>
  )
}
