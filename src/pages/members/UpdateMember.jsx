import BasePageLayout from "../../components/BasePageLayout/BasePageLayout";
import BackButton from "../../components/BackButton/BackButton";
import DefaultForm from "../../components/DefaultForm/DefaultForm";
import ROUTES from "../../routes";

export default function UpdateMember() {
  return (
    <BasePageLayout>
      <BackButton fallbackRoute={ROUTES.members.path} />
      <DefaultForm>
        <input type="text" placeholder="Imię" />
        <input type="text" placeholder="Nazwisko" />
        <input type="email" placeholder="Email" />
        <input type="tel" placeholder="Telefon" />
        <button type="submit">Zaktualizuj</button>
      </DefaultForm>
    </BasePageLayout>
  );
}
