import BasePageLayout from "../../components/BasePageLayout";
import DefaultForm from "../../components/DefaultForm/DefaultForm";

export default function AddMember() {
  return (
		<BasePageLayout>
			<DefaultForm>
				<input type="text" placeholder="Imię" />
				<input type="text" placeholder="Nazwisko" />
				<input type="date" placeholder="Data urodzenia" />
				<input type="text" inputMode="numeric" pattern="\\d{11}" maxLength={11} placeholder="Pesel" />
				<input type="email" placeholder="Email" />
				<button type="submit">Dodaj członka</button>
			</DefaultForm>
		</BasePageLayout>
	);
}