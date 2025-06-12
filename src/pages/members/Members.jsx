import { Link } from "react-router-dom";
import ProposalList from "../../components/proposals/ProposalList.jsx";
import BasePageLayout from "../../components/BasePageLayout.jsx";
import MemberList from "../../components/members/MemberList.jsx";

export default function Members() {
  return (
    <>
      <BasePageLayout>
        <MemberList limit={20}/>
      </BasePageLayout>
    </>
  )
}
